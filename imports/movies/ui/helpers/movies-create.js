import { _ } from 'meteor/underscore';
import { Template } from 'meteor/templating';
import { sAlert } from 'meteor/juliancwirko:s-alert';
import { FlowRouter } from 'meteor/kadira:flow-router';

import { TheMovieDB } from '/imports/movies/api/TheMovieDB.js';
import { State } from '/imports/global/api/State.js';

import { Movies } from '/imports/movies/api/collection.js';
import '/imports/movies/ui/templates/movies-create.html';

// Called when an instance of this template is removed from the DOM and destroyed.
Template.moviesCreate.onCreated(() => {
  // Clears all application state when landing on the "/movies" route
  TheMovieDB.clearTMDBSearchResults();
  State.clear.status();
  State.clear.submissionData();
});

// Specifies helpers available to this template.
Template.moviesCreate.helpers({
  /**
   * Used by the template to retrieve data from the application
   * state to be displayed on the view.
   */
  querying: () => State.get.querying(),
  submissionData: () => State.get.submissionData(),
  creditsData: () => State.get.status() === 'getCreditsData',

  /**
   * Used by the template to show a list of the first five movie
   * results returned by TheMovieDB.
   *
   * @return { Array } TheMovieDB movies data.
   */
  tmdbSearchResults: () => {
    const tmdbSearchResults = State.get.tmdbSearchResults();

    if (tmdbSearchResults && !tmdbSearchResults) {
      return;
    }

    const movies = tmdbSearchResults ? tmdbSearchResults.data.results : [];

    return movies.slice(0, 5);
  },

  /**
   * Used by the template to check if the form is in a state that
   * will allow for a submission.
   *
   * @return { Boolean }
   */
  disableSubmit: () => {
    const submissionData = State.get.submissionData();
    const status = State.get.status();

    if (submissionData && submissionData.length === 0 || status === 'getCreditsData') {
      return true;
    }

    return false;
  },
});

// Specifies event handlers for this template.
Template.moviesCreate.events({
  /**
   * On keyup or focus, this event will fire the first call to search
   * TheMovieDB for the string entered in the input field. This event is
   * debounced to prevent excessive requests.
   */
  'keyup .themoviedb input, focus .themoviedb input': _.debounce((event) => {
    const searchString = event.currentTarget.value;
    const whitespace = /\S/;

    if (!(whitespace.test(searchString))) {
      return TheMovieDB.clearTMDBSearchResults();
    }

    const searchURI = TheMovieDB.handleSearchURI(searchString);

    TheMovieDB.searchTheMovieDB(searchURI);
  }, 350),

  /**
   * On click, this event will make a call to get and set the raw and
   * credits data from TheMovieDB to be used in our application.
   */
  'click .search-results li'(event) {
    const rawData = Template.currentData(event.currentTarget);
    const creditsURI = TheMovieDB.handleCreditsURI(rawData.id);

    TheMovieDB.setRawData(rawData);
    TheMovieDB.getCreditsData(creditsURI);
    TheMovieDB.clearTMDBSearchResults();

    document.querySelector('.themoviedb input').value = rawData.title;

    State.clear.status();
  },

  /**
   * When changing the type select box, this event will add the selected
   * movie to the array of movies we wish to add to our collection. It
   * also does some basic validation and clears our inputs so the form
   * may be reused.
   */
  'change .type select': () => {
    const title = document.querySelector('.themoviedb input');
    const location = document.querySelector('.location input');
    const type = document.querySelector('.type select');

    const whitespace = /\S/;

    if (!(whitespace.test(location.value))) {
      location.value = 'Unknown';
    }

    TheMovieDB.addToSubmisionData(type.value, location.value);

    [title, type, location].map(input => input.value = '');
  },

  /**
   * On click, this will remove the movie item from the array of movies
   * we wish to add to our collection.
   */
  'click .remove': (event) => {
    const submissionData = State.get.submissionData();
    const targetData = Template.currentData(event.currentTarget);

    const removalIndex = submissionData.findIndex(movie => movie.tmdb_id === targetData.tmdb_id);

    const newSubmisionData = [
      ...submissionData.slice(0, removalIndex),
      ...submissionData.slice(removalIndex + 1),
    ];

    return State.set.submissionData(newSubmisionData);
  },

  /**
   * On submit, this event will map over the array of items we wish to
   * add to our Mongo collection and insert them accordingly. We also
   * notify our user of the addition here and redirect to the list view.
   */
  'submit form': (event) => {
    event.preventDefault();

    const submissionData = State.get.submissionData();

    submissionData.map((movie) => {
      Movies.insert({ ...movie }, (error) => {
        if (error) {
          return sAlert.error(`There was an error adding ${submissionData[0].title} to your collection.`);
        }
      });
    });

    if (submissionData.length === 1) {
      sAlert.success(`${submissionData[0].title} has been added to your collection.`);
    } else {
      sAlert.success('You have added several new movies to your collection.');
    }

    FlowRouter.go('/movies');
  },

  /**
   * On click, this event will clear the array of movies we wish to add to
   * our Mongo collection and will redirect us to the movies list view.
   */
  'click .cancel': (event) => {
    event.preventDefault();
    State.clear.submissionData();
    FlowRouter.go('/movies');
  },
});

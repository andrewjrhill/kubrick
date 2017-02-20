import { _ } from 'meteor/underscore';
import { Template } from 'meteor/templating';
import { sAlert } from 'meteor/juliancwirko:s-alert';
import { FlowRouter } from 'meteor/kadira:flow-router';

import { TheMovieDB } from '/imports/movies/api/TheMovieDB.js';
import { State } from '/imports/global/api/State.js';

import { Movies } from '/imports/movies/api/collection.js';
import '/imports/movies/ui/templates/movies-create.html';

//
Template.moviesCreate.onCreated(() => {
  TheMovieDB.clearLocalSearchResults();
  State.clear.status();
  State.clear.submissionData();
});

//
Template.moviesCreate.helpers({
  /**
   *
   */
  querying: () => State.get.querying(),
  submissionData: () => State.get.submissionData(),
  creditsData: () => State.get.status() === 'setCreditsData',

  /**
   *
   */
  localSearchResults: () => {
    const localSearchResults = State.get.localSearchResults();

    if (localSearchResults && !localSearchResults) {
      return;
    }

    const movies = localSearchResults ? localSearchResults.data.results : [];

    return movies.slice(0, 5);
  },

  /**
   *
   */
  disableSubmit: () => {
    const submissionData = State.get.submissionData();
    const status = State.get.status();

    if (submissionData && submissionData.length === 0 || status === 'setCreditsData') {
      return true;
    }

    return false;
  },
});

//
Template.moviesCreate.events({
  /**
   *
   */
  'keyup .themoviedb input, focus .themoviedb input': _.debounce((event) => {
    const searchString = event.currentTarget.value;
    const whitespace = /\S/;

    if (!(whitespace.test(searchString))) {
      return TheMovieDB.clearLocalSearchResults();
    }

    const searchURI = TheMovieDB.handleSearchURI(searchString);

    TheMovieDB.searchTheMovieDB(searchURI);
  }, 350),

  /**
   *
   */
  'click .search-results li'(event) {
    const rawData = Template.currentData(event.currentTarget);
    const creditsURI = TheMovieDB.handleCreditsURI(rawData.id);

    TheMovieDB.setRawData(rawData);
    TheMovieDB.setCreditsData(creditsURI);
    TheMovieDB.clearLocalSearchResults();

    document.querySelector('.themoviedb input').value = rawData.title;

    State.clear.status();
  },

  /**
   *
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
   *
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
   *
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
   *
   */
  'click .cancel': (event) => {
    event.preventDefault();
    State.clear.submissionData();
    FlowRouter.go('/movies');
  },
});

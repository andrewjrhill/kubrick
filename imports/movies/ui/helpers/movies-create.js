import { _ } from 'meteor/underscore';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import { TheMovieDB } from '/imports/movies/api/TheMovieDB.js';
import { Movies } from '/imports/movies/api/collection.js';
import '/imports/movies/ui/templates/movies-create.html';

//
Template.moviesCreate.onCreated(() => {
  TheMovieDB.clearSearchResults();
  Session.set('queryingActive', false)
  Session.set('moviesList', []);
});

//
Template.moviesCreate.helpers({
  /**
   *
   */
  searchResults: () => {
    const searchResults = TheMovieDB.getSearchResults();

    if (searchResults && !searchResults) {
      return;
    }

    const movies = searchResults ? searchResults.data.results : [];

    return movies.slice(0, 5);
  },

  /**
   *
   */
  querying: () => Session.get('queryingActive'),

  /**
   *
   */
  moviesToCreate: () => Session.get('moviesList'),

  /**
   *
   */
  movieTypeOptions: () => {
    const options = ['Blu-Ray', 'DVD', 'Digital Download', 'Other'];

    return options;
  },

  /**
   *
   */
  metaDataExists: () => Session.get('creditsData'),

  /**
   *
   */
  disableSubmit: () => {
    const moviesList = Session.get('moviesList');
    const appState = Session.get('appState');

    if (moviesList.length === 0 || appState === 'setMovieCredits') {
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
  'keyup .themoviedb input, click .themoviedb input': _.debounce((event, template) => {
    const searchString = event.currentTarget.value;
    const whitespace = /\S/;

    if (!(whitespace.test(searchString))) {
      return TheMovieDB.clearSearchResults();
    }

    const searchURI = TheMovieDB.handleSearchURI(searchString);

    return TheMovieDB.searchTheMovieDB(searchURI);
  }, 350),

  /**
   *
   */
  'click .search-results li'(event, template) {
    const movieData = Template.currentData(event.currentTarget);
    const creditsURI = TheMovieDB.handleCreditsURI(movieData.id);

    TheMovieDB.setMovieData(movieData);
    TheMovieDB.setMovieCredits(creditsURI);
    TheMovieDB.clearSearchResults();

    document.querySelector('.themoviedb input').value = movieData.title;

    Session.set('queryingActive', false);
  },

  /**
   *
   */
  'click .remove': (event, template) => {
    const moviesList = Session.get('moviesList');
    const targetData = Template.currentData(event.currentTarget);

    const removalIndex = moviesList.findIndex(movie => movie.tmdb_id === targetData.tmdb_id);

    const newMoviesList = [
      ...moviesList.slice(0, removalIndex),
      ...moviesList.slice(removalIndex + 1),
    ];

    return Session.set('moviesList', newMoviesList);
  },

  /**
   *
   */
  'change .movie-type select': (event) => {
    const movieTitle = document.querySelector('.themoviedb input');
    const movieType = document.querySelector('.movie-type select');

    TheMovieDB.setMoviesList(movieType.value);

    movieTitle.value = '';
    movieType.value = '';
  },

  /**
   *
   */
  'submit form': (event) => {
    event.preventDefault();

    const moviesToInsert = Session.get('moviesList');

    moviesToInsert.map((movie) => {
      Movies.insert({ ...movie }, (error) => {
        if (error) {
          throw new Meteor.Error('500', 'Error adding a new movie', error);
        }

        FlowRouter.go('/movies');
      });
    });
  },

  /**
   *
   */
  'click .cancel': (event) => {
    event.preventDefault();
    Session.set('moviesList', []);
    FlowRouter.go(`/movies`);
  },
});

import { _ } from 'meteor/underscore';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import { TheMovieDB } from '/imports/themoviedb/api/TheMovieDB.js';
import { Movies } from '/imports/movies/api/collection.js';
import '/imports/movies/ui/templates/movies-create.html';

//
Template.moviesCreate.helpers({
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
});

//
Template.moviesCreate.events({
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
    const movieType = document.querySelector('.movie-type select').value;
    TheMovieDB.setmoviesList(movieType);
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

import { _ } from 'meteor/underscore';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import { Movies } from '/imports/movies/api/collection.js';
import '/imports/movies/ui/templates/movies-create.html';

Template.moviesCreate.helpers({
  /**
   *
   */
  moviesToCreate: () => Session.get('fullMovieData'),
});

Template.moviesCreate.events({
  /**
   *
   */
  'click .remove': (event, template) => {
    const moviesToAdd = Session.get('fullMovieData');
    const targetData = Template.currentData(event.currentTarget);

    const removalIndex = moviesToAdd.findIndex(movie => movie.tmdb_id === targetData.tmdb_id);

    const newMoviesToAdd = [
      ...moviesToAdd.slice(0, removalIndex),
      ...moviesToAdd.slice(removalIndex + 1),
    ];

    return Session.set('fullMovieData', newMoviesToAdd);
  },

  /**
   *
   */
  'submit form': (event) => {
    event.preventDefault();

    const moviesToInsert = Session.get('fullMovieData');

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
   * Navigate back to the movies list view when clicking the cancel button.
   *
   * @param { Object } javascript event object
   * @return { Function } navigate to the movies list view
   */
  'click .cancel': (event) => {
    event.preventDefault();
    Session.set('fullMovieData', []);
    FlowRouter.go(`/movies`);
  },
});

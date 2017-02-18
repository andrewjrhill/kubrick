import { _ } from 'meteor/underscore';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import { Movies } from '/imports/movies/api/collection.js';
import '/imports/movies/ui/templates/movies-create.html';

Template.moviesCreate.events({
  /**
   *
   */
  'submit form': (event) => {
    event.preventDefault();

    const {
      banner,
      cast,
      crew,
      description,
      poster,
      release_date,
      title,
      tmdb_id,
    } = Session.get('fullMovieData');

    return Movies.insert({
      banner,
      cast,
      crew,
      description,
      poster,
      release_date,
      title,
      tmdb_id,
    }, (error) => {
      if (error) {
        throw new Meteor.Error('500', 'Error adding a new movie', error);
      }

      FlowRouter.go('/movies');
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
    FlowRouter.go(`/movies`);
  },
});

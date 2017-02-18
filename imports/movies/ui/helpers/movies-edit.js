import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import { Movies } from '/imports/movies/api/collection.js';
import '/imports/movies/ui/templates/movies-edit.html';

Template.moviesEdit.onCreated(() => {
  const templateInstance = Template.instance();

  Tracker.autorun(() => {
    templateInstance.movieId = FlowRouter.getParam('id');

    Meteor.subscribe('movies');
  });
});

Template.moviesEdit.helpers({
  movie() {
    const templateInstance = Template.instance();

    return Movies.findOne({ _id: templateInstance.movieId });
  },
});

Template.moviesEdit.events({
  /**
   * Edits a movie on submission.
   *
   * @param { Object } javascript event object
   * @return { Function } call to update data into the Movies collection
   */
  'submit form'(event, template) {
    event.preventDefault();

    const movie = Movies.findOne({ _id: template.movieId });
    const title = document.querySelector('.title input').value;
    const year = document.querySelector('.year input').value;
    const director = document.querySelector('.director input').value;
    const cast = document.querySelector('.cast textarea').value;
    const description = document.querySelector('.description textarea').value;

    return Movies.update({
      _id: template.movieId,
    }, {
      $set: {
        title,
        year,
        director,
        cast,
        description,
      },
    }, (error) => {
      if (error) {
        throw new Meteor.Error('500', 'Error updating movie', error);
      }

      FlowRouter.go(`/movies/${template.movieId}`);
    });
  },

  /**
   * Navigate back to the movies list view when clicking the cancel button.
   *
   * @param { Object } javascript event object
   * @return { Function } navigate to the movies list view
   */
  'click .cancel'(event) {
    event.preventDefault();
    FlowRouter.go(`/movies`);
  },
});

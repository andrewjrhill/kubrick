import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import { TheMovieDB } from '/imports/themoviedb';

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
  /**
   *
   */
  movie: () => {
    const templateInstance = Template.instance();
    return Movies.findOne({ _id: templateInstance.movieId });
  },

  /**
   *
   */
  getCast: () => {
    const currentData = Template.currentData();
    return currentData.cast.map((member) => member.name);
  }
});

Template.moviesEdit.events({
  /**
   *
   */
  'submit form'(event, template) {
    event.preventDefault();

    const movie = Movies.findOne({ _id: template.movieId });
    const title = document.querySelector('.title input').value;
    const cast = document.querySelector('.cast textarea').value;
    const description = document.querySelector('.description textarea').value;

    return Movies.update({
      _id: template.movieId,
    }, {
      $set: {
        title,
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
   *
   */
  'click .cancel'(event, template) {
    event.preventDefault();
    FlowRouter.go(`/movies/${template.movieId}`);
  },
});

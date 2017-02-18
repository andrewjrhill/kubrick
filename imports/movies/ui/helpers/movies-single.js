import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import { Movies } from '/imports/movies/api/collection.js';
import '/imports/movies/ui/templates/movies-single.html';

Template.moviesSingle.onCreated(() => {
  const templateInstance = Template.instance();

  Tracker.autorun(() => {
    templateInstance.movieId = FlowRouter.getParam('id');

    Meteor.subscribe('movies');
  });
});

Template.moviesSingle.helpers({
  movie() {
    const templateInstance = Template.instance();

    return Movies.findOne({ _id: templateInstance.movieId });
  },
});

Template.moviesSingle.events({
  /**
   *
   */
  'click .edit-movie'(event, template) {
    event.preventDefault();

    FlowRouter.go(`/movies/${template.movieId}/edit`);
  },

  /**
   *
   */
  'click .go-back'(event, template) {
    event.preventDefault();

    return history.back();
  },
});

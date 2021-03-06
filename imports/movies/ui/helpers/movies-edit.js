import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Template } from 'meteor/templating';
import { sAlert } from 'meteor/juliancwirko:s-alert';
import { FlowRouter } from 'meteor/kadira:flow-router';

import { Movies } from '/imports/movies/api/collection.js';
import '/imports/movies/ui/templates/movies-edit.html';

// Called when an instance of this template is removed from the DOM and destroyed.
Template.moviesEdit.onCreated(() => {
  const templateInstance = Template.instance();

  // Subscribes this template to our Mongo collection publication.
  Tracker.autorun(() => {
    templateInstance.movieId = FlowRouter.getParam('id');
    Meteor.subscribe('movies');
  });
});

// Specifies helpers available to this template.
Template.moviesEdit.helpers({
  /**
   * Queries our mongo collection to find a movie with a given database ID.
   * @return { Object } movie data
   */
  movie: () => {
    const templateInstance = Template.instance();
    return Movies.findOne({ _id: templateInstance.movieId });
  },
});

// Specifies event handlers for this template.
Template.moviesEdit.events({
  /**
   * On submit, this event will get all values from our edit form inputs and
   * update the Mongo collection accordingly. We also notify our user
   * of the addition here and redirect to the list view.
   */
  'submit form'(event, template) {
    event.preventDefault();

    const title = document.querySelector('.title input').value;
    const location = document.querySelector('.location input').value;
    const description = document.querySelector('.description textarea').value;

    return Movies.update({
      _id: template.movieId,
    }, {
      $set: {
        title,
        location,
        description,
      },
    }, (error) => {
      if (error) {
        return sAlert.error(`There was an error editing ${title}.`);
      }

      sAlert.success(`${title} has been successfully updated.`);

      FlowRouter.go(`/movies/${template.movieId}`);
    });
  },

  /**
   * On click, this event will redirect us to the movies single view.
   */
  'click .cancel'(event, template) {
    event.preventDefault();
    FlowRouter.go(`/movies/${template.movieId}`);
  },
});

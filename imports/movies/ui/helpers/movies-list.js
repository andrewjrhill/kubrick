import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Template } from 'meteor/templating';

import { Movies } from '/imports/movies/api/collection.js';
import '/imports/movies/ui/templates/movies-list.html';

// Called when an instance of this template is removed from the DOM and destroyed.
Template.moviesList.onCreated(() => {
  // Subscribes this template to our Mongo collection publication.
  Tracker.autorun(() => {
    Meteor.subscribe('movies');
  });
});

// Specifies helpers available to this template.
Template.moviesList.helpers({
  /**
   * Gets all movies from the "Movies" Mongo collection.
   * @return { Object } list of movies
   */
  movies: () => Movies.find(),
});

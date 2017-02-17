import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Template } from 'meteor/templating';

import { Movies } from '/imports/movies/api/collection.js';
import '/imports/movies/ui/templates/movies-list.html';

Template.moviesList.onCreated(() => {
  Tracker.autorun(() => {
    Meteor.subscribe('movies');
  });
});

Template.moviesList.helpers({
  /**
   * Gets all movies from the "Movies" Mongo collection.
   * @return { Object } list of movies
   */
  movies() {
    return Movies.find();
  },
});

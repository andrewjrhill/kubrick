import { _ } from 'meteor/underscore';
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { TheMovieDB } from '/imports/themoviedb/api/TheMovieDB.js';
import '/imports/themoviedb/ui/templates/query.html';

Template.query.helpers({
  /**
   *
   */
  movieData() {
    const movieData = TheMovieDB.getMovieData();

    if (movieData && !movieData) {
      return;
    }

    const movies = movieData ? movieData.data.results : [];

    return movies.slice(0, 5);
  },
});

Template.query.events({
  /**
   *
   */
  'keyup .themoviedb input, keydown .themoviedb input': _.debounce((event, template) => {
    const searchString = document.querySelector('.themoviedb input').value;
    const whitespace = /\S/;

    if (!(whitespace.test(searchString))) {
      return TheMovieDB.clearMovieData();
    }

    const searchURI = TheMovieDB.handleSearchURI(searchString);

    return TheMovieDB.queryTheMovieDB(searchURI);
  }, 500),

  /**
   *
   */
  'click .search-results li': (event, template) => {
    const data = Template.currentData(event.currentTarget);
    TheMovieDB.clearMovieData();
  }
});

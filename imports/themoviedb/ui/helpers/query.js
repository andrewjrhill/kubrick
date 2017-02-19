import { _ } from 'meteor/underscore';
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { TheMovieDB } from '/imports/themoviedb/api/TheMovieDB.js';
import '/imports/themoviedb/ui/templates/query.html';

Template.query.onCreated(() => {
  Session.setDefault('queryingActive', false)
});

Template.query.helpers({
  /**
   *
   */
  searchResults: () => {
    const searchResults = TheMovieDB.getSearchResults();

    if (searchResults && !searchResults) {
      return;
    }

    const movies = searchResults ? searchResults.data.results : [];

    return movies.slice(0, 5);
  },

  /**
   *
   */
  querying: () => Session.get('queryingActive'),
});

Template.query.events({
  /**
   *
   */
  'keyup .themoviedb input, click .themoviedb input': _.debounce((event, template) => {
    const searchString = event.currentTarget.value;
    const whitespace = /\S/;

    if (!(whitespace.test(searchString))) {
      return TheMovieDB.clearSearchResults();
    }

    const searchURI = TheMovieDB.handleSearchURI(searchString);

    return TheMovieDB.searchTheMovieDB(searchURI);
  }, 300),

  /**
   *
   */
  'click .search-results li'(event, template) {
    const movieData = Template.currentData(event.currentTarget);
    const creditsURI = TheMovieDB.handleCreditsURI(movieData.id);
    const inputField = document.querySelector('.themoviedb input');

    TheMovieDB.setMovieData(movieData);
    TheMovieDB.clearSearchResults();
    TheMovieDB.getMovieCredits(creditsURI)

    inputField.value = movieData.title;

    Meteor.setTimeout(() => {
      TheMovieDB.setFullMovieData();
      Session.set('queryingActive', false);
    }, 500);
  }
});

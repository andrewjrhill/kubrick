import { _ } from 'meteor/underscore';
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { TheMovieDB } from '/imports/themoviedb/api/TheMovieDB.js';
import '/imports/themoviedb/ui/templates/query.html';

Template.query.helpers({
  /**
   *
   */
  searchResults() {
    const searchResults = TheMovieDB.getSearchResults();

    if (searchResults && !searchResults) {
      return;
    }

    const movies = searchResults ? searchResults.data.results : [];

    return movies.slice(0, 5);
  },
});

Template.query.events({
  /**
   *
   */
  'keyup .themoviedb input': _.debounce((event, template) => {
    const searchString = event.currentTarget.value;
    const whitespace = /\S/;

    if (!(whitespace.test(searchString))) {
      return TheMovieDB.clearSearchResults();
    }

    const searchURI = TheMovieDB.handleSearchURI(searchString);

    return TheMovieDB.searchTheMovieDB(searchURI);
  }, 500),

  /**
   *
   */
  'click .search-results li'(event, template) {
    const movieData = Template.currentData(event.currentTarget);
    const creditsURI = TheMovieDB.handleCreditsURI(movieData.id);

    TheMovieDB.setMovieData(movieData);
    TheMovieDB.clearSearchResults();

    Meteor.setTimeout(() => {
      TheMovieDB.getMovieCredits(creditsURI)
    }, 150);
  }
});

import { _ } from 'meteor/underscore';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import { Movies } from '/imports/movies/api/collection.js';
import { State } from '/imports/global/api/State.js';
import '/imports/global/ui/templates/header.html';

//
Template.header.onDestroyed(() => {
  State.clear.searchQuery();
});

//
Template.header.helpers({
  /**
   *
   */
  moviesList: () => {
    const currentRoute = FlowRouter.getRouteName();

    if (currentRoute !== 'movies') {
      return;
    }

    return true;
  },

  /**
   *
   */
  results: () => {
    const searchQuery = State.get.searchQuery();

    if (!searchQuery) {
      return '';
    }

    const fuzzyQuery = new RegExp(searchQuery, 'i');
    const searchResults = Movies.find({ title: fuzzyQuery }, { limit: 10, sort: { title: 1 } });

    return searchResults;
  },
});

//
Template.header.events({
  /**
   *
   */
  'click .search-results a': () => State.clear.searchQuery(),

  /**
   *
   */
  'keyup .search input, focus .search input': _.debounce((event) => {
    const value = event.target.value.trim();

    if (!value || value === '') {
      return State.set.searchQuery('');
    }

    State.set.searchQuery(value);
  }, 350),
});
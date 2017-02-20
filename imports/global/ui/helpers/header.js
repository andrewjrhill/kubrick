import { _ } from 'meteor/underscore';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import { Movies } from '/imports/movies/api/collection.js';
import { State } from '/imports/global/api/State.js';
import '/imports/global/ui/templates/header.html';

//
Template.header.onDestroyed(() => {
  State.clear.localSearchQuery();
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
    const localSearchQuery = State.get.localSearchQuery();

    if (!localSearchQuery) {
      return '';
    }

    const fuzzyQuery = new RegExp(localSearchQuery, 'i');
    const localSearchResults = Movies.find({ title: fuzzyQuery }, { limit: 10, sort: { title: 1 } });

    return localSearchResults;
  },
});

//
Template.header.events({
  /**
   *
   */
  'click .search-results a': () => State.clear.localSearchQuery(),

  /**
   *
   */
  'keyup .search input, focus .search input': _.debounce((event) => {
    const value = event.target.value.trim();

    if (!value || value === '') {
      return State.set.localSearchQuery('');
    }

    State.set.localSearchQuery(value);
  }, 350),
});

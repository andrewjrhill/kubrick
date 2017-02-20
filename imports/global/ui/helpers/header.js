import { _ } from 'meteor/underscore';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import { Movies } from '/imports/movies/api/collection.js';
import { State } from '/imports/global/api/State.js';
import '/imports/global/ui/templates/header.html';

// Called when an instance of this template is removed from the DOM and destroyed.
Template.header.onDestroyed(() => {
  State.clear.localSearchQuery();
});

// Specifies helpers available to this template.
Template.header.helpers({
  /**
   * Ensures the search bar is only visible on the movies list view by checking
   * the current route.
   *
   * @retun { Boolean } true
   */
  moviesList: () => {
    const currentRoute = FlowRouter.getRouteName();

    if (currentRoute !== 'movies') {
      return;
    }

    return true;
  },

  /**
   * Gives our template access to local search results.
   *
   * @return { Object } localSearchResults
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

// Specifies event handlers for this template.
Template.header.events({
  /**
   * Clears our search results when clicking on a result, thereby destroying
   * all results data and closing the results dropdown.
   *
   * @return { Method } Call to clear localSearchQuery state.
   */
  'click .search-results a': () => State.clear.localSearchQuery(),

  /**
   * Stores our search query to the session to be picked up by the
   * results() template helper.
   *
   * @return { Method } Call to set the localSearchQuery state.
   */
  'keyup .search input, focus .search input': _.debounce((event) => {
    const value = event.target.value.trim();

    if (!value || value === '') {
      return State.set.localSearchQuery('');
    }

    return State.set.localSearchQuery(value);
  }, 350),
});

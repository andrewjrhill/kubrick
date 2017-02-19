import { Session } from 'meteor/session';

/**
 *
 */
const State = {
  get: {
    status: () => Session.get('status'),
    querying: () => Session.get('querying'),
    movieData: () => Session.get('movieData'),
    moviesList: () => Session.get('moviesList'),
    creditsData: () => Session.get('creditsData'),
    searchResults: () => Session.get('searchResults'),
  },

  set: {
    status: (value) => Session.set('status', value),
    querying: (value) => Session.set('querying', value),
    movieData: (value) => Session.set('movieData', value),
    moviesList: (value) => Session.set('moviesList', value),
    creditsData: (value) => Session.set('creditsData', value),
    searchResults: (value) => Session.set('searchResults', value),
  },

  clear: {
    status: () => Session.set('status', false),
    querying: () => Session.set('querying', undefined),
    movieData: () => Session.set('movieData', undefined),
    moviesList: () => Session.set('moviesList', []),
    creditsData: () => Session.set('creditsData', undefined),
    searchResults: () => Session.set('searchResults', undefined),
  },
};

export { State };

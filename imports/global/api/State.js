import { Session } from 'meteor/session';

/**
 * This object manages our global application state by getting,
 * setting, or clearing various reactive session variables.
 *
 * GLOBAL SESSION VARIABLES:
 * status [String] - Name of the method calling this session variable.
 * querying [Boolean] - Used to hide or show the loading indicator.
 *
 * MOVIES SESSION VARIABLES:
 * tmdbSearchResults [Object] - Intial movie data returned from TheMovieDB after a successful API /search query.
 * rawData [Object] - Movie data after it has been stylized according to the applications needs.
 * creditsData [Object] - Cast and Crew data returned from TheMovieDB after a successful API /credits query.
 * submissionData [Object] - Movie data containing both rawData and creditsData.
 *
 * LOCAL SEARCH SESSION VARIABLES
 * localSearchQuery [String] - Used on /movies when searching the local Movies collection.
 */
const State = {
  get: {
    // Global
    status: () => Session.get('status'),
    querying: () => Session.get('querying'),

    // Movies
    tmdbSearchResults: () => Session.get('tmdbSearchResults'),
    rawData: () => Session.get('rawData'),
    creditsData: () => Session.get('creditsData'),
    submissionData: () => Session.get('submissionData'),

    // Local Search
    localSearchQuery: () => Session.get('localSearchQuery'),
  },

  set: {
    // Global
    status: (value) => Session.set('status', value),
    querying: (value) => Session.set('querying', value),

    // Movies
    tmdbSearchResults: (value) => Session.set('tmdbSearchResults', value),
    rawData: (value) => Session.set('rawData', value),
    creditsData: (value) => Session.set('creditsData', value),
    submissionData: (value) => Session.set('submissionData', value),

    // Local Search
    localSearchQuery: (value) => Session.set('localSearchQuery', value),
  },

  clear: {
    // Global
    status: () => Session.set('status', false),
    querying: () => Session.set('querying', false),

    // Movies
    tmdbSearchResults: () => Session.set('tmdbSearchResults', undefined),
    rawData: () => Session.set('rawData', undefined),
    creditsData: () => Session.set('creditsData', undefined),
    submissionData: () => Session.set('submissionData', []),

    // Local Search
    localSearchQuery: () => Session.set('localSearchQuery', undefined),
  },
};

export { State };

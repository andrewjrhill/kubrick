import { Session } from 'meteor/session';

/**
 * This object manages our global application state by getting,
 * setting, or clearing various session variables.
 */
const State = {
  get: {
    status: () => Session.get('status'),
    rawData: () => Session.get('rawData'),
    querying: () => Session.get('querying'),
    searchQuery: () => Session.get('searchQuery'),
    creditsData: () => Session.get('creditsData'),
    searchResults: () => Session.get('searchResults'),
    submissionData: () => Session.get('submissionData'),
  },

  set: {
    status: (value) => Session.set('status', value),
    rawData: (value) => Session.set('rawData', value),
    querying: (value) => Session.set('querying', value),
    creditsData: (value) => Session.set('creditsData', value),
    searchQuery: (value) => Session.set('searchQuery', value),
    searchResults: (value) => Session.set('searchResults', value),
    submissionData: (value) => Session.set('submissionData', value),
  },

  clear: {
    status: () => Session.set('status', false),
    querying: () => Session.set('querying', false),
    rawData: () => Session.set('rawData', undefined),
    submissionData: () => Session.set('submissionData', []),
    searchQuery: () => Session.set('searchQuery', undefined),
    creditsData: () => Session.set('creditsData', undefined),
    searchResults: () => Session.set('searchResults', undefined),
  },
};

export { State };

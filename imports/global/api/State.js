import { Session } from 'meteor/session';

/**
 *
 */
const State = {
  get: {
    status: () => Session.get('status'),
    rawData: () => Session.get('rawData'),
    querying: () => Session.get('querying'),
    submissionData: () => Session.get('submissionData'),
    creditsData: () => Session.get('creditsData'),
    searchResults: () => Session.get('searchResults'),
  },

  set: {
    status: (value) => Session.set('status', value),
    querying: (value) => Session.set('querying', value),
    rawData: (value) => Session.set('rawData', value),
    submissionData: (value) => Session.set('submissionData', value),
    creditsData: (value) => Session.set('creditsData', value),
    searchResults: (value) => Session.set('searchResults', value),
  },

  clear: {
    status: () => Session.set('status', false),
    querying: () => Session.set('querying', undefined),
    rawData: () => Session.set('rawData', undefined),
    submissionData: () => Session.set('submissionData', []),
    creditsData: () => Session.set('creditsData', undefined),
    searchResults: () => Session.set('searchResults', undefined),
  },
};

export { State };

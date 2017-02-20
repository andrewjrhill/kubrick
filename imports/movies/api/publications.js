import { Meteor } from 'meteor/meteor';
import { Movies } from '/imports/movies/api/collection.js';

// Publishes our data so that it can be subscribed to by the client.
Meteor.publish('movies', () => Movies.find());

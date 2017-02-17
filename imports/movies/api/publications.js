import { Meteor } from 'meteor/meteor';
import { Movies } from '/imports/movies/api/collection.js';

Meteor.publish('movies', () => Movies.find());

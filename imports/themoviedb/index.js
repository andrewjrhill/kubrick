import { Meteor } from 'meteor/meteor';

if (Meteor.isClient) {
  import '/imports/themoviedb/api/TheMovieDB.js';
  import '/imports/themoviedb/ui/helpers/query.js';
}

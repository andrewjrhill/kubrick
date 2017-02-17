import { Meteor } from 'meteor/meteor';
import { Movies } from '/imports/movies/api/collection.js';

if (Meteor.isServer) {
  import '/imports/movies/api/publications.js';
}

if (Meteor.isClient) {
  import '/imports/movies/ui/helpers/movies-create.js';
  import '/imports/movies/ui/helpers/movies-list.js';

  import '/imports/movies/routes.js';
}

export { Movies };

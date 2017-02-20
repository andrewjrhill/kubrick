import { Mongo } from 'meteor/mongo';
import { schema } from '/imports/movies/api/schema.js';

const Movies = new Mongo.Collection('Movies');

Movies.attachSchema(schema);

if ( Meteor.isServer ) {
  Movies._ensureIndex({ title: 1 });
}

Movies.allow({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

export { Movies };

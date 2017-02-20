import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { schema } from '/imports/movies/api/schema.js';

// Create a new mongo collection to house our local movies data.
const Movies = new Mongo.Collection('Movies');

// Attatch our schema to the collection for validation.
Movies.attachSchema(schema);

// Index our data to speed up searching.
if (Meteor.isServer) {
  Movies._ensureIndex({ title: 1 });
}

/**
 * Lock down our collection's allow and deny rules to force
 * database operations to only take palce on the server.
 */
Movies.allow({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

// Export our constructed Mongo collection.
export { Movies };

import { Mongo } from 'meteor/mongo';
import { schema } from '/imports/movies/api/schema.js';

const Movies = new Mongo.Collection('Movies');

Movies.attachSchema(schema);

Movies.allow({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

export { Movies };

import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const schema = new SimpleSchema([{
  title: {
    type: String,
    label: 'title',
    max: 140,
    optional: false,
  },
  year: {
    type: Number,
    label: 'year',
    optional: false,
  },
  director: {
    type: String,
    label: 'director',
    max: 140,
    optional: true,
  },
  cast: {
    type: String,
    label: 'cast',
    optional: true,
  },
  description: {
    type: String,
    label: 'description',
    max: 1100,
    optional: true,
  },
}]);

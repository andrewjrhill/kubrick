import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const schema = new SimpleSchema([{
  title: {
    type: String,
    label: 'title',
    max: 140,
    optional: false,
  },
  description: {
    type: String,
    label: 'description',
    max: 1100,
    optional: true,
  },
  year: {
    type: Number,
    label: 'year',
    optional: true,
  },
  actors: {
    type: Object,
    label: 'actors',
    blackbox: true,
  },
  director: {
    type: String,
    label: 'director',
    max: 140,
    optional: true,
  },
}]);

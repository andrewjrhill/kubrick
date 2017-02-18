import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const schema = new SimpleSchema([{
  banner: {
    type: String,
    label: 'banner',
    optional: true,
  },
  cast: {
    type: [Object],
    label: 'cast',
    optional: true,
  },
  crew: {
    type: [Object],
    label: 'cast',
    optional: true,
  },
  description: {
    type: String,
    label: 'description',
    optional: true,
  },
  poster: {
    type: String,
    label: 'banner',
    optional: true,
  },
  release_date: {
    type: String,
    label: 'release_date',
    optional: true,
  },
  title: {
    type: String,
    label: 'title',
    optional: false,
  },
  tmdb_id: {
    type: Number,
    label: 'tmdb',
    optional: false,
  },
}]);

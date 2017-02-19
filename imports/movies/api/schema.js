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
    blackbox: true,
  },
  crew: {
    type: [Object],
    label: 'crew',
    optional: true,
    blackbox: true,
  },
  description: {
    type: String,
    label: 'description',
    optional: true,
  },
  location: {
    type: String,
    label: 'location',
    optional: true,
  },
  poster: {
    type: String,
    label: 'banner',
    optional: true,
  },
  movie_type: {
    type: String,
    label: 'movie_type',
    optional: false,
  },
  release_date: {
    type: String,
    label: 'release_date',
    optional: true,
  },
  release_year: {
    type: String,
    label: 'release_year',
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

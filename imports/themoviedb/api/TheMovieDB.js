import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { Movies } from '/imports/movies/api/collection.js';

const TheMovieDB = {
  /**
   * The handleSearchURI method accepts a search query string and constructs
   * an encoded URI that can be used to query TheMovieDB for movies.
   *
   * @param { String } query
   * @return { String } A constructed search URI.
   */
  handleSearchURI: (query) => {
    const { base_uri, key_v3 } = Meteor.settings.public.themoviedb;
    const encodedQuery = encodeURI(query);
    return `${base_uri}/search/movie?api_key=${key_v3}&query=${encodedQuery}`;
  },

  /**
   *
   */
  searchTheMovieDB: (endpointURI) => {
    HTTP.call('GET', endpointURI, {}, (error, result) => {
      if (error) {
        throw new Meteor.Error('Error requesting data from TheMovieDB', error);
      }

      Session.set('searchResults', result);
    });
  },

  /**
   *
   */
  handleCreditsURI: (movieID) => {
    const { base_uri, key_v3 } = Meteor.settings.public.themoviedb;
    return `${base_uri}/movie/${movieID}/credits?api_key=${key_v3}`;
  },

  /**
   *
   */
  getMovieCredits: (creditsURI) => {
    const baseData = Session.get('movieData');
    const { tmdb_id } = baseData;

    HTTP.call('GET', creditsURI, {}, (error, result) => {
      if (error) {
        throw new Meteor.Error('Error requesting data from TheMovieDB', error);
      }

      Session.set('creditsData', result);
    });
  },

  /**
   *
   */
  getSearchResults: () => Session.get('searchResults'),

  /**
   *
   */
  clearSearchResults: () => Session.set('searchResults', ''),

  /**
   *
   */
  setMovieData: (rawData) => {
    if (!rawData) {
      throw new Meteor.Error('422', 'No raw movie data found');
    }

    const {
      id: tmdb_id,
      backdrop_path: banner,
      original_title: title,
      overview: description,
      poster_path: poster,
      release_date,
    } = rawData;

    const data = {
      banner: `https://image.tmdb.org/t/p/w1300_and_h730_bestv2${banner}`,
      description,
      poster: `https://image.tmdb.org/t/p/w300_and_h450_bestv2${poster}`,
      title,
      tmdb_id,
      release_date,
    };

    Session.set('movieData', data);
  },

  /**
   *
   */
  getMovieData: () => Session.get('movieData'),
}

export { TheMovieDB };

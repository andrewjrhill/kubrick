import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { Tracker } from 'meteor/tracker';
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
    Session.set('queryingActive', true);

    return HTTP.call('GET', endpointURI, {}, (error, result) => {
      Session.set('queryingActive', false);

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

    Session.set('queryingActive', true);

    return HTTP.call('GET', creditsURI, {}, (error, result) => {
      Session.set('queryingActive', false);

      if (error) {
        throw new Meteor.Error('Error requesting data from TheMovieDB', error);
      }

      Session.set('creditsData', result);
    });
  },

  /**
   *
   */
  getCreditsData: () => Session.get('creditsData'),

  /**
   *
   */
  clearCreditsData: () => Session.set('creditsData', undefined),

  /**
   *
   */
  getSearchResults: () => Session.get('searchResults'),

  /**
   *
   */
  clearSearchResults: () => Session.set('searchResults', undefined),

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
      banner: banner ? `https://image.tmdb.org/t/p/w780${banner}` : '/images/placeholder-banner.jpg',
      description,
      poster: poster ? `https://image.tmdb.org/t/p/w300_and_h450_bestv2${poster}` : '/images/placeholder-poster.jpg',
      title,
      tmdb_id,
      release_date,
      release_year: release_date.split('-').slice(0, 1)[0],
    };

    return Session.set('movieData', data);
  },

  /**
   *
   */
  getMovieData: () => Session.get('movieData'),

  /**
   *
   */
  clearMovieData: () => Session.set('movieData', undefined),

  /**
   *
   */
  setmoviesList: () => {
    const movieData = TheMovieDB.getMovieData();
    const creditsData = TheMovieDB.getCreditsData();
    const currentmoviesList = Session.get('moviesList');

    if ((movieData && !movieData) || (creditsData && !creditsData)) {
      return;
    }

    const { cast, crew } = creditsData.data;

    const moviesList = [
      ...currentmoviesList,
      {
        ...movieData,
        cast: cast.slice(0, 10),
        crew: crew,
      }
    ];

    TheMovieDB.clearMovieData();
    TheMovieDB.clearCreditsData();

    return Session.set('moviesList', moviesList);
  },
}

export { TheMovieDB };

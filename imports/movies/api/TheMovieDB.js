import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';
import { State } from '/imports/global/api/State.js';

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
    State.set.querying(true);

    return HTTP.call('GET', endpointURI, {}, (error, result) => {
      State.set.querying(false);

      if (error) {
        throw new Meteor.Error('Error requesting data from TheMovieDB', error);
      }

      State.set.status('searchTheMovieDB');
      State.set.searchResults(result);
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
  setCreditsData: (creditsURI) => {
    State.set.querying(true);

    return HTTP.call('GET', creditsURI, {}, (error, result) => {
      State.set.querying(false);

      if (error) {
        throw new Meteor.Error('Error requesting data from TheMovieDB', error);
      }

      State.set.status('setCreditsData');
      State.set.creditsData(result);
    });
  },

  /**
   *
   */
  clearSearchResults: () => {
    State.set.status('clearSearchResults');
    State.clear.searchResults();
  },

  /**
   *
   */
  setRawData: (rawData) => {
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

    State.set.status('setRawData');
    State.set.rawData(data);
  },

  /**
   *
   */
  addToSubmisionData: (type, location) => {
    const rawData = State.get.rawData();
    const creditsData = State.get.creditsData();
    const currentsubmissionData = State.get.submissionData();

    if ((rawData && !rawData) || (creditsData && !creditsData)) {
      return;
    }

    const { cast, crew } = creditsData.data;

    const submissionData = [
      ...currentsubmissionData,
      {
        location,
        movie_type: type,
        ...rawData,
        cast: cast.slice(0, 10),
        crew,
      },
    ];

    State.clear.rawData();
    State.clear.creditsData();

    State.set.status('addToSubmisionData');
    State.set.submissionData(submissionData);
  },
};

export { TheMovieDB };

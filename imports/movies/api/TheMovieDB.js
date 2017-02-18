import { Meteor } from 'meteor/meteor';
import { Movies } from '/imports/movies/api/collection.js';

export default TheMovieDB = {
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
  * The queryTheMovieDB method accepts an enpoint URI string and makes a
  * non-blocking HTTP GET request to the TheMovieDB API.
  *
  * @param { String } endpointURI.
  * @return { Object } result
  */
  queryTheMovieDB: (endpointURI) => {
    HTTP.call('GET', endpointURI, {}, (error, result) => {
      if (error) {
        throw new Meteor.Error('Error requesting data from TheMovieDB', error);
      }

      return result;
    });
  }
}

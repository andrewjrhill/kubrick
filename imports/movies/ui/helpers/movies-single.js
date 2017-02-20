import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Template } from 'meteor/templating';
import { sAlert } from 'meteor/juliancwirko:s-alert';
import { FlowRouter } from 'meteor/kadira:flow-router';

import { Movies } from '/imports/movies/api/collection.js';
import '/imports/movies/ui/templates/movies-single.html';

// Called when an instance of this template is removed from the DOM and destroyed.
Template.moviesSingle.onCreated(() => {
  const templateInstance = Template.instance();

  // Subscribes this template to our Mongo collection publication.
  Tracker.autorun(() => {
    templateInstance.movieId = FlowRouter.getParam('id');
    Meteor.subscribe('movies');
  });
});

// Specifies helpers available to this template.
Template.moviesSingle.helpers({
  /**
   * Queries our mongo collection to find a movie with a given database ID.
   * @return { Object } movie data
   */
  movie: () => {
    const templateInstance = Template.instance();
    return Movies.findOne({ _id: templateInstance.movieId });
  },

  /**
   * Used by our template to determine which image to display
   * based on the movie type.
   */
  typeImageSource: () => {
    const templateInstance = Template.instance();
    const movie = Movies.findOne({ _id: templateInstance.movieId });

    switch (movie.movie_type) {
      case 'DVD':
        return '/images/logo-dvd.svg';
      case 'Blu-Ray':
        return '/images/logo-blu-ray.svg';
      case 'Digital Download':
        return '/images/logo-digital-download.svg';
      default:
        return '/images/logo-other.svg';
    }
  },

  /**
   * Used by our template to retrieve department members from the collection.
   * @param { String } department names include "Directing", "Writing", and more...
   * @return { String } department members or unknown.
   */
  departmentMembers: (department) => {
    const templateInstance = Template.instance();
    const movie = Movies.findOne({ _id: templateInstance.movieId });

    const members = movie.crew
      .map(crew => crew.department === department ? crew.name : '')
      .map(member => member)
      .filter(member => member !== '');

    if (members.length === 0) {
      return 'Unknown';
    }

    return members.join(', ');
  },

  /**
   * Much like the department helper, this is used by our template to
   * retrieve crew members from the collection.
   * @return { String } crew members or unknown.
   */
  castMembers: () => {
    const templateInstance = Template.instance();
    const movie = Movies.findOne({ _id: templateInstance.movieId });
    const cast = movie.cast.map((member) => member.name);

    if (cast.length === 0) {
      return 'Unknown';
    }

    return cast.join(', ');
  },
});

// Specifies event handlers for this template.
Template.moviesSingle.events({
  /**
   * On click, this event will navigate us to a given movies edit page.
   * @return { Call } redirect
   */
  'click .edit': (event, template) => FlowRouter.go(`/movies/${template.movieId}/edit`),

  /**
   * On click, this event will remove movie from the Mongo collection.
   */
  'click .delete': (event) => {
    const { _id, title } = Template.currentData(event.currentTarget);

    Movies.remove({ _id });
    sAlert.warning(`You have deleted "${title}" from your collection.`);
    return FlowRouter.go('/');
  },
});

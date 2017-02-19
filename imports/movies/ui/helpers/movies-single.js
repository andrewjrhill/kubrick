import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import { Movies } from '/imports/movies/api/collection.js';
import '/imports/movies/ui/templates/movies-single.html';


//
Template.moviesSingle.onCreated(() => {
  const templateInstance = Template.instance();

  Tracker.autorun(() => {
    templateInstance.movieId = FlowRouter.getParam('id');
    Meteor.subscribe('movies');
  });
});

//
Template.moviesSingle.helpers({
  /**
   *
   */
  movie: () => {
    const templateInstance = Template.instance();
    return Movies.findOne({ _id: templateInstance.movieId });
  },

  /**
   *
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
   *
   */
  getCrewMember: (job) => {
    const templateInstance = Template.instance();
    const movie = Movies.findOne({ _id: templateInstance.movieId });

    const member = movie.crew
      .map(crew => crew.job === job ? crew.name : '')
      .map(member => member !== '' ? member : '')
      .filter(member => member !== '');

    if (member.length === 0) {
      return 'Unknown';
    }

    return member.join(', ');
  },

  /**
   *
   */
  cast: () => {
    const templateInstance = Template.instance();
    const movie = Movies.findOne({ _id: templateInstance.movieId });
    const cast = movie.cast.map((member) => member.name);

    if (cast.length === 0) {
      return 'Unknown';
    }

    return cast.join(', ');
  },
});

//
Template.moviesSingle.events({
  /**
   *
   */
  'click .edit'(event, template) {
    FlowRouter.go(`/movies/${template.movieId}/edit`);
  },

  /**
   *
   */
  'click .delete'(event, template) {
    const { _id } = Template.currentData(event.currentTarget);
    Movies.remove({ _id });
    FlowRouter.go(`/`);
  },
});

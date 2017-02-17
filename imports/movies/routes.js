import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

const moviesGroup = FlowRouter.group({
  prefix: '/movies',
});

moviesGroup.route('/', {
  name: 'movies',
  action() {
    BlazeLayout.render('mainLayout', {
      content: 'moviesList',
    });
  },
});

moviesGroup.route('/create', {
  name: 'moviesCreate',
  action() {
    BlazeLayout.render('mainLayout', {
      content: 'moviesCreate',
    });
  },
});

moviesGroup.route('/:id', {
  name: 'moviesSingle',
  action() {
    BlazeLayout.render('mainLayout', {
      content: 'moviesSingle',
    });
  },
});

moviesGroup.route('/:id/edit', {
  name: 'moviesEdit',
  action() {
    BlazeLayout.render('mainLayout', {
      content: 'moviesEdit',
    });
  },
});

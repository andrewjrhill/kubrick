import { FlowRouter } from 'meteor/kadira:flow-router';

/**
 * Redirect to the movies list view route when hitting
 * the applications root route.
 */
FlowRouter.route('/', {
  triggersEnter: [() => {
    FlowRouter.redirect('/movies');
  }],
});

/**
 * Redirect to the movies list view route when hitting
 * a URL the application does not recognise.
 */
FlowRouter.notFound = {
  action: () => {
    FlowRouter.redirect('/movies');
  },
};

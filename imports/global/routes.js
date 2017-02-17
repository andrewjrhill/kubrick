import { FlowRouter } from 'meteor/kadira:flow-router';

// Home Route
FlowRouter.route('/', {
  triggersEnter: [() => {
    FlowRouter.redirect('/movies');
  }],
});

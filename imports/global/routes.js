import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

const rootGroup = FlowRouter.group({
  prefix: '/',
});

rootGroup.route('/', {
  name: 'root',
  action() {
    BlazeLayout.render('mainLayout');
  },
});

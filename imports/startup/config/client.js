import { Meteor } from 'meteor/meteor';
import { sAlert } from 'meteor/juliancwirko:s-alert';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

Meteor.startup(() => {
  // Configure Blaze Layout root element.
  BlazeLayout.setRoot('body');

  // Configure notification defaults.
  sAlert.config({
    effect: 'stackslide',
    position: 'bottom-left',
    onRouteClose: false,
    timeout: 3500,
    html: false,
    stack: true,
    beep: false,
    offset: 0,
  });
});

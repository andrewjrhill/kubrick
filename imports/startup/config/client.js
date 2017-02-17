import { Meteor } from 'meteor/meteor';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// Configure Blaze Layout
Meteor.startup(() => {
  BlazeLayout.setRoot('body');
});

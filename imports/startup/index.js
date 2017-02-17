import { Meteor } from 'meteor/meteor';

if (Meteor.isServer) {
  import '/imports/startup/config/server.js';
}

if (Meteor.isClient) {
  import '/imports/startup/config/client.js';
}

import { Meteor } from 'meteor/meteor';

// Defines our global routes.
import '/imports/global/routes.js';

if (Meteor.isClient) {
  // Helpers
  import '/imports/global/ui/helpers/global.js';

  // Templates
  import '/imports/global/ui/templates/main-layout.html';
  import '/imports/global/ui/templates/header.html';
}

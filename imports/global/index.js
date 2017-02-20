import { Meteor } from 'meteor/meteor';

import '/imports/global/routes.js';
import '/imports/global/api/State.js';

if (Meteor.isClient) {
  import '/imports/global/ui/helpers/global.js';
  import '/imports/global/ui/helpers/header.js';
  import '/imports/global/ui/templates/main-layout.html';
}

export { State };

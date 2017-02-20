import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

/**
 * Gets the name of the current route
 * @return { String } current route name
 */
Template.registerHelper('routeName', () => FlowRouter.getRouteName());

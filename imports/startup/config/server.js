import { Meteor } from 'meteor/meteor';
import { BrowserPolicy } from 'meteor/browser-policy-common';

// On startup, server package configuration
Meteor.startup(() => {
  console.log(`
------------------
WELCOME TO KUBRICK
------------------`);

  // A list of URLs to be trusted by the app to prevent injections/iFraming.
  const trustedURLs = [
    'fonts.googleapis.com',
  ];

  BrowserPolicy.framing.disallow();
  BrowserPolicy.content.disallowEval();
  BrowserPolicy.content.allowFontDataUrl();
  BrowserPolicy.content.allowFontDataUrl();
  BrowserPolicy.content.allowInlineStyles();

  if (!trustedURLs || !trustedURLs.count) {
    trustedURLs.map((origin) => BrowserPolicy.content.allowOriginForAll(origin));
  }
});
/* eslint-disable */

// Mobile Preferences
App.setPreference('Orientation', 'portrait');
App.setPreference('HideKeyboardFormAccessoryBar', 'true');
App.setPreference('Fullscreen', 'false');
App.setPreference('DisallowOverscroll', 'true');
App.setPreference('webviewbounce', 'false');
App.setPreference('AutoHideSplashScreen', 'true');
App.setPreference('LoadUrlTimeoutValue', 1000000);
App.setPreference('WebAppStartupTimeout', 1000000);

// Android 5.0+
App.setPreference('android-targetSdkVersion', '23');
App.setPreference('android-minSdkVersion', '19');

// iOS
App.accessRule('*', { type: 'navigation' });
App.accessRule('*', { type: 'intent' });
App.accessRule('http://*', { type: 'navigation' });
App.accessRule('https://*', { type: 'navigation' });
App.accessRule('http://*', { type: 'intent' });
App.accessRule('https://*', { type: 'intent' });
App.accessRule('tel:*', { type: 'intent' });
App.accessRule('mailto:*', { type: 'intent' });

// Local
App.accessRule('*');
App.accessRule('blob:*');
App.accessRule('meteor.local');
App.accessRule('localhost');
App.accessRule('10.0.0.104');
App.accessRule('10.0.2.2');

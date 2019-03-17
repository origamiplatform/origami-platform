// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyBD5A_lOseK4DZALJFzPu7Lh4J-FqVoU10',
    authDomain: 'origami-platform-232319.firebaseapp.com',
    databaseURL: 'https://origami-platform-232319.firebaseio.com',
    projectId: 'origami-platform-232319',
    storageBucket: 'origami-platform-232319.appspot.com',
    messagingSenderId: '554205679285'
  },
  blockchainDomain: 'com.origami.platform',
  blockchainAPI: 'http://35.192.19.169:3000/api'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

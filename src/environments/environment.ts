// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyD2dY6ZFKTJK8XPYeY8wGsNhW8qIx6TIdw',
    authDomain: 'origami-mvp.firebaseapp.com',
    databaseURL: 'https://origami-mvp.firebaseio.com',
    projectId: 'origami-mvp',
    storageBucket: 'origami-mvp.appspot.com',
    messagingSenderId: '94839141407'
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

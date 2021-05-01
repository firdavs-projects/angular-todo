// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import {Environment} from './interface';

export const environment: Environment = {
  production: false,
  apiKey: 'AIzaSyA9vO7QPwSrUid0XyY-sz0wBtxFzspTnfE',
  fbDbUrl: 'https://todo-angular-4beaa-default-rtdb.firebaseio.com',
  firebaseConfig: {
    apiKey: 'AIzaSyA9vO7QPwSrUid0XyY-sz0wBtxFzspTnfE',
    authDomain: 'todo-angular-4beaa.firebaseapp.com',
    databaseURL: 'https://todo-angular-4beaa-default-rtdb.firebaseio.com',
    projectId: 'todo-angular-4beaa',
    storageBucket: 'todo-angular-4beaa.appspot.com',
    messagingSenderId: '343798184911',
    appId: '1:343798184911:web:5538524d6d2fdcb1f2f0ba',
    measurementId: 'G-F9EYY7H1MF'
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

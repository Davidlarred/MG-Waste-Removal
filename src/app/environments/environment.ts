// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // graphqlUrl: '/api/graphql',
  // graphqlUrl: 'https://dev.acuclatina.com/api/graphql',
  localApi: 'http://localhost:5000',
  firebaseConfig: {
    apiKey: 'AIzaSyAKBSF2WsbmnKhQ2xrYDnGBmfqdtKUhoLM',
    authDomain: 'mg-waste-backend.firebaseapp.com',
    projectId: 'mg-waste-backend',
    storageBucket: 'mg-waste-backend.appspot.com',
    messagingSenderId: '1029759749149',
    appId: '1:1029759749149:web:b1f2b9ce46c2ce54bdcaf4',
    measurementId: 'G-XZDRRTSNS2',
  },
  // localApi: 'https://acuc-api.herokuapp.com',
  //  graphqlUrl: 'http://localhost:3000/api/graphql',
  // restUploadFile: 'http://localhost:5000/user/uploadPicture',
  // restUploadFile: 'https://acuc-api.herokuapp.com/user/uploadPicture',
  // restDonloadFile: 'http://localhost:3000/rest/profile-image/',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

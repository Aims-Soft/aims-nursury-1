// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  envName: 'prod',
  // apiUrl: 'http://localhost:8500/',
  // http://localhost:8506
  apiUrl: 'http://159.69.174.28:8500/',
  // apiUrl: 'http://95.217.205.57:8500/',
  // imageUrl: 'C:/inetpub/wwwroot/aims-pos/assets/ui/',
  imageUrl: 'E:/projects/aims-pos/libs/ui/src/lib/assets/images/',
  // imageSavedPath: 'http://157.90.101.251:9000/assets/ui/',
  imageSavedPath: 'E:/projects/aims-pos/libs/ui/src/lib/assets/images/',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

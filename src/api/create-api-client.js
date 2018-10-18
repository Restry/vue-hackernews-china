// import Firebase from 'firebase/app'
// import 'firebase/database'
import instance from './instance'

export function createAPI({ config, version }) {
  console.log('create api success - client');
  // Firebase.initializeApp(config)
  const api = instance()
  api.cachedIds = {}; 
  api.defaults.params = {};
  api.defaults.params[ 'area' ] = config.cacheCityKey;
 
  return api;
}

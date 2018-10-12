// import Firebase from 'firebase/app'
// import 'firebase/database'
import instance from './instance'

export function createAPI({ config, version }) {
  console.log('create api success - client');
  // Firebase.initializeApp(config)
  const api = instance()
  api.cachedIds = {}; 
  api.instance.defaults.params = {};
  api.instance.defaults.params[ 'area' ] = config.cacheCityKey;
 
  return api;
}

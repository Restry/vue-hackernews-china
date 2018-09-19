// import Firebase from 'firebase/app'
// import 'firebase/database'
import instance from './instance'

export function createAPI ({ config, version }) {
  console.log('create api success - client');
  // Firebase.initializeApp(config)
  return instance
}

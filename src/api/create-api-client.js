import Firebase from 'firebase/app'
import 'firebase/database'

export function createAPI ({ config, version }) {
  console.log('create api success - client');
  Firebase.initializeApp(config)
  return Firebase.database().ref(version)
}

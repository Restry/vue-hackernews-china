import Firebase from 'firebase'
import instance from './instance'
import LRU from 'lru-cache'

export function createAPI ({ config, version }) {
  console.log('create api success - server');
  let api
  // this piece of code may run multiple times in development mode,
  // so we attach the instantiated API to `process` to avoid duplications
  if (process.__API__) {
    api = process.__API__
  } else {
    Firebase.initializeApp(config)
    api = process.__API__ = instance

    api.onServer = true

    // fetched item cache
    api.cachedItems = LRU({
      max: 1000,
      maxAge: 1000 * 60 * 15 // 15 min cache
    })

    // cache the latest story ids
    api.cachedIds = {}
    ;['top', 'new', 'show', 'ask', 'job'].forEach(type => {
      api.child(`${type}stories`).then(snapshot => {
        api.cachedIds[type] = snapshot.data
      })
    })
  }
  return api
}

// this is aliased in webpack config based on server/client build
import { createAPI } from 'create-api'

const logRequests = !!process.env.DEBUG_API

export default context => {

  const api = createAPI({
    version: '/v0',
    config: {
      databaseURL: 'https://hacker-news.firebaseio.com',
      context
    }
  })

  // warm the front page cache every 15 min
  // make sure to do this only once across all requests
  if (api.onServer) {
    warmCache()
  }

  function warmCache() {
    fetchItems((api.cachedIds.top || []).slice(0, 30))
    setTimeout(warmCache, 1000 * 60 * 15)
  }

  function fetch(child) {
    logRequests && console.log(`fetching ${child}...`)
    const cache = api.cachedItems
    if (cache && cache.has(child)) {
      logRequests && console.log(`cache hit for ${child}.`)
      return Promise.resolve(cache.get(child))
    } else {
      return new Promise((resolve, reject) => {
        api.child(child).then(snapshot => {
          const val = snapshot.data
          // mark the timestamp when this item is cached
          if (val) val.__lastUpdated = Date.now()
          cache && cache.set(child, val)
          logRequests && console.log(`fetched ${child}.`)
          resolve(val)
        }, reject)
      })
    }
  }


  function fetchIdsByType(type) {
    return api.cachedIds && api.cachedIds[type]
      ? Promise.resolve(api.cachedIds[type])
      : fetch(`${type}stories`)
  }

  function fetchItem(id) {
    return fetch(`item/${id}`)
  }

  function fetchItems(ids) {
    return Promise.all(ids.map(id => fetchItem(id)))
  }

  function fetchUser(id) {
    return fetch(`user/${id}`)
  }

  return {
    fetchIdsByType, fetchItem, fetchItems, fetchUser
  }
};



// export function watchList (type, cb) {
//   let first = true
//   const ref = api.child(`${type}stories`)
//   const handler = snapshot => {
//     if (first) {
//       first = false
//     } else {
//       cb(snapshot.data)
//     }
//   }
//   ref.on('value', handler)
//   return () => {
//     ref.off('value', handler)
//   }
// }

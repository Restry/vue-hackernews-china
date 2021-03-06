// this is aliased in webpack config based on server/client build
import { createAPI } from 'create-api'

const logRequests = !!process.env.DEBUG_API

export default context => {

  let cacheCityKey = '';
  if (context) {
    cacheCityKey = context.city.pinyin.toLowerCase();
  } else {
    cacheCityKey = location.hostname.split('.')[0].toLowerCase()
  }

  const api = createAPI({
    version: '/v0',
    config: {
      databaseURL: '',
      context,
      cacheCityKey
    }
  })

  // // warm the front page cache every 15 min
  // // make sure to do this only once across all requests
  // if (api.onServer) {
  //   warmCache()
  // }

  // function warmCache() {
  //   fetchItems(((api.cachedIds[cacheCityKey] && api.cachedIds[cacheCityKey]['top']) || []).slice(0, 30))
  //   setTimeout(warmCache, 1000 * 60 * 15)
  // }

  function fetch(child) {
    logRequests && console.log(`fetching ${child}...`)
    const cache = api.cachedItems
    if (cache && cache.has(child)) {
      logRequests && console.log(`cache hit for ${child}.`)
      return Promise.resolve(cache.get(child))
    } else {
      return new Promise((resolve, reject) => {
        api.get(child).then(snapshot => {
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
    // debugger;
    return api.cachedIds[cacheCityKey] && api.cachedIds[cacheCityKey][type]
      ? Promise.resolve(api.cachedIds[cacheCityKey][type])
      : fetch(`${type}stories`)
  }

  function fetchItem(id) {
    return fetch(`item/${id}`)
  }

  function fetchItems(ids) {
    console.log('fetchItems');
    return api.get(`/items/${cacheCityKey}`)
    //   return Promise.all(ids.map(id => fetchItem(id)))
  }

  function fetchUser(id) {
    return fetch(`user/${id}`)
  }

  function fetchCityData(city, limit) {
    return api.get(`/items/${city}?$limit=${limit}`)
  }

  return {
    fetchIdsByType, fetchItem, fetchItems, fetchUser, fetchCityData
  }
};



// export function watchList (type, cb) {
//   let first = true
//   const ref = api.get(`${type}stories`)
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

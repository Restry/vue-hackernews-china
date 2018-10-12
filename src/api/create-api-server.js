// import Firebase from 'firebase'
import instance from './instance'
import LRU from 'lru-cache'

export function createAPI({ config, version }) {
  console.log('create api success - server');
  let api
  // this piece of code may run multiple times in development mode,
  // so we attach the instantiated API to `process` to avoid duplications
  if (process.__API__) {
    api = process.__API__ 
    console.log('api server:'+config.cacheCityKey,config.context)
    Object.assign(api,instance(config.context))  //更新header接口
  } else {
    // Firebase.initializeApp(config)
    // debugger;
    api = process.__API__ = instance(config.context)

    api.onServer = true

    // fetched item cache
    api.cachedItems = LRU({
      max: 1000,
      maxAge: 1000 * 60 * 15 // 15 min cache
    })

    // cache the latest story ids
    api.cachedIds = {};
  }
  
  if (!api.cachedIds[config.cacheCityKey])
    ['top', /*'new', 'show', 'ask', 'job'*/].forEach(type => {
      debugger;
      api.child(`${config.cacheCityKey}-${type}-stories`).then(snapshot => {
        const item = api.cachedIds[config.cacheCityKey] || {};
        item[type] = snapshot.data
        // debugger;
        api.cachedIds[config.cacheCityKey] = item
      })
    })

  return api
}

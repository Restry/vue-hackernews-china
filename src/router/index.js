import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// route-level code splitting
const createListView = id => () => import('../views/CreateListView').then(m => m.default(id))
// const indexData = id => () => import('../views/indexData').then(d => d.default(id)) // DESC 不用动态加载 , 首页只有一个
const IndexView = () => import('../views/index.vue')
const ItemView = () => import('../views/ItemView.vue')
const UserView = () => import('../views/UserView.vue') 


export function createRouter() {
  return new Router({
    mode: 'history',
    fallback: false,
    scrollBehavior: () => ({ y: 0 }),
    routes: [
      { path: '/top/:page(\\d+)?', component: createListView('top') },
      { path: '/new/:page(\\d+)?', component: createListView('new') },
      { path: '/show/:page(\\d+)?', component: createListView('show') },
      { path: '/ask/:page(\\d+)?', component: createListView('ask') },
      { path: '/job/:page(\\d+)?', component: createListView('job') },
      { path: '/item/:id', component: ItemView },
      { path: '/user/:id', component: UserView },
      // { path: '/', redirect: '/top' },  // DESC 此处不用自动跳转,  跳转逻辑放到IndexView中
      { path: '/', component: IndexView}
    ]
  })
}

import index from './index.vue'
//import app from '../../main'

const camelize = str => str.charAt(0).toUpperCase() + str.slice(1)

// This is a factory function for dynamically creating root-level list views,
// since they share most of the logic except for the type of items to display.
// They are essentially higher order components wrapping ItemList.vue.
export default function indexData (type) {
  return {
    name: `${type}-stories-view`,

    asyncData ({ store,context }) {
      return store.dispatch('FETCH_LIST_DATA', { type })
    },

    title: camelize(type),

    render (h) {
      return h(index, { props: { type }})
    }
  }
}

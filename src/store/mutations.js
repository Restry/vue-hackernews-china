import Vue from 'vue'

export default {
  SET_ACTIVE_TYPE: (state, { type }) => {
    state.activeType = type
  },

  SET_LIST: (state, { type, ids }) => {
    state.lists[type] = ids
  },

  SET_ITEMS: (state, { items }) => {
    // debugger;
    items.forEach(item => {
      if (item) {
        Vue.set(state.items, item._id, item)
      }
    })
  },

  SET_USER: (state, { id, user }) => {
    Vue.set(state.users, id, user || false) /* false means user not found */
  },

  //填充数据
  SET_CITY_DATA: (state, { items }) => {
    state.cityData=[];
    //debugger;
    items.forEach(item => {
      if (item) {
        state.cityData.push(item);
        //Vue.set(state.cityData, item._id, item)
      }
    })
  },
}

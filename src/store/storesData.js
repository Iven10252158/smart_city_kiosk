import axios from 'axios'

const state = {
  merchantValue: '',
  categories: [], // sideMenu分類
  allTypes: [],
  types: [],
  typeBtn: '',
  stores: [],
  district: '',
  isShow: false
}

const mutations = {
  getValue (state, payload) {
    state.merchantValue = payload
    if (state.merchantValue === undefined || state.merchantValue === '') {
      // console.log(state.types)
      state.types = []
    }
  },
  // 依照 sideMenu 區分的types
  districtType (state, payload) {
    console.log('districtType', payload)
    const Types = new Set()
    state.stores.forEach(store => {
      if (store.region === payload) {
        Types.add(store.type)
      }
      state.types = [...Types]
    })
  },
  // 點擊 types 出現的商家
  filterType (state, payload) {
    if (payload === '' || payload === undefined) {
      state.typeBtn = ''
    } else {
      state.typeBtn = payload
    }
  },
  getAllShops (state, payload) {
    state.stores = payload
    console.log('getAllShops', state.stores)
  },
  getCategories (state, payload) {
    state.categories = payload.region
    state.allTypes = payload.type
    // console.log(payload)
  },
  getDistrict (state, payload) {
    state.district = payload
  },
  controlArrowBtn (state) {
    state.isShow = !state.isShow
    console.log('state.isShow', state.isShow)
  }
}

const actions = {
  getValue ({ commit }, payload) {
    commit('getValue', payload)
  },
  districtType ({ commit }, district) {
    commit('districtType', district)
  },
  filterType ({ commit }, type) {
    commit('filterType', type)
    console.log('filterType', type)
  },
  getAllShops ({ commit }) {
    return axios.get('http://20.106.156.149:8080/shop/?offset=10&page=1')
      .then(res => {
        console.log(res.data)
        commit('getAllShops', res.data)
        return res.data
      })
  },
  getCategories ({ commit }) {
    return axios.get('http://20.106.156.149:8080/shop/items')
      .then(res => {
        commit('getCategories', res.data)
        return res.data
      })
  },
  getDistrict ({ commit }, district) {
    commit('getDistrict', district)
  },
  showArrowBtn ({ commit }) {
    commit('controlArrowBtn')
  }
}

const getters = {
  storesData (state) {
    return state.stores
  },
  categories (state) {
    return state.categories
  },
  merchantValue (state) {
    return state.merchantValue
  },
  allTypes (state) {
    return state.allTypes
  },
  types (state) {
    return state.types
  },
  TypeBtn (state) {
    return state.typeBtn
  },
  district (state) {
    return state.district
  },
  isShow (state) {
    return state.isShow
  }
}

export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true
}

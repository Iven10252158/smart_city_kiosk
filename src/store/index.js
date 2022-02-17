import { createStore } from 'vuex'
import storesData from './storesData'
export default createStore({
  state: {
    image: '',
    video: {
      src: ''
    }
  },
  mutations: {
    onOpen () {
      console.log('vuex onOpen')
    },
    handWsRes (state, payload) {
      console.log('payload', payload)
      if (payload.id) {
        payload.content.forEach(item => {
          switch (item.type) {
            case 'newsticker' :
              state.newSticker = item.content
              // console.log('newsticker', state.newSticker, item.listID)
              break
            case 'image' :
              state.image = item.content
              // console.log('image', state.image)
              break
            case 'video':
              console.log(state.video.src)
              state.video.src = `https://www.youtube.com/embed/${item.content}?wmode=opaque&autohide=1&autoplay=1&mute=1&loop=1&playlist=${item.content}`
              break
          }
        })
      } else {
        switch (payload.type) {
          case 'newsticker' :
            state.newSticker = payload.content
            console.log('else newsticker', state.newSticker)
            break
          case 'image' :
            state.image = payload.content
            break
          case 'video':
            console.log(state.video.src)
            state.video.src = `https://www.youtube.com/embed/${payload.content}?wmode=opaque&autohide=1&autoplay=1&mute=1&loop=1&playlist=${payload.content}`
            break
        }
      }
    }
  },
  actions: {
    onOpen ({ commit }) {
      commit('onOpen')
    },
    handWsRes ({ commit }, messages) {
      commit('handWsRes', messages)
    }
  },
  getters: {
    image (state) {
      return state.image
    },
    video (state) {
      return state.video.src
    }
  },
  modules: {
    storesData
  }
})

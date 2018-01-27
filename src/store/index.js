import Vue from 'vue'
import Vuex from 'vuex'
import feathersVuex from 'feathers-vuex'
import feathersClient from 'src/api/client'

const { service, auth } = feathersVuex(feathersClient, { idField: '_id' })

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [
    service('users', {
      enableEvents: false // turn off socket event listeners. It's true by default
    }),

    service('messages', {
      enableEvents: true
    })

    //// Specify custom options per service
    //service('/v1/tasks', {
    //  idField: '_id', // The field in each record that will contain the id
    //  nameStyle: 'path', // Use the full service path as the Vuex module name, instead of just the last section
    //  namespace: 'custom-namespace', // Customize the Vuex module name.  Overrides nameStyle.
    //  autoRemove: true, // automatically remove records missing from responses (only use with feathers-rest)
    //  enableEvents: false // turn off socket event listeners. It's true by default
    //})
    //
    //// Add custom state, getters, mutations, or actions, if needed.  See example in another section, below.
    //service('things', {
    //  state: {},
    //  getters: {},
    //  mutations: {},
    //  actions: {}
    //})

    // We don't bother with the "auth" module - we have a working auth module already (see api/auth.js)
    //auth()
  ]
})

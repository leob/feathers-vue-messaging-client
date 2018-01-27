import client from 'src/api/client'
//import { Promise } from 'es6-promise'
import { debug as log } from 'src/logger'

const debug = log('auth')

const auth = {

  user: null,

  getUser() {
    return this.user
  },

  fetchUser (accessToken) {

    return client.passport.verifyJWT(accessToken)
      .then(payload => {
        return client.service('users').get(payload.userId)
      })
      .then(user => {
        return Promise.resolve(user)
      })
  },

  authenticate () {
    debug('auth')

    return client.authenticate()
      .then((response) => {
        debug('auth successful')

        return this.fetchUser(response.accessToken)
      })
      .then(user => {
        debug('got user')

        this.user = user

        return Promise.resolve(user)
      })
      .catch((err) => {
        debug('auth failed', err)

        this.user = null

        return Promise.reject(err)
      })
  },

  authenticated () {
    return this.user != null
  },

  signout () {
    debug('signout')

    return client.logout()
      .then(() => {
        debug('signout successful')

        this.user = null
      })
      .catch((err) => {
        debug('signout failed', err)

        return Promise.reject(err)
      })
  },

  onLogout (callback) {

    client.on('logout', () => {
      debug('onLogout')

      this.user = null

      callback()
    })
  },

  onAuthenticated (callback) {

    client.on('authenticated', response => {
      debug('onAuthenticate', response)

      this.fetchUser(response.accessToken)
      .then(user => {
        debug('onAuthenticate got user')

        this.user = user

        callback(this.user)
      })
      .catch((err) => {
        debug('onAuthenticate get user failed', err)

        callback(this.user)
      })
    })
  },

  register (email, password) {
    return client.service('users').create({
      email: email,
      password: password
    })
  },

  login (email, password) {
    return client.authenticate({
      strategy: 'local',
      email: email,
      password: password
    })
  }

}

export default auth

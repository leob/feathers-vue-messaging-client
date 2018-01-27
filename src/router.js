import Vue from 'vue'
import VueRouter from 'vue-router'
import auth from 'src/api/auth'
import { debug as log } from 'src/logger'

const debug = log('router')

Vue.use(VueRouter)

function load (component) {
  // '@' is aliased to src/components
  return () => import(`@/${component}.vue`)
  // https://github.com/vuejs/vue-loader/releases/tag/v13.0.0
  //return () => import(`@/${component}.vue`).then(m => m.default)
}

const routes = [
  {
    path: '/',
    component: load('Index'),
    children: [
      {
        path: '/home',
        name: 'home',
        component: load('Landing')
      },
      {
        path: '/signin',
        name: 'signin',
        component: load('SignIn')
      },
      {
        path: '/register',
        name: 'register',
        component: load('SignIn')
      },
      {
        path: '/main',
        name: 'main',
        component: load('user/inbox/UserInbox'),
        meta: { requiresAuth: true, page: 'Inbox' }
      },
      {
        path: '/sent',
        name: 'sent',
        component: load('user/sent/UserSent'),
        meta: { requiresAuth: true, page: 'Sent' }
      },
      {
        path: '/profile',
        name: 'profile',
        component: load('user/profile/UserProfile'),
        meta: { requiresAuth: true }
      },
      {
        path: '/help',
        name: 'help',
        component: load('Help'),
        meta: { requiresAuth: true }
      }
    ]
  },
  {
    path: '*',
    component: load('Error404')
  } // Not found
]

const router = new VueRouter({
  /*
   * NOTE! VueRouter "history" mode DOESN'T works for Cordova builds,
   * it is only to be used only for websites.
   *
   * If you decide to go with "history" mode, please also open /config/index.js
   * and set "build.publicPath" to something other than an empty string.
   * Example: '/' instead of current ''
   *
   * If switching back to default "hash" mode, don't forget to set the
   * build publicPath back to '' so Cordova builds work again.
   */
  mode: 'hash',                                     // https://router.vuejs.org/en/essentials/history-mode.html
  scrollBehavior: (to, from, savedPosition) => {    // https://router.vuejs.org/en/advanced/scroll-behavior.html
    return { y: 0 }
  },
  routes
})

router.beforeEach((to, from, next) => {

  if (to.meta.requiresAuth) {

    if (auth.authenticated()) {
      debug('auth YES')

      next()
    } else {
      debug('auth NO')

      next(false)
    }
  } else {
    next()
  }
})


export default router

<template>
  <q-layout ref="layout">
    <q-toolbar slot="header" class="justify-between" color="blue">

      <div class="row">
        <q-btn flat @click="$refs.layout.toggleLeft()" v-show="authenticated" class="u-menubutton">
          <q-icon name="menu"/>
          <q-tooltip anchor="bottom middle" self="top middle" :offset="[0, 20]">Menu</q-tooltip>
        </q-btn>

        <q-toolbar-title class="u-toolbar" @click="goTo('main')">
          FEATHERS
          <span slot="subtitle">
            messaging
          </span>
        </q-toolbar-title>
      </div>

      <div v-if="!authenticated">
        <q-btn flat @click="goTo('signin')" v-show="!authenticated">
          Sign In
        </q-btn>
        <q-btn flat @click="goTo('register')" v-show="!authenticated">
          Register
        </q-btn>
      </div>

      <div v-if="authenticated">
        <q-btn flat small round @click="openSendDialog = true">
          <q-icon name="send"/>
          <q-tooltip anchor="bottom middle" self="top middle" :offset="[0, 20]">Compose</q-tooltip>
        </q-btn>
      </div>

    </q-toolbar>

    <div slot="left" ref="menu" v-if="authenticated" class="u-side-menu">
      <q-side-link item to="/main">
        <q-item-side icon="move_to_inbox"/>
        <q-item-main label="Inbox"/>
      </q-side-link>
      <q-side-link item to="/sent">
        <q-item-side icon="backup"/>
        <q-item-main label="Sent"/>
      </q-side-link>
      <q-item-separator/>
      <q-side-link item to="/profile">
        <q-item-side icon="person"/>
        <q-item-main label="My Page"/>
      </q-side-link>
      <q-side-link item to="/help">
        <q-item-side icon="help"/>
        <q-item-main label="Help"/>
      </q-side-link>
      <q-collapsible icon="info" label="About">
        <p style="padding: 25px;" class="text-grey-7">
          Messaging done right.
        </p>
      </q-collapsible>
      <q-item class="q-item-link" @click="signout">
        <q-item-side icon="exit_to_app"/>
        <q-item-main label="Signout"/>
      </q-item>

    </div>

    <!-- sub-routes -->
    <router-view :user="user"></router-view>

    <div slot="footer" style="text-align: center">
      <q-tabs align="center" color="blue-8">
        <template  v-if="authenticated">
          <q-route-tab exact slot="title" label="Inbox" icon="move_to_inbox" to="/main" count="5" />
          <q-route-tab exact slot="title" label="Sent" icon="backup" to="/sent"/>

          <!-- sub-routes -->
          <!--<router-view name="UserTabs" :user="user"></router-view>-->
        </template>
      </q-tabs>
    </div>

    <q-modal :no-esc-dismiss="true" v-model="openSendDialog" class="u-overlay">
    <!--<q-modal :no-esc-dismiss="true" v-model="openSendDialog">-->
      <UserSend :closeDialog="closeSendDialog" />
    </q-modal>

  </q-layout>
</template>

<script>
  import {
    QLayout,
    QToolbar,
    QToolbarTitle,
    QTooltip,
    QTabs,
    QTab,
    QRouteTab,
    QBtn,
    QIcon,
    QSearch,
    QSideLink,
    QChip,
    QCollapsible,
    QItem,
    QItemSide,
    QItemMain,
    QItemSeparator,
    QModal,
    Toast,
    Loading
  } from 'quasar'

  import UserSend from '@/user/send/UserSend'

  import auth from 'src/api/auth'
  import { debug as log } from 'src/logger'

  const debug = log('Index')

  export default {
    name: 'index',
    components: {
      QLayout,
      QToolbar,
      QToolbarTitle,
      QTooltip,
      QTabs,
      QTab,
      QRouteTab,
      QBtn,
      QIcon,
      QSearch,
      QSideLink,
      QChip,
      QCollapsible,
      QItem,
      QItemSide,
      QItemMain,
      QItemSeparator,
      QModal,
      Toast,
      UserSend
    },
    data () {
      return {
        user: null,
        page: null,
        openSendDialog: false
      }
    },
    computed: {
      authenticated () {
        return this.$data.user !== null
      }
    },
//    watch: {
//      '$route' (to, from) {
//        this.$data.page = to.meta && to.meta.page ? '- ' + to.meta.page + ' -' : ''
//      }
//    },
    beforeRouteUpdate (to, from, next) {
      this.$data.page = to.meta && to.meta.page ? '- ' + to.meta.page + ' -' : ''

      next()
    },
    methods: {
      closeSendDialog () {
        this.$data.openSendDialog = false
      },
      goTo (route) {
        this.$router.push({ name: route })
      },
      signout () {
        auth.signout()
        .then(() => {
          debug('signout okay')

          Toast.create.positive('You are now logged out, sign in again to continue to work')
        })
        .catch(_ => {
          debug('signout error')

          Toast.create.negative('Cannot logout, please check again in a few minutes')
        })
      },
      setUser (user) {
        this.$data.user = user
      }
    },
    mounted () {
      debug('mounted')

      // Check if there is already a session running
      Loading.show()

      auth.authenticate()
      .then((user) => {
        Loading.hide()

        debug('auth okay', user)

//        Toast.create.positive('Restoring previous session')
        this.setUser(user)
        this.$router.replace({ name: 'main' })
      })
      .catch(_ => {
        Loading.hide()

        debug('auth failed')

        this.setUser(null)
        this.$router.replace({ name: 'home' })
      })

      // On successful login
      auth.onAuthenticated((user) => {
        debug('onAuth')

        this.setUser(user)
        this.$router.replace({ name: 'main' })
      })
      // On logout
      auth.onLogout(() => {
        debug('onLogout')

        this.setUser(null)
        this.$router.replace({ name: 'home' })
    })
    },
    beforeDestroy () {
    }
  }
</script>

<!--<style scoped>-->
<style lang="styl">
  .u-side-menu
      background: rgba(189,189,189,0.15)
      padding-top: 8px

  .q-toolbar-title
    flex none
    /*flex 1*/

  .u-toolbar
    cursor: pointer

  .u-menubutton
    padding-left: 6px
    padding-right: 6px

  .q-chip
    font-size: 11px
</style>

<template>
  <div class="row col-md-12 col-lg-10 u-layout-padding justify-center">
    <message-list :messages="messages.data" :loading="loading" />
  </div>
</template>

<script>
  import MessageList from '@/user/MessageList'

  import { Loading } from 'quasar'
  import { mapGetters, mapActions } from 'vuex'
  import { debug as log } from 'src/logger'

  const debug = log('UserInbox')

  export default {
    components: {
      MessageList
    },
    props: ['user'],
    data () {
      return {
        loading: true
      }
    },
    computed: {
      ...mapGetters('messages', {
        findMessagesInStore: 'find'
      }),
    messages () {
      const query = this.messageQuery(this.user)

      // Get messages from the Vuex store, which are updated reactively in real-time
      return this.findMessagesInStore({
        query
      })
    }
  },
  methods: {
    messageQuery (user) {
      return {
        to: user._id,
        $sort: {createdAt: 1}
      }
    },
  ...mapActions('messages', {
      findMessages: 'find'
    }),
  },
  mounted () {
  },
  created () {
    this.loading = true
    Loading.show()

    const query = Object.assign({$limit: 25}, this.messageQuery(this.user))

    // "Prime" the Vuex store: query messages from Feathers
    this.findMessages({
        query
      })
      .then((msgs) => {
      this.loading = false
    Loading.hide()
  })
  },
  beforeDestroy () {
  }
  }
</script>

<!--<style scoped>-->
<style lang="styl">
  /*@import '~variables'*/

  /*.u-layout-padding {*/
  /*padding: 40px;*/
  /*}*/
</style>

<template>
  <div class="scroll u-messages">
      <q-list highlight inset-separator
              style="width: 90%; margin-top: 10px;">


        <q-item multiline
                v-if="loading">
          <q-item-main>
            <q-item-tile label>Loading ..</q-item-tile>
          </q-item-main>
        </q-item>

        <q-item multiline
                v-else-if="messages.length == 0">

          <q-item-main>
            <q-item-tile label>No messages found</q-item-tile>
          </q-item-main>
        </q-item>

        <q-item multiline
                v-else
                v-for="message in messages" key="message._id" :message="message">

          <q-item-side>
            <q-item-tile avatar>
              <img :src="getAvatar(message)"/>
            </q-item-tile>
          </q-item-side>
          <q-item-main>
            <q-item-tile label>{{message.subject}}</q-item-tile>
            <q-item-tile sublabel lines="2">
              {{message.text}}
            </q-item-tile>
          </q-item-main>
          <q-item-side right>
            <q-item-tile stamp>{{message.createdAt | formatDateUnixTimestamp}}</q-item-tile>
            <q-item-tile icon="mail" color="blue"/>
          </q-item-side>
        </q-item>

      </q-list>
  </div>
</template>

<script>
  import {
    QList,
    QItem,
    QItemSide,
    QItemMain,
    QItemTile,
    QInnerLoading,
    QSpinnerGears
  } from 'quasar'

  // SILLY HACK
  import leo from 'src/assets/avatars/leo.jpeg'

  export default {
    components: {
      QList,
      QItem,
      QItemSide,
      QItemMain,
      QItemTile,
      QInnerLoading,
      QSpinnerGears
    },
    name: 'message-list',
    props: ['messages', 'loading'],
    data () {
      return {
      }
    },
    computed: {
    },
    methods: {
      // SILLY HACK
      getAvatar(message) {
        if (message.userFrom.email.toLowerCase().startsWith('leo')) {
          return leo
        }

        return null
      }
    },
    mounted () {
    },
    created () {
    },
    beforeDestroy () {
    }
  }
</script>

<style lang="styl">
  .u-messages {
    height: 450px;
    width: 100%;
  }

  @media (max-height: 500px) {
    .u-messages {
      height: 200px;
    }
  }

</style>

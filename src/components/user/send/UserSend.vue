<template>
  <div class="row u-layout-padding u-overlay-content">
    <div class="col-md-12 col-lg-10">

      <div class="row">
        <div class="col-auto">
          <div class="u-avatar-placeholder u-avatar-placeholder-large">
              Place holder
          </div>
        </div>

        <div class="col">
          <div class="row">

            <div class="col-xs-12" style="margin-left: 5px;">
              <q-search v-model="form.to" placeholder="To - start typing a name">
                <q-autocomplete
                  :debounce="500"
                  :min-characters="1"
                  :max-results="10"
                  @search="searchUser"
                  @selected="selectedUser"
                />
              </q-search>
            </div>

          </div>

        </div>
      </div>

      <div class="u-spacer u-spacer-half">
        <hr/>
      </div>

      <div class="u-overlay-bottom">
        <div class="row" style="height: 30px;">
          <div class="col u-small">
            <q-input v-model="form.subject"
                     placeholder="Subject"
                     style="margin: 0; padding: 0; font-size: 15px;"
                     @blur="$v.form.subject.$touch"
                     :error="$v.form.subject.$error"
            />
            <!--@keyup.enter="submit"-->
          </div>
        </div>

        <div class="u-spacer-half">
        </div>

        <div class="row" ref="messageArea">
          <div class="col u-small">
            <q-input v-model="form.message" type="textarea" placeholder="Message"
                     class="message-input"
                     style="font-size: 15px;"
                     :min-rows="2"
                     @blur="$v.form.message.$touch"
                     :error="$v.form.message.$error"
            />
            <!--@keyup.enter="submit"-->
            <!--:max-height="35"/>-->
          </div>
        </div>

        <div class="row u-overlay-buttons">
          <div class="row u-overlay-buttons-inner">
            <q-btn outline
                   :disabled="disableSend"
                   @click="send"
                   class="u-action-button u-action-button-done">
              Send
            </q-btn>

            <q-btn outline
                   @click="cancel"
                   class="u-action-button">
              Cancel
            </q-btn>
          </div>
        </div>

      </div>

    </div>
  </div>
</template>

<script>
  import {
    QCard,
    QCardTitle,
    QCardMain,
    QCardSeparator,
    QCardActions,
    QBtn,
    QIcon,
    QChip,
    QInput,
    QSearch,
    QAutocomplete,
    Toast
  } from 'quasar'

  import { required as req, minLength, maxLength } from 'vuelidate/lib/validators'
  import { mapActions } from 'vuex'
  import { debug as log } from 'src/logger'

  const debug = log('UserSend')

  export default {
    components: {
      QCard,
      QCardTitle,
      QCardMain,
      QCardSeparator,
      QCardActions,
      QBtn,
      QIcon,
      QChip,
      QInput,
      QSearch,
      QAutocomplete
    },
    props: {
      user: Object,
      closeDialog: Function
    },
    data () {
      return {
        form: {
          to: '',
          subject: '',
          message: ''
        }
      }
    },
    validations: {
      form: {
        subject: {
          req,
          minLength: minLength(2),
          maxLength: maxLength(200)
        },
        message: {
          req,
          minLength: minLength(2),
          maxLength: maxLength(10000)
        }
      }
    },
    computed: {
      disableSend: function () {
        return this.form.subject.trim() === '' ||
               this.form.message.trim() === '' ||
               this.form.to.trim() === ''
      }
    },
    methods: {
      ...mapActions('messages', {
        createMessage: 'create'
      }),
      ...mapActions('users', {
        findUsers: 'find'
      }),
      resetFields () {
        // https://stackoverflow.com/a/40856312/2474068
        Object.assign(this.$data, this.$options.data.apply(this))
      },
      send () {
        this.$v.form.$touch()

        if (this.$v.form.$error) {
          Toast.create("Please enter a subject, a message (longer than 2 characters) and a receiver ('to')")
          return
        }

        // find the receiver
        this.findUsers({
          query: {
            $limit: 1,
            email: this.form.to.trim().toLowerCase()
          }
        }).then(response => {

          if (response.data.length ==0) {
            Toast.create("The receiver ('to') was not found")

          } else {
            const user = response.data[0]

            this.createMessage({
              subject: this.form.subject,
              text: this.form.message,
              to: user._id
            }).then(() => {

              Toast.create('Message sent successfully')

              this.close()
            })
          }
        })
      },
      cancel () {
        this.close()
      },
      close () {
        // clear the form before closing the dialog, otherwise when reopening the dialog we will see the old values
        this.resetFields()

        this.closeDialog()
      },
      searchUser (word, done) {

        if (word.trim() === "") {
          done([])
          return
        }

        const from = word.trim().toLowerCase()
        const to = this.getToValue(from)

        this.findUsers({
          query: {
            $sort: {email: 1},
            $limit: 10,
            email: {
              $gte: from,
              $lt: to
            }
          }
        }).then(users => {

          const userNames = users.data.map(user => {
            return {
              label: user.email,
              value: user.email
            }
          })

          done(userNames)
        })
      },
      getToValue (fromValue) {
        const firstPart = fromValue.substring(0, fromValue.length-1)
        const lastPart = fromValue.substring(fromValue.length-1)

        return firstPart + String.fromCharCode(lastPart.charCodeAt(0) + 1)
      },
      selectedUser (user) {
        debug('Selected user: ', user)
      }
    },
    mounted () {
    },
    beforeDestroy () {
    }
  }
</script>

<!--<style scoped>-->
<style lang="styl">
  $message-height = 220px
  $message-height-xs = 100px

  .q-input-shadow, .q-input-area {
    height: $message-height !important;
    min-height: $message-height !important;
    max-height: $message-height !important;
  }

  @media (max-height: 500px) {
    .q-input-shadow, .q-input-area {
      height: $message-height-xs !important;
      min-height: $message-height-xs !important;
      max-height: $message-height-xs !important;
    }
  }
</style>

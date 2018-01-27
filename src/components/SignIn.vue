<template>
</template>

<script>
import { Toast, Dialog } from 'quasar'
import auth from 'src/api/auth'
import { Loading } from 'quasar'

export default {
  data () {
    return {
    }
  },
  computed: {
  },
  methods: {
    isRegistration () {
      return this.$route.name === 'register'
    },
    register (email, password) {
      return auth.register (email, password)
    },
    login (email, password) {
      return auth.login (email, password)
    }
  },
  mounted () {
    Dialog.create({
      title: this.isRegistration() ? 'Register' : 'Sign In',
      form: {
        email: {
          type: 'email',
          label: 'E-mail',
          model: ''
        },
        password: {
          type: 'password',
          label: 'Password',
          model: ''
        }
      },
      onDismiss: () => {
        this.$router.push({ name: 'home' })
      },
      buttons: [
        {
          label: 'Ok',
          handler: (data) => {
            if (this.isRegistration()) {
              Loading.show()

//    setTimeout(() => {
              this.register(data.email, data.password)
                .then(() => {
                  return this.login(data.email, data.password)
                })
                .then(_ => {
                  Loading.hide()

                  Toast.create.positive('You are now logged in')
                })
                .catch(_ => {
                  Loading.hide()

                  Toast.create.negative('Cannot register, please check your e-mail or password')
                  this.$router.push({ name: 'home' })
                })
//    }, 5000)
            } else {
              Loading.show()

//    setTimeout(() => {
              this.login(data.email, data.password)
                .then(_ => {
                  Loading.hide()

                  Toast.create.positive('You are now logged in')
                })
                .catch(_ => {
                  Loading.hide()

                  Toast.create.negative('Cannot sign in, please check your e-mail or password')
                  this.$router.push({ name: 'home' })
                })
//    }, 5000)
            }
          }
        }
      ]
    })
  },
  beforeDestroy () {
  }
}
</script>

<style lang="styl">

</style>

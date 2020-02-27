<template>
  <div class="q-pa-md" style="max-width: 400px">

    <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md"
    >
      <q-input
        filled
        v-model="email"
        label="Your email *"
        hint="your mail"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />

      <q-input
        filled
        type="password"
        v-model="password"
        label="Password*"
         lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"    
      />
      <q-input
        filled
        type="password"
        v-model="confirmPassword"
        label="confirm password*"
         lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"    
      />

      <q-toggle v-model="accept" label="I accept the license and terms" />

      <div>
        <q-btn  @click="register" label="SignIn" type="submit" color="primary"/>
      </div>
    </q-form>
  
  </div>
</template>


<script>
import firebase from 'firebase'

export default {
  name: 'register',
  data () {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      accept: false
    }
  },

  methods: {
     register() {
        firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(user => {
          console.log("login" + JSON.stringify(user))
          this.$q.localStorage.set('authenticated', true)
          this.$q.localStorage.set('user', user)
        }, (err) => {
          console.log("Erro -> " + JSON.stringify(err))
          this.$q.localStorage.set('authenticated', false)
          this.$q.localStorage.set('user', null)
        })
      },
    onSubmit () {
      if (this.accept !== true) {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'warning',
          message: 'You need to accept the license and terms first'
        })
      }
      else {
        this.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'Submitted'
        })
      }
    },

    onReset () {
      this.name = null
      this.age = null
      this.accept = false
    }
  },
  
}
</script>
<template>
<div
    :style="{
      'background-image':
        'url(https://cdn.discordapp.com/attachments/844870220757860372/971403959703052368/background.jpg)',
      'background-size': 'cover,contain',
    }"
  >
  <div class="container hero is-fullheight">
    <div class="columns is-centered">
      <div class="column is-5">
        <h1 class="title has-text-centered">Log in</h1>
        <p
          v-if="error"
          class="px-3 py-2 mb-3 has-text-danger-dark has-background-danger-light"
        >
          {{ error }}
        </p>

        <!-- Login form -->
        <div class="field">
          <label class="label">email</label>
          <div class="control has-icons-left">
            <input v-model="email" class="input" type="text" />
            <span class="icon is-small is-left">
              <i class="fas fa-user"></i>
            </span>
          </div>
        </div>

        <div class="field">
          <label class="label">Password</label>
          <div class="control has-icons-left has-icons-right">
            <input v-model="password" class="input" type="password" />
            <span class="icon is-small is-left">
              <i class="fas fa-lock"></i>
            </span>
            <span class="icon is-small is-right">
              <i class="fas fa-check"></i>
            </span>
          </div>
        </div>

        <div class="control">
                  <button class="button is-success" @click="submit()">
                    <router-link to="/" style="color: white">
                      Log In
                    </router-link>
                  </button>
                </div>
        <p class="my-3 has-text-weight-bold">
          Don't have an account yet? <router-link to="/user/signup">
                      Sign Up
                    </router-link>
        </p>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import axios from '@/plugins/axios'
export default {
  data () {
    return {
      email: '',
      password: '',
      error: '',
      profile: [],
    }
  },
  methods: {
    submit () {
      const data = {
        email: this.email,
        password: this.password
      }

      axios.post("http://localhost:9003/user/login", data)
        .then(res => {
          const email = res.data.email      
          const password = res.data.password                          
          localStorage.setItem('email', email)
          localStorage.setItem('password', password)
          this.$emit('auth-change')
          this.$router.push({path: '/'})
        })
        .catch(error => {
          this.error = error.response.data
          console.log(error.response.data)
        })
    }
  }
}
</script>
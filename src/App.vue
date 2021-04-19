<template>
  <v-app id="app">
    <MyNavBar :loggedIn="this.loggedIn" v-on:login="setLoggedIn" v-on:logout="setLoggedOut" />
    <v-container>
      <v-row>
          <router-view :loggedIn="this.loggedIn" v-on:login="setLoggedIn" v-on:logout="setLoggedOut" />
      </v-row>
  </v-container>
  </v-app>
</template>

<script>
import MyNavBar from './components/MyNavBar.vue'

export default {
  name: 'App',
  components: {
    MyNavBar
  },
  data() {
    return {
      loggedIn: false
    }
  },
  created() {
    if (localStorage.getItem('token')) {
      this.loggedIn = true;
      console.log("APP: ",this.loggedIn);
    }
    else {
      this.loggedIn = false;
    }
  },
  methods: {
    setLoggedIn() {
      this.loggedIn = true;
            // optionally, you could store the token in localStorage here
    },
    setLoggedOut() {
      this.loggedIn = false;
            // optionally, you could trigger the whole logout process here
    }
  }
}
</script>

<style>

</style>

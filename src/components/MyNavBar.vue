<template>
<div id='nav'>
  <b-navbar type="dark" variant="dark">
    <b-navbar-nav>
      <b-nav-item to="/">Home</b-nav-item>
      <b-nav-item :to="{ name: 'courses_index'}">Courses</b-nav-item>
      <b-nav-item to="/">Lecturers</b-nav-item>
      <b-nav-item to="/">Enrolements</b-nav-item>
      <b-nav-item :to="{ name: 'login' }">Login</b-nav-item>
      <b-nav-item :to="{ name: 'register' }">Sign up</b-nav-item>

    </b-navbar-nav>
  </b-navbar>

  <!-- <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> -->

  <!-- <router-link :to="{ name: 'testing', params: { id: 123 }}">Testing</router-link> -->
</div>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'MyNavBar',
  props: {
    loggedIn: Boolean //<-- this is new line
  },
  components: {

  },
  methods: {
    logout() {
      localStorage.removeItem('token'); // optionally, can now move this to App.vue's logout method
      this.$emit('logout'); //<-- tells App.vue to update loggedIn
      this.$router.push('/');
    }
  }
}
</script>

<style>
#nav {
  padding: 30px;
  text-align: center;
}

#nav a {
  font-weight: bold;
  color: #eee;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

<template>
  <div id="nav">
  <b-navbar toggleable="lg" type="dark">
    <b-navbar-brand href="#">Tairseach an Choláiste</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" v-if="loggedIn" is-nav>
      <b-navbar-nav>
        <b-nav-item to="/">Home</b-nav-item>
        <b-nav-item :to="{ name: 'courses_index'}">Courses</b-nav-item>
        <b-nav-item :to="{ name: 'lecturers_index' }">Lecturers</b-nav-item>
        <b-nav-item to="/enrolments">Enrolments</b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav v-if="loggedIn" class="ml-auto">
           <button class="logout" @click="logout()">Logout</button>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
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
  data() {
    return {    
    }
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
  padding: 5px;
  text-align: center;
  background-color: #36008c;
}

#nav a {
  font-weight: light;
  color: #eee;
}

#nav a.router-link-exact-active {
  color: #a6a0b0;
  font-weight: bold;
  border-bottom: 1px solid #140033;
}

.logout {
  color: #eee;
}
</style>

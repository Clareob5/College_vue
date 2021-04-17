<template>
<div id='nav'>
  <b-navbar>
    <b-navbar-nav v-if="loggedIn">
      <b-nav-item to="/">Home</b-nav-item>
      <b-nav-item :to="{ name: 'courses_index'}">Courses</b-nav-item>
      <b-nav-item :to="{ name: 'lecturers_index' }">Lecturers</b-nav-item>
      <b-nav-item to="/enrolments">Enrolments</b-nav-item>
      <v-spacer></v-spacer>
      <button class="logout" @click="logout()">Logout</button>
     </b-navbar-nav>

    <!-- <b-navbar-nav v-else>
      <b-nav-item :to="{ name: 'login' }">Login</b-nav-item>
      <b-nav-item :to="{ name: 'register' }">Sign up</b-nav-item>
    </b-navbar-nav> -->
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
      menu: [{
          icon: 'home',
          title: 'Home',
          link: '/'
        },
        {
          icon: 'info',
          title: 'Courses',
          link: '/courses'
        },
        {
          icon: 'warning',
          title: 'Enrolements',
          link: '/enrolments'
        },
        {
          icon: 'warning',
          title: 'Lecturers',
          link: '/lecturers'
        },
        {
          icon: 'warning',
          title: 'Login',
          link: '/auth/login'
        },
        {
          icon: 'warning',
          title: 'Register',
          link: '/auth/register'
        }
      ]
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('token'); // optionally, can now move this to App.vue's logout method
      this.$emit('logout'); //<-- tells App.vue to update loggedIn
      this.$router.push('/login');
    }
  }
}
</script>

<style>
#nav {
  padding: 5px;
  text-align: center;
  background-color: purple;
}

#nav a {
  font-weight: bold;
  color: #eee;
}

#nav a.router-link-exact-active {
  color: #111111;
}

.logout {
  color: #eee;
}
</style>

<template>
  <div class="login">
    Login

    <br>

    <input type="email" v-model="form.email" />
    <input type="password" v-model="form.password" />
    <button @click="login()">Submit</button>

  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Login',
  components: {

  },
  props: {
  loggedIn: Boolean //<-- this is new line
},
  data(){
    return {
      form: {
        email: "",
        password: ""
      }
    }
  },
  methods:{
    login() {
     axios.post('http://college.api:8000/api/login', {
       email: this.form.email ,
       password: this.form.password
     })
     .then(function (response) {
       localStorage.setItem('token', response.data.token);
       //this.$emit('login'); // <-- this is the new line
       this.$router.push({
         name: 'home'
       });
     })
       .catch(function (error) {
       console.log(error);
     })
   }
 },
}
</script>

<style>
.login {
  text-align: center;
}
</style>

<template>
  <div class="home">
    Register

    <br>

    <input type="text" v-model="form.name" />
    <input type="email" v-model="form.email" />
    <input type="password" v-model="form.password" />
    <button @click="register()">Submit</button>

  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Register',
  components: {

  },
  data(){
    return {
      form: {
        name: "",
        email: "",
        password: ""
      }
    }
  },
  methods:{
    register() {
     axios.post('http://college.api:8000/api/register', {
       name: this.form.name,
       email: this.form.email ,
       password: this.form.password
     })
     .then(function (response) {
       console.log(response);
       localStorage.setItem('token', response.data.token);
     })
       .catch(function (error) {
       console.log(error);
     })
   }
 },
}
</script>

<style>
.home {
  text-align: center;
}
</style>

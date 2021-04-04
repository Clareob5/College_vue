<template>
  <div class="home">
    Homepage

    </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Home',
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
       this.$emit('login'); // <-- this is the new line
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

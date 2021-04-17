<template>
<div class="container">
  Register
  <b-form class="col-offset-2 col-md-10">
    <br>
    <div class="row">
      <b-form-group label="Name:" class="col-md-5">
        <b-form-input v-model="form.name" placeholder="Enter name" required></b-form-input>
      </b-form-group>
    </div>
    <div class="row">
      <b-form-group label="Email:" class="col-md-5">
        <b-form-input v-model="form.email" placeholder="Enter email" required></b-form-input>
      </b-form-group>
    </div>
    <div class="row">
      <b-form-group label="Password:" class="col-md-5">
        <b-form-input v-model="form.password" placeholder="Enter password" required></b-form-input>
      </b-form-group>
    </div>
    <button class="btn btn-outline-primary" @click="register()">Submit</button>
  </b-form>

</div>

</template>

<script>
import axios from 'axios'

export default {
  name: 'Register',
  components: {

  },
  data() {
    return {
      form: {
        name: "",
        email: "",
        password: ""
      }
    }
  },
  methods: {
    register() {
      let self = this;
      axios.post('http://college.api:8000/api/register', {
          name: this.form.name,
          email: this.form.email,
          password: this.form.password
        })
        .then(function(response) {
          console.log(response);
          localStorage.setItem('token', response.data.token);
          self.$emit('login'); // <-- this is the new line
          self.$router.replace({
            name: 'home'
          });
        })
        .catch(function(error) {
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

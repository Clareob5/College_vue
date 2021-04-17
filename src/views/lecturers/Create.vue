<template>
<div class="container">
  <b-form class="col-md-10">
    <div class="row">
      <b-form-group label="Name:" class="col-md-5">
        <b-form-input v-model="form.name" placeholder="Enter name" required></b-form-input>
        <p class="error" v-if="errors.name">{{ errors.name[0] }}</p>
      </b-form-group>
      <b-form-group label="Address:" class="col-md-5">
        <b-form-textarea v-model="form.address" placeholder="Enter address" required></b-form-textarea>
        <p class="error" v-if="errors.address">{{ errors.address[0] }}</p>
      </b-form-group>
    </div>
    <div class="row">
      <b-form-group label="Email:" class="col-md-5">
        <b-form-input v-model="form.email" placeholder="Enter email" required></b-form-input>
        <p class="error" v-if="errors.email">{{ errors.email[0] }}</p>
      </b-form-group>
      <b-form-group label="Phone Number:" class="col-md-5">
        <b-form-input v-model="form.phone" placeholder="Enter Phone" required></b-form-input>
        <p class="error" v-if="errors.phone">{{ errors.phone[0] }}</p>
      </b-form-group>
    </div>
    <a class="btn btn-success" @click="createLecturer()">Submit</a>
  </b-form>

</div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'LecturerCreate',
  props: {
    loggedIn: Boolean //<-- this is new line
  },
  components: {

  },
  data() {
    return {
      form: {
        name: "",
        address: "",
        email: "",
        phone: "",
      },
      errors: {}
    }
  },
  mounted() {

  },
  methods: {
    createLecturer() {
      let token = localStorage.getItem('token');


      axios.post(`http://college.api:8000/api/lecturers`, {
          name: this.form.name,
          address: this.form.address,
          email: this.form.email,
          phone: this.form.phone
        }, {
          headers: {
            Authorization: "Bearer " + token
          }
        })
        .then(response => {
          console.log('YAY');
          console.log(response.data);
          this.$router.push({
            name: 'lecturers_index'
          });
        })
        .catch(error => {
          console.log(error)
          console.log(error.response.data)
          if (error.response.data.errors) {
            this.errors = error.response.data.errors
          }
        })
    }
  },
}
</script>
<style>
.home {
  text-align: center;
}

.error {
  color: red;
  font-size: 8px;
}
</style>

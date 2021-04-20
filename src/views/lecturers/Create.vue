<template>
  <v-container align-center cols="12" md="8" class="margin-top">
  <v-card cols="10" md="10">
      <v-card-title class="blue lighten-5 mb-2"><h2 class="font-weight-light">Create a Lecturer</h2></v-card-title>
<v-form>
  <v-container>

    <v-row>
      <v-col cols="12" md="6">
        <v-text-field v-model="form.name" :counter="30" label="Name" :error-messages="errors.name" required></v-text-field>

      </v-col>

      <v-col cols="12" md="6">
        <v-text-field v-model="form.address" :counter="200" label="Address" :error-messages="errors.address" required></v-text-field>

      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6">
        <v-text-field v-model="form.email" :counter="30" label="Email" :error-messages="errors.email" required></v-text-field>
      </v-col>

      <v-col cols="12" md="6">
        <v-text-field v-model="form.phone" label="Phone Number" :error-messages="errors.phone" required></v-text-field>
      </v-col>
    </v-row>
    <v-btn color="purple darken-3" class="white--text margin-r"><a @click="createLecturer()">Submit</a></v-btn>
    <v-btn outlined color="grey darken-2" :to="{ name: 'lecturers_index' }"><a >Back</a></v-btn>
  </v-container>
</v-form>
</v-card>
</v-container>
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


      axios.post(`https://college-api-cob.herokuapp.com/api/lecturers`, {
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

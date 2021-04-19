<template>
<div class="container">
  <v-col cols="12" sm="8" md="10">
    <v-card container>
      <v-card-title class="blue lighten-5 mb-2">
        <h2 class="font-weight-light">Enrolment Information</h2>
      </v-card-title>
      <v-card-text cols="12" sm="6" md="6">
        <h5 class="font-weight-regular text--primary">Date of Enrolment: </h5>
        <p>{{ enrolment.date }}</p>
        <h5 class="font-weight-regular text--primary">Time of Enrolment: </h5>
        <p>{{ enrolment.time }}</p>
        <h5 class="font-weight-regular text--primary">Status of Enrolment: </h5>
        <p>{{ enrolment.status }}</p>
        <h5 class="font-weight-regular text--primary">Course: </h5>
        <p>{{ enrolment.course.title }}</p>
        <h5 class="font-weight-regular text--primary">Lecturer: </h5>
        <p>{{ enrolment.lecturer.name }}</p>
      </v-card-text>


      <v-btn icon plain color="orange darken-3" :to="{ name: 'enrolments_edit', params: { id: enrolment.id }}"><span class="material-icons" color="orange">
          edit
        </span></v-btn>
      <v-btn icon plain color="red darken-2" @click="deleteEnrolment(enrolment)"><span class="material-icons">
          delete
        </span></v-btn>
      <v-btn plain>
        <router-link :to="{ name: 'enrolments_index' }">
          Back
        </router-link>
      </v-btn>
    </v-card>
  </v-col>
</div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'EnrolmentShow',
  props: {
  loggedIn: Boolean //<-- this is new line
},
  components: {

  },
  data() {
    return {
      enrolment: {},
      course: {},
      lecturer: {}
    }
  },
  mounted() {
    let token = localStorage.getItem('token');

    axios.get(`https://college-api-cob.herokuapp.com/api/enrolments/${this.$route.params.id}`, {
      headers: { Authorization: "Bearer " + token}
    })
    .then(response => {
      console.log(response.data.data);
      this.enrolment = response.data.data;
      this.getCourse(response.data.data);
      this.getLecturer(response.data.data);

    })
    .catch(error => {
      console.log(error)
      console.log(error.response.data)
    })



  },
  methods: {
    getCourse(enrole) {
      let token = localStorage.getItem('token');
      console.log(enrole.course_id);

      axios.get(`https://college-api-cob.herokuapp.com/api/courses/${this.enrolment.course_id}`, {
          headers: {
            Authorization: "Bearer " + token
          }
        })
        .then(response => {
          console.log(response.data.data);
          this.course = response.data.data;
        })
        .catch(error => {
          console.log(error)
          console.log(error.response.data)
        })
    },
    getLecturer(enrole) {
      let token = localStorage.getItem('token');
      console.log(enrole.lecturer_id);
      axios.get(`https://college-api-cob.herokuapp.com/api/lecturers/${this.enrolment.lecturer_id}`, {
          headers: {
            Authorization: "Bearer " + token
          }
        })
        .then(response => {
          console.log(response.data.data);
          this.lecturer = response.data.data;
        })
        .catch(error => {
          console.log(error)
          console.log(error.response.data)
        })
    }
  }
}
</script>

<style>
.home {
  text-align: center;
}
</style>

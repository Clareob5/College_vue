<template>
<div class="container">

  <h4>Date: </h4> {{ enrolment.date }} <br>
  <h4>Time: </h4> {{ enrolment.time }}<br>
  <h4>Status: </h4> {{ enrolment.status }}<br>
  <h4>Course: </h4> {{ course.title }}<br>
  <h4>Lecturer: </h4> {{ lecturer.name }}<br>


  <router-link :to="{ name: 'enrolments_edit', params: { id: enrolment.id }}">Edit</router-link>
  <b-button>Back</b-button>
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

    axios.get(`http://college.api:8000/api/enrolments/${this.$route.params.id}`, {
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

      axios.get(`http://college.api:8000/api/courses/${this.enrolment.course_id}`, {
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
      axios.get(`http://college.api:8000/api/lecturers/${this.enrolment.lecturer_id}`, {
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

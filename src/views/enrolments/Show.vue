<template>
<div class="container">
  <v-col cols="12" sm="8" md="10">
    <v-card container>
      <!-- View enrolment information -->
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
        <p>{{ course.title }}</p>
        <h5 class="font-weight-regular text--primary">Lecturer: </h5>
        <p>{{ lecturer.name }}</p>
      </v-card-text>
      <!-- Button icons for the selected enrolment -->
      <v-btn icon plain color="orange darken-3" :to="{ name: 'enrolments_edit', params: { id: enrolment.id }}"><span class="material-icons" color="orange">
          edit
        </span></v-btn>
        <!-- Delete enrolment dialog -->
      <v-dialog v-model="deleteEnrolDialog" persistent max-width="310" :retain-focus="false">
        <template v-slot:activator="{ on, attrs }">
          <!-- Button to open dialog -->
          <v-btn icon plain v-bind="attrs" v-on="on" color="red darken-2" @click="deleteEnrolDialog"><span class="material-icons">delete</span>
          </v-btn>
        </template>
        <!-- Text within dialog -->
        <v-card>
          <v-card-title class="headline">
            Are you sure you wish to delete this Enrolment?
          </v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <!-- button for cancelling and confirming the delete -->
            <v-btn color="red darken-1" text @click="deleteEnrolDialog = false">
              cancel
            </v-btn>
            <v-btn color="red darken-1" text @click="deleteEnrolment(enrolment, enrolment.id)">
              confirm
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- end of dialog -->
      <!-- back button to redirect to enrolments index -->
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
      lecturer: {},
      deleteEnrolDialog: false
    }
  },
  mounted() {
    let token = localStorage.getItem('token');

    axios.get(`https://college-api-cob.herokuapp.com/api/enrolments/${this.$route.params.id}`, {
        headers: {
          Authorization: "Bearer " + token
        }
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
    },
    deleteEnrolment(enrolments, id) {
      let token = localStorage.getItem('token');
      this.deleteEnrolDialog = false;

      axios.delete(`https://college-api-cob.herokuapp.com/api/enrolments/${id}`, {
          headers: {
            Authorization: "Bearer " + token
          }

        })
        .then((response) => {
          console.log(response);
          this.$router.replace({ name: 'enrolments_index' });
        })
        .catch(function(error) {
          console.log(error)
        })

    },
  }
}
</script>

<style>
.home {
  text-align: center;
}
</style>

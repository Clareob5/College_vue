<template>
<div>
    <v-col cols="12" sm="8" md="10">
  <v-card container>
    <v-card-title class="blue lighten-5 mb-2"><h2 class="font-weight-light">{{ course.title }}</h2></v-card-title>
    <v-card-text cols="6" sm="6" md="6">
      <h4 class="font-weight-regular text--primary">Code: </h4> <p>{{ course.code }}</p>
        <h4 class="font-weight-regular text--primary">Description: </h4> <p>{{ course.description }}</p>
      <h4 class="font-weight-regular text--primary">Points: </h4> <p>{{ course.points }}<p>
      <h4 class="font-weight-regular text--primary">Level: </h4> {{ course.level }}<br></v-card-text>

      <v-btn icon plain color="orange darken-3" :to="{ name: 'courses_edit', params: { id: course.id }}"><span class="material-icons" color="orange">
          edit
        </span></v-btn>
      <v-btn icon plain color="red darken-2" @click="deleteCourse(course, course.id)"><span class="material-icons">
    delete
    </span></v-btn>
      <v-btn plain>
        <router-link :to="{ name: 'courses_index' }">
            Back
          </router-link>
      </v-btn>
  </v-card>
</v-col>


  <v-col>
    <v-card>
      <v-card-title class="blue lighten-5"><h3 class="font-weight-light">Enrolments in: {{ course.title }}</h3></v-card-title>
      <v-data-table :headers="headers" :items="course.enrolments" :items-per-page="10" class="elevation-1">
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn icon plain color="orange darken-3" :to="{ name: 'enrolments_edit', params: { id: item.id }}"><span class="material-icons" color="orange">
              edit
            </span></v-btn>
          <v-btn icon plain color="red darken-2" @click="deleteEnrolment(item, item.id)"><span class="material-icons">
delete
</span></v-btn>
          <v-btn icon plain>
            <router-link :to="{ name: 'enrolments_show', params: { id: item.id }}"><span class="material-icons" color="blue">
                visibility
              </span></router-link>
          </v-btn>
        </template>

      </v-data-table>
    </v-card>
  </v-col>

</div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'CourseShow',
  props: {
    loggedIn: Boolean //<-- this is new line
  },
  components: {

  },
  data() {
    return {
      course: {},
      headers: [{
          text: 'date',
          value: 'date',
          sortable: true,
        },
        {
          text: 'time',
          value: 'time'
        },
        {
          sortable: true,
          text: 'status',
          value: 'status'
        },
        {
          label: 'Lecturer',
          text: 'Lecturer',
          value: 'lecturer.name',
          key: 'lecturer.name',
          sortable: true,
        },
        {
          text: 'actions',
          value: 'actions'
        },
      ],
    }
  },
  mounted() {
    let token = localStorage.getItem('token');

    axios.get(`https://college-api-cob.herokuapp.com/api/courses/${this.$route.params.id}`, {
        headers: {
          Authorization: "Bearer " + token
        }
      })
      .then(response => {
        console.log(response.data);
        this.course = response.data.data;

      })
      .catch(error => {
        console.log(error)
        console.log(error.response.data)
      })
  },
  methods: {
    deleteEnrolment(enrolments, id) {
      let token = localStorage.getItem('token');
      console.log(id);
      axios.delete(`https://college-api-cob.herokuapp.com/api/enrolments/${id}`, {
          headers: {
            Authorization: "Bearer " + token
          }

        })
        .then(function(response) {
          console.log(response);

        })
        .catch(function(error) {
          console.log(error)
        })

    },
  },
}
</script>

<style>
.home {
  text-align: center;
}
</style>

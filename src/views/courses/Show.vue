<template>
<div>
    <v-col cols="12" sm="8" md="10">
  <v-card container>
    <v-card-title><h3>{{ course.title }}</h3></v-card-title>
    <v-card-text>  <h4>Code: </h4> {{ course.code }}<br>
      <h4>Description: </h4> {{ course.description }}<br>
      <h4>Points: </h4> {{ course.points }}<br>
      <h4>Level: </h4> {{ course.level }}<br></v-card-text>

      <v-btn icon plain color="orange darken-3" :to="{ name: 'courses_edit', params: { id: course.id }}"><span class="material-icons" color="orange">
          edit
        </span></v-btn>
      <v-btn icon plain color="red darken-2" @click="deleteEnrolment(course, course.id)"><span class="material-icons">
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
      <v-card-title><h3>Enrolments in: {{ course.title }}</h3></v-card-title>
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

    axios.get(`http://college.api:8000/api/courses/${this.$route.params.id}`, {
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
      axios.delete(`http://college.api:8000/api/enrolments/${id}`, {
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

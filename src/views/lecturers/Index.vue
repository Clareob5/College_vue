<template>
  <v-col cols="12" sm="8" md="10">
    <div> <h2>List of Lectuers</h2> </div>
  <v-card>
    <v-card-title>
    <v-btn color="blue accent-2"
            dark
            class="mb-2" >

    <router-link class="routerlink" :to="{ name: 'lecturers_create' }">Add Lecturer</router-link>
  </v-btn>
    <v-spacer></v-spacer>
    <v-text-field
        cols="6"
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
<v-data-table
  :headers="headers"
  :items="lecturers"
  :search="search"
  :items-per-page="10"
  loading
  loading-text="Loading... Please wait"
  class="elevation-1"
>
<template v-slot:[`item.actions`]="{ item }">
  <v-btn icon plain color="orange darken-3" :to="{ name: 'lecturers_edit', params: { id: item.id }}"><span class="material-icons" color="orange">
      edit
    </span></v-btn>
  <v-btn icon plain color="red darken-2" @click="deleteLecturer(item)"><span class="material-icons">
delete
</span></v-btn>
  <v-btn icon plain>
    <router-link :to="{ name: 'lecturers_show', params: { id: item.id }}"><span class="material-icons" color="blue">
        visibility
      </span></router-link>
  </v-btn>
   </template>

        </v-data-table>
      </v-card>
    </v-col>
</template>

<script>
import axios from 'axios'

export default {
  name: 'LecturerIndex',
  components: {

  },
  data() {
    return {
      lecturers: [],
      headers: [{
          text: 'Name',
          value: 'name',
          key: 'name',
          sortable: true,
        },
        {
          text: 'Address',
          value: 'address',
          key: 'address',
          sortable: true
        },
        {
            text: 'Phone',
            value: 'phone',
            key: 'phone',
            sortable: true,
          },
          {
              text: 'Email',
              value: 'email',
              key: 'email',
              sortable: true,
            },
            {
              text: 'actions',
              value: 'actions'
            },

      ],

      enrolments: [],
        search: "",
      // filteredLecturers: [],
    }
  },
  watch: {
    term: function() {
    this.searchLecturer();
    }
  },
  mounted() {
    this.getLecturers();
    this.getEnrolments();
  },
  methods: {
      getLecturers() {
      let token = localStorage.getItem('token');

      //console.log(token);

      axios.get('http://college.api:8000/api/lecturers', {
          headers: {
            Authorization: "Bearer " + token
          }
        })
        .then(response => {
          console.log(response.data.data);
          this.lecturers = response.data.data;
          this.filteredLecturers = this.lecturers;
        })
        .catch(error => {
          console.log(error)
          console.log(error.response.data)
        })
    },
    getEnrolments() {
      let token = localStorage.getItem('token');

      //console.log(token);

      axios.get('http://college.api:8000/api/enrolments', {
          headers: {
            Authorization: "Bearer " + token
          }
        })
        .then(response => {
          console.log(response.data.data);
          this.enrolments = response.data.data;
        })
        .catch(error => {
          console.log(error)
          console.log(error.response.data)
        })
    },
    deleteLecturer(lecturer) {
      let token = localStorage.getItem('token');
      console.log(lecturer);

      let listOfDeleteRequests = lecturer.enrolments.map((current) => axios.delete('http://college.api:8000/api/enrolments/' + current.id, {
        headers: {
          Authorization: "Bearer " + token
        }
      }));
      // log the contents of listOfDeleteRequests
      axios.all(listOfDeleteRequests)
        .then(function(response) {
          console.log(response);
          axios.delete("http://college.api:8000/api/lecturers/" + lecturer.id, {
              headers: {
                Authorization: "Bearer " + token
              }
            })
            .then(function(response) {
              console.log(response.data);
              this.lecturer = response.data.data;
            })
            .catch(function(error) {
              console.log(error);
            });
        });
    },
    logout() {
      let token = localStorage.getItem('token');

      axios.get('http://college.api:8000/api/logout', {
          headers: {
            Authorization: "Bearer " + token
          }
        })
        .then(response => {
          console.log(response.data);
          console.log("LOGGED OUT");

        })
        .catch(error => {
          console.log(error)
          console.log(error.response.data)
        })
      localStorage.removeItem('token');


    }
  }
}
</script>

<style>
.home {
  text-align: center;
}
</style>

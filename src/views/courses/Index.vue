<template>
<v-col cols="12" sm="8" md="10">
  <div class="mb-8 mt-8" align-center>
    <h2 class="font-weight-light">List of Courses</h2>
    <hr>
  </div>
  <!-- top of table card -->
  <v-card>
    <v-card-title>
      <!-- Create course button -->
      <v-btn color="blue accent-4" dark class="mb-2">
        <router-link class="routerlink" :to="{ name: 'courses_create' }">Add Course</router-link>
      </v-btn>
      <!-- v-spacer is used to push items to the other end so the search bar isnt pushed up against the button -->
      <v-spacer></v-spacer>
      <v-text-field cols="6" v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
    </v-card-title>
    <!-- tabel for courses header and items are in the js data -->
    <v-data-table :headers="headers" :items="courses" :search="search" loading="loadTable" loading-text="Loading... Please wait" :items-per-page="10" class="elevation-1">
      <template v-slot:[`item.actions`]="{ item }">
        <!-- edit, delete and view icon buttons for each course -->
        <v-btn icon plain color="orange darken-3" :to="{ name: 'courses_edit', params: { id: item.id }}">
          <span class="material-icons" color="orange">
            edit</span>
          </v-btn>
        <v-dialog v-model="deleteDialog" persistent max-width="290" :retain-focus="false">
          <template v-slot:activator="{ on, attrs }">
            <!-- dialog component for confirming deleting the course -->
            <v-btn icon plain v-bind="attrs" v-on="on" color="red darken-2" @click="deleteDialog">
              <span class="material-icons">delete</span>
            </v-btn>
          </template>
          <v-card>
            <v-card-title class="headline">
              Are you sure you wish to delete this Course
            </v-card-title>
            <v-card-text>This Course has enrolments, these will be deleted if you delete the Course</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red darken-1" text @click="deleteDialog = false">
                cancel
              </v-btn>
              <v-btn color="red darken-1" text @click="deleteCourse(item)">
                confirm
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!-- end of dialog component -->
        <!-- show course button -->
        <v-btn icon plain>
          <router-link :to="{ name: 'courses_show', params: { id: item.id }}">
            <span class="material-icons" color="blue">visibility</span>
          </router-link>
        </v-btn>
      </template>
    </v-data-table>
  </v-card>
</v-col>
</template>


<script>
//import axios
import axios from 'axios'

export default {
  //name from router.js to load the correct page
  name: 'CourseIndex',
  components: {

  },
  data() {
    return {
      //courses array
      courses: [],
      //header for the heading fields of the data table
      headers: [{
          text: 'Title', //heading of column
          value: 'title', //data from db
          sortable: true, //this column cna be sorted
        },
        {
          text: 'Code',
          value: 'code'
        },
        {
          text: 'Points',
          value: 'points'
        },
        {
          text: 'Level',
          value: 'level'
        },
        {
          text: 'Actions',
          value: 'actions'
        },
      ],
      lecturers: [],
      //the search element within the data-table component allows for easy sorting without needed a filtering method
      search: "",
      loadTable: false, //loading table text boolean
      deleteDialog: false
    }
  },
  mounted() {
    //getting coures on load
    this.getCourses();
  },
  methods: {
    // method is obselete with vuetifys data table already has a search feature
    //   searchCourse() {
    //     this.filteredCourses = this.courses.filter(course => {
    //       if (course.title.toLowerCase().includes(this.term.toLowerCase())) {
    //       return true;
    //     }
    //     if (course.code.toLowerCase().includes(this.term.toLowerCase())) {
    //       return true;
    //     }
    //   });
    // },
    getCourses() {
      //setting token at the logged in token from the local storage
      let token = localStorage.getItem('token');
      //fetching data  from API
      axios.get('https://college-api-cob.herokuapp.com/api/courses', {
          headers: {
            Authorization: "Bearer " + token
          }
        })
        .then(response => {
          console.log(response.data.data);
          this.courses = response.data.data;
          this.loadTable = false; //stops the table from loading once the data loads
        })
        .catch(error => {
          console.log(error)
          console.log(error.response.data)
        })
    },
    //method to delete course, pass in the course object
    deleteCourse(course) {
      let token = localStorage.getItem('token');
      console.log(course);
      this.deleteDialog = false;
      let is = this; //setting a variable to avoid error
      let listOfDeleteRequests = course.enrolments.map((current) => axios.delete('https://college-api-cob.herokuapp.com/api/enrolments/' + current.id, {
        headers: {
          Authorization: "Bearer " + token
        }
      }));
      // log the contents of listOfDeleteRequests
      axios.all(listOfDeleteRequests)
        .then((response) => {
          console.log(response);
          axios.delete("https://college-api-cob.herokuapp.com/api/courses/" + course.id, {
              headers: {
                Authorization: "Bearer " + token
              }
            })
            .then((response) => {
              console.log(response);
              //console.log(id);
              is.getCourses();

              //is.$router.push({ name: 'courses_index' });
            })
            .catch(function(error) {
              console.log(error);
            });
        });
    },
  }
}
</script>

<style>
.home {
  text-align: center;
}

.routerlink {
  color: #FFF !important;
}
</style>

<template>
<v-col cols="12" sm="8" md="10">
  <div class="mb-8 mt-8" align-center>
    <h2 class="font-weight-light">List of Enrolments</h2>
    <hr>
  </div>
  <v-card>
    <v-card-title>
      <v-btn color="blue accent-4" dark class="mb-2">
        <router-link class="routerlink" :to="{ name: 'enrolments_create' }">Add Enrolment</router-link>
      </v-btn>
      <v-spacer></v-spacer>
      <!-- the search bar witha v-model to connect to the data table so it searchs the table -->
      <v-text-field cols="6" v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
    </v-card-title>
    <v-data-table :headers="headers" :items="enrolments" :search="search" :items-per-page="10" loading="loadTable" loading-text="Loading... Please wait" class="elevation-1">
      <template v-slot:[`item.actions`]="{ item }">
        <v-btn icon plain color="orange darken-3" :to="{ name: 'enrolments_edit', params: { id: item.id }}"><span class="material-icons" color="orange">
            edit
          </span></v-btn>
          <!-- dialog for enrolments delete -->
          <v-dialog v-model="deleteEnrolDialog" persistent max-width="310" :retain-focus="false">
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon plain v-bind="attrs" v-on="on" color="red darken-2" @click="deleteEnrolDialog"><span class="material-icons">delete</span>
              </v-btn>
            </template>
            <v-card>
              <v-card-title class="headline">
                Are you sure you wish to delete this Enrolment?
              </v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red darken-1" text @click="deleteEnrolDialog = false">
                  cancel
                </v-btn>
                <v-btn color="red darken-1" text @click="deleteEnrolment(item, item.id)">
                  confirm
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
           <!-- end of dialog -->
        <v-btn icon plain>
          <!-- link to view enrolment using material icons from an imported library -->
          <router-link :to="{ name: 'enrolments_show', params: { id: item.id }}"><span class="material-icons" color="blue">
              visibility
            </span></router-link>
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
  //component name
  name: 'EnrolmentIndex',
  components: {

  },
  data() {
    return {
      enrolments: [],
      headers: [{
          text: 'Date', //header text
          value: 'date', //value from the database
          key: 'date',
          sortable: true, //this column can be sorted
        },
        {
          label: 'Time',
          text: 'Time',
          value: 'time',
          key: 'time',
          sortable: true,
        },
        {
          label: 'Status',
          text: 'Status',
          value: 'status',
          key: 'status',
          sortable: true,
        },
        {
          label: 'Course',
          text: 'Course',
          value: 'course.title',
          key: 'course.title',
          sortable: true,
        },
        {
          label: 'Lecturer',
          text: 'Lecturer',
          value: 'lecturer.name',
          key: 'lecturer.name',
          sortable: true,
        },
        {
          label: 'Actions',
          text: 'Actions',
          value: 'actions',
          sortable: true,
        },

      ],
      perPage: 50,
      loadTable: false, //sets the table boolean to false
      currentPage: 1,
      rows: 100,
      lecturers: [],
      search: "",
      deleteEnrolDialog: false //sets the dialog to false on render
    }
  },
  //not needed asthe datatable has a search prop
  // watch: {
  //   term: function() {
  //     this.searchEnrolment();
  //   }
  // },
  mounted() {
    this.getEnrolments();
  },
  methods: {
    getEnrolments() {
      let token = localStorage.getItem('token');

      axios.get('https://college-api-cob.herokuapp.com/api/enrolments', {
          headers: {
            Authorization: "Bearer " + token
          }
        })
        .then(response => {
          console.log(response.data.data);
          this.enrolments = response.data.data;
          this.loadTable = false;
        })
        .catch(error => {
          console.log(error)
          console.log(error.response.data)
        })
    },

    deleteEnrolment(enrolments, id) {

      let token = localStorage.getItem('token');
      let is = this;
      //setting the dialog to false
      this.deleteEnrolDialog = false;
      axios.delete(`https://college-api-cob.herokuapp.com/api/enrolments/${id}`, {
          headers: {
            Authorization: "Bearer " + token
          }

        })
        .then((response) => {
          console.log(response);
          //console.log(id);
          is.getEnrolments();
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

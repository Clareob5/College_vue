<template>
  <v-layout>
  <v-col cols="12" sm="8" md="10">
    <div class="mb-8 mt-8" align-center> <h2 class="font-weight-light">List of Lecturers</h2> <hr></div>
  <v-card>
    <v-card-title>
    <v-btn color="blue accent-4"
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
  loading="loadTable"
  loading-text="Loading... Please wait"
  class="elevation-1"
>
<template v-slot:[`item.actions`]="{ item }">
  <v-btn icon plain color="orange darken-3" :to="{ name: 'lecturers_edit', params: { id: item.id }}"><span class="material-icons" color="orange">
      edit
    </span></v-btn>
   <v-dialog
     v-model="deleteDialog"
     persistent
     max-width="290"
     :retain-focus="false"
   >
     <template v-slot:activator="{ on, attrs }">
       <v-btn icon plain  v-bind="attrs"
        v-on="on" color="red darken-2" @click="deleteDialog"><span class="material-icons">delete</span>
       </v-btn>
     </template>
     <v-card>
       <v-card-title class="headline">
         Are you sure you wish to delete this Lecturer
       </v-card-title>
       <v-card-text>This Lecturer may have enrolments, these will be deleted if you delete the lecturer</v-card-text>
       <v-card-actions>
         <v-spacer></v-spacer>
         <v-btn
           color="red darken-1"
           text
           @click="deleteDialog = false"
         >
          cancel
         </v-btn>
         <v-btn
           color="red darken-1"
           text
           @click="deleteLecturer(item)"
         >
           confirm
         </v-btn>
       </v-card-actions>
     </v-card>
   </v-dialog>
  <v-btn icon plain>
    <router-link :to="{ name: 'lecturers_show', params: { id: item.id }}"><span class="material-icons" color="blue">
        visibility
      </span></router-link>
  </v-btn>
   </template>

        </v-data-table>
      </v-card>
    </v-col>

</v-layout>
</template>

<script>
import axios from 'axios'

export default {
  name: 'LecturerIndex',
  components: {

  },
  data() {
    return {
      loadTable: true,
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
      deleteDialog: false,
    }
  },
  // watch: {
  //   term: function() {
  //   this.searchLecturer();
  //   }
  //},
  mounted() {
    this.getLecturers();
    //this.getEnrolments();
  },
  methods: {
      getLecturers() {
      let token = localStorage.getItem('token');

      //console.log(token);

      axios.get('https://college-api-cob.herokuapp.com/api/lecturers', {
          headers: {
            Authorization: "Bearer " + token
          }
        })
        .then(response => {
          console.log(response.data.data);
          this.lecturers = response.data.data;
          this.loadTable= false;
        })
        .catch(error => {
          console.log(error)
          console.log(error.response.data)
        })
    },
    getEnrolments(lecturer) {
      let token = localStorage.getItem('token');

      //console.log(token);

      this.listOfEnrolments = lecturer.enrolments.map((current) => axios.get('https://college-api-cob.herokuapp.com/api/enrolments/' + current.id, {
          headers: {
            Authorization: "Bearer " + token
          }
        }));

         let numOfEnrolments = this.listOfEnrolments.length;
        console.log(numOfEnrolments);
        if (numOfEnrolments > 0){
          this.enrolements = true;
        }else{
          this.enrolements = false;
        }
    },
    deleteLecturer(lecturer) {
      let token = localStorage.getItem('token');
      console.log(this.deleteDialog);
      this.deleteDialog = false;

      let listOfDeleteRequests = lecturer.enrolments.map((current) => axios.delete('https://college-api-cob.herokuapp.com/api/enrolments/' + current.id, {
        headers: {
          Authorization: "Bearer " + token
        }
      }));
      // log the contents of listOfDeleteRequests
      axios.all(listOfDeleteRequests)
        .then(function(response) {
          console.log(response);
          axios.delete("https://college-api-cob.herokuapp.com/api/lecturers/" + lecturer.id, {
              headers: {
                Authorization: "Bearer " + token
              }
            })
            .then(function(response) {
              console.log(response);

            })
            .catch(function(error) {
              console.log(error);
            });
        });
    },
    logout() {
      let token = localStorage.getItem('token');

      axios.get('https://college-api-cob.herokuapp.com/api/logout', {
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

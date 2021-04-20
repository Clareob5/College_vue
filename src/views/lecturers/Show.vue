<template>
<div>
  <v-col cols="12" sm="8" md="10">
    <v-card container>
      <v-card-title class="blue lighten-5 mb-2">
        <h2 class="font-weight-light">{{ lecturer.name }}</h2>
      </v-card-title>
      <v-card-text cols="6" sm="6" md="6">
        <h4 class="font-weight-regular text--primary">Address: </h4>
        <p>{{ lecturer.address }}</p>
        <h4 class="font-weight-regular text--primary">Email: </h4>
        <p>{{ lecturer.email }}</p>
        <h4 class="font-weight-regular text--primary">Phone: </h4>
        <p>{{ lecturer.phone }}</p>
      </v-card-text>

      <v-btn icon plain color="orange darken-3" :to="{ name: 'lecturers_edit', params: { id: lecturer.id }}"><span class="material-icons" color="orange">
          edit
        </span></v-btn>
        <v-dialog
          v-model="deleteLecturerDialog"
          persistent
          max-width="310"
          :retain-focus="false"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon plain  v-bind="attrs"
             v-on="on" color="red darken-2" @click="deleteLecturerDialog"><span class="material-icons">delete</span>
            </v-btn>
          </template>
          <v-card>
            <v-card-title class="headline">
              Are you sure you wish to delete this Lecturer
            </v-card-title>
            <v-card-text>This Lecturer may have enrolments, these will be deleted if you delete the Lecturer</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="red darken-1"
                text
                @click="deleteLecturerDialog = false"
              >
               cancel
              </v-btn>
              <v-btn
                color="red darken-1"
                text
                @click="deleteLecturer(lecturer)"
              >
                confirm
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      <v-btn plain>
        <router-link :to="{ name: 'lecturers_index' }">
          Back
        </router-link>
      </v-btn>
    </v-card>
  </v-col>


  <v-col>
    <v-card>
      <v-card-title class="blue lighten-5">
        <h3 class="font-weight-light">Enrolments of: {{ lecturer.name }}</h3>
      </v-card-title>
      <v-data-table :headers="headers" :items="lecturer.enrolments" :items-per-page="10" class="elevation-1">
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn icon plain color="orange darken-3" :to="{ name: 'enrolments_edit', params: { id: item.id }}"><span class="material-icons" color="orange">
              edit
            </span></v-btn>
            <v-dialog
              v-model="deleteEnrolDialog"
              persistent
              max-width="310"
              :retain-focus="false"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon plain  v-bind="attrs"
                 v-on="on" color="red darken-2" @click="deleteEnrolDialog"><span class="material-icons">delete</span>
                </v-btn>
              </template>
              <v-card>
                <v-card-title class="headline">
                  Are you sure you wish to delete this Enrolment
                </v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="red darken-1"
                    text
                    @click="deleteEnrolDialog = false"
                  >
                   cancel
                  </v-btn>
                  <v-btn
                    color="red darken-1"
                    text
                    @click="deleteEnrolment(item, item.id)"
                  >
                    confirm
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
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
  name: 'LecturerShow',
  props: {
    loggedIn: Boolean //<-- this is new line
  },
  components: {

  },
  data() {
    return {
      lecturer: {},
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
          label: 'Course',
          text: 'Course',
          value: 'course.title',
          key: 'course.title',
          sortable: true,
        },
        {
          text: 'actions',
          value: 'actions'
        },
      ],
      deleteEnrolDialog: false,
      deleteLecturerDialog: false
    }
  },
  mounted() {
    let token = localStorage.getItem('token');

    axios.get(`https://college-api-cob.herokuapp.com/api/lecturers/${this.$route.params.id}`, {
        headers: {
          Authorization: "Bearer " + token
        }
      })
      .then(response => {
        console.log(response.data);
        this.lecturer = response.data.data;

      })
      .catch(error => {
        console.log(error)
        console.log(error.response.data)
      })
    this.getEnrolments();
  },
  methods: {
    deleteLecturer(lecturer) {
      let token = localStorage.getItem('token');
      this.deleteLecturerDialog = false;
      let is = this;
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
            .then((response) => {
              console.log(response);
              is.$router.replace({ name: 'lecturers_index' });
            })
            .catch(function(error) {
              console.log(error);
            });
        });
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
          this.getEnrolments();

        })
        .catch(function(error) {
          console.log(error)
        })

    },
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
  },
}
</script>

<style>
.home {
  text-align: center;
}
</style>

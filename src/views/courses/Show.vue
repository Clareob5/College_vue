<template>
<div>
  <v-col cols="12" sm="8" md="10">
    <!-- display course information in card -->
    <v-card container>
      <v-card-title class="blue lighten-5 mb-2">
        <h2 class="font-weight-light">{{ course.title }}</h2>
      </v-card-title>
      <v-card-text cols="6" sm="6" md="6">
        <h4 class="font-weight-regular text--primary">Code: </h4>
        <p>{{ course.code }}</p>
        <h4 class="font-weight-regular text--primary">Description: </h4>
        <p>{{ course.description }}</p>
        <h4 class="font-weight-regular text--primary">Points: </h4>
        <p>{{ course.points }}
        <p>
        <h4 class="font-weight-regular text--primary">Level: </h4> {{ course.level }}<br>
      </v-card-text>

      <v-btn icon plain color="orange darken-3" :to="{ name: 'courses_edit', params: { id: course.id }}"><span class="material-icons" color="orange">
          edit
        </span></v-btn>
      <!-- beginning of dialog -->
      <v-dialog v-model="deleteCourseDialog" persistent max-width="310" :retain-focus="false">
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon plain v-bind="attrs" v-on="on" color="red darken-2" @click="deleteCourseDialog"><span class="material-icons">delete</span>
          </v-btn>
        </template>
        <v-card>
          <v-card-title class="headline">
            Are you sure you wish to delete this Course
          </v-card-title>
          <v-card-text>This Course may have enrolments, these will be deleted if you delete the Enrolment</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red darken-1" text @click="deleteCourseDialog = false">
              cancel
            </v-btn>
            <v-btn color="red darken-1" text @click="deleteCourse(course, course.id)">
              confirm
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-btn plain>
        <router-link :to="{ name: 'courses_index' }">
          Back
        </router-link>
      </v-btn>
    </v-card>
  </v-col>

  <!-- tabel of enrolmetns connected to the course -->
  <v-col>
    <v-card>
      <v-card-title class="blue lighten-5">
        <h3 class="font-weight-light">Enrolments in: {{ course.title }}</h3>
      </v-card-title>
      <v-data-table :headers="headers" :items="course.enrolments" :items-per-page="10" class="elevation-1">
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
//inport the axios library
import axios from 'axios'

export default {
  //component name
  name: 'CourseShow',
  props: {
    loggedIn: Boolean
  },
  components: {

  },
  data() {
    return {
      course: {},
      headers: [{
          text: 'Date',
          value: 'date',
          sortable: true,
        },
        {
          text: 'Time',
          value: 'time'
        },
        {
          sortable: true, //column is sortable
          text: 'Status', //header of column text
          value: 'status' //will show status from db
        },
        {
          label: 'Lecturer',
          text: 'Lecturer',
          value: 'lecturer.name', //displays lecturer name in enrolments table
          key: 'lecturer.name',
          sortable: true,
        },
        {
          text: 'Actions',
          value: 'actions'
        },
      ],
      //setting courses and enrolmetns dialogs to false
      deleteCourseDialog: false,
      deleteEnrolDialog: false

    }
  },
  mounted() {
    //getting teh course on page load
    let token = localStorage.getItem('token');
    //using a get request to api to retrive course
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
        //logging the errors for help with debugging
        console.log(error)
        console.log(error.response.data)
      })
    this.getEnrolments(); //getting enrolments on page load
  },
  methods: {
    //method to delete all enrolements and then deleting course
    deleteCourse(course) {
      let token = localStorage.getItem('token');
      //setting the dialog to false
      this.deleteCourseDialog = false;
      // giving this a variable of is as there was an error with using the thid word when trying to refresh page
      let is = this;
      //mapping the courses enrolments to an array
      let listOfDeleteRequests = course.enrolments.map((current) => axios.delete('https://college-api-cob.herokuapp.com/api/enrolments/' + current.id, {
        headers: {
          Authorization: "Bearer " + token
        }
      }));
      // deleteing all the enrolments in the deleted requests array
      axios.all(listOfDeleteRequests)
        .then(function(response) {
          //delete course that had the enrolments
          console.log(response);
          axios.delete("https://college-api-cob.herokuapp.com/api/courses/" + course.id, {
              headers: {
                Authorization: "Bearer " + token
              }
            })
            .then((response) => {
              console.log(response);
              //redirect to courses index
              is.$router.replace({
                name: 'courses_index'
              });
            })
            .catch(function(error) {
              console.log(error);
            });
        });
    },
    //delete a single enrolment
    deleteEnrolment(enrolments, id) {
      let token = localStorage.getItem('token');
      this.deleteEnrolDialog = false;
      console.log(id);
      axios.delete(`https://college-api-cob.herokuapp.com/api/enrolments/${id}`, {
          headers: {
            Authorization: "Bearer " + token
          }

        })
        .then(function(response) {
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

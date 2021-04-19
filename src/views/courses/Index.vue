  <template>
    <v-col cols="12" sm="8" md="10">
      <div class="mb-8 mt-8" align-center> <h2 class="font-weight-light">List of Courses</h2> <hr></div>
    <v-card>
      <v-card-title>
      <v-btn color="blue accent-4"
              dark
              class="mb-2" >

      <router-link class="routerlink" :to="{ name: 'courses_create' }">Add Course</router-link>
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
    :items="courses"
    :search="search"
    loading="loadTable"
    loading-text="Loading... Please wait"
    :items-per-page="10"
    class="elevation-1"
  >
  <template v-slot:[`item.actions`]="{ item }">
    <v-btn icon plain color="orange darken-3" :to="{ name: 'courses_edit', params: { id: item.id }}"><span class="material-icons" color="orange">
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
            Are you sure you wish to delete this Course
          </v-card-title>
          <v-card-text>This Course may have enrolments, these will be deleted if you delete the Course</v-card-text>
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
              @click="deleteCourse(item)"
            >
              confirm
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    <v-btn icon plain>
      <router-link :to="{ name: 'courses_show', params: { id: item.id }}"><span class="material-icons" color="blue">
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
  name: 'CourseIndex',
  components: {

  },
  data() {
    return {

      courses: [],
      headers: [{
          text: 'title',
          value: 'title',
          sortable: true,
        },
        {
          text: 'code',
          value: 'code'
        },
        {
          text: 'points',
          value: 'points'
        },
        {
          text: 'level',
          value: 'level'
        },
        {
          text: 'actions',
          value: 'actions'
        },
      ],
      //page: 5,
      lecturers: [],
      search: "",
      loadTable: false,
      deleteDialog: false
    }
  },
  mounted() {
    this.getCourses();
    this.getLecturers();
  },
  methods: {
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
      let token = localStorage.getItem('token');

      axios.get('https://college-api-cob.herokuapp.com/api/courses', {
          headers: {
            Authorization: "Bearer " + token
          }
        })
        .then(response => {
          console.log(response.data.data);
          this.courses = response.data.data;
          this.loadTable = false;
        })
        .catch(error => {
          console.log(error)
          console.log(error.response.data)
        })
    },
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
        })
        .catch(error => {
          console.log(error)
          console.log(error.response.data)
        })
    },
    deleteCourse(course) {
      let token = localStorage.getItem('token');
      console.log(course);
      this.deleteDialog = false;
      //let is = this;
      let listOfDeleteRequests = course.enrolments.map((current) => axios.delete('https://college-api-cob.herokuapp.com/api/enrolments/' + current.id, {
        headers: {
          Authorization: "Bearer " + token
        }
      }));
      // log the contents of listOfDeleteRequests
      axios.all(listOfDeleteRequests)
        .then(function(response) {
          console.log(response);
          axios.delete("https://college-api-cob.herokuapp.com/api/courses/" + course.id, {
              headers: {
                Authorization: "Bearer " + token
              }
            })
            .then(function(response) {
              console.log(response.data);

              //is.$router.push({ name: 'courses_index' });
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

.routerlink {
  color: #FFF !important;
}
</style>

  <template>
    <v-col cols="12" sm="8" md="10">
      <div> <h2>List of Courses</h2> </div>
    <v-card>
      <v-card-title>
      <v-btn color="blue accent-2"
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
    loading
    loading-text="Loading... Please wait"
    :items-per-page="10"
    class="elevation-1"
  >
  <template v-slot:[`item.actions`]="{ item }">
    <v-btn icon plain color="orange darken-3" :to="{ name: 'courses_edit', params: { id: item.id }}"><span class="material-icons" color="orange">
        edit
      </span></v-btn>
    <v-btn icon plain color="red darken-2" @click="deleteCourse(item, item.id)"><span class="material-icons">
  delete
  </span></v-btn>
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
      // filteredCourses: [],
      // selectedCourse: "",
      // selectedLecturer: ""
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

      //console.log(token);

      axios.get('http://college.api:8000/api/courses', {
          headers: {
            Authorization: "Bearer " + token
          }
        })
        .then(response => {
          console.log(response.data.data);
          this.courses = response.data.data;
          this.filteredCourses = this.courses;
        })
        .catch(error => {
          console.log(error)
          console.log(error.response.data)
        })
    },
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
        })
        .catch(error => {
          console.log(error)
          console.log(error.response.data)
        })
    },
    deleteCourse(course) {
      let token = localStorage.getItem('token');
      console.log(course);

      let listOfDeleteRequests = course.enrolments.map((current) => axios.delete('http://college.api:8000/api/enrolments/' + current.id, {
        headers: {
          Authorization: "Bearer " + token
        }
      }));
      // log the contents of listOfDeleteRequests
      axios.all(listOfDeleteRequests)
        .then(function(response) {
          console.log(response);
          axios.delete("http://college.api:8000/api/courses/" + course.id, {
              headers: {
                Authorization: "Bearer " + token
              }
            })
            .then(function(response) {
              console.log(response.data);
              //this.course = response.data.data;
              this.$router.replace({
                   name: "courses_index"
               });
            })
            .catch(function(error) {
              console.log(error);
            });
        });
      //     const course = this.courses.indexOf(id);
      //      console.log(course);
      //      this.courses.splice(course, 1);
      //       //console.log(id);
      //
      //     axios.delete(`http://college.api:8000/api/courses/${id}`,{
      //         headers: {
      //           Authorization: "Bearer " + token
      //         }
      //
      //       })
      // .then(response => {
      //   console.log(response.data);
      //   this.$router.replace({
      //     name: "courses_index"
      //   })
      // })
      // .catch(function (error) {
      //   console.log(error)
      // })

      // console.log(id)
      // const course = this.courses.indexOf(id);
      // console.log(course);
      //
      // localStorage.removeItem(course);

      // axios.delete(`http://college.api:8000/api/courses/${id}`).then(()=>{
      //   //this.getData;
      // })
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

.routerlink {
  color: #FFF !important;
}
</style>

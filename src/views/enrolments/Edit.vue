<template>
  <v-container align-center cols="12" md="8" class="margin-top">
    <v-card cols="10" md="10">
      <v-card-title class="blue lighten-5 mb-2"><h2 class="font-weight-light">Edit Enrolment</h2>
      </v-card-title>
      <v-form>
        <v-container>
          <v-row>
              <!-- the date picker component from vuetify to choose a date from a calender -->
          <v-col cols="12" md="6">
          <v-menu v-model="menu1" :close-on-content-click="false" max-width="290">
            <template v-slot:activator="{ on, attrs }">
              <!-- value = to the computed data gotten by using moment.js -->
              <v-text-field v-model="form.date" :value="computedDateFormattedMomentjs" clearable label="Enter Date" readonly v-bind="attrs" v-on="on" :error-messages="errors.date"></v-text-field>
            </template>
              <!-- once the date is selected the calender(menu) is disabled -->
            <v-date-picker v-model="form.date" @change="menu1 = false"></v-date-picker>
          </v-menu>
        </v-col>
            <v-col cols="12" md="6">
                <!-- time picker component with clock menu -->
              <v-menu ref="menu" v-model="menu2" :close-on-content-click="false" :return-value.sync="time" transition="scale-transition" max-width="290px" min-width="290px">
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field v-model="form.time" label="Enter Time" prepend-icon="mdi-clock-time-four-outline" readonly v-bind="attrs" v-on="on" :error-messages="errors.time"></v-text-field>
                </template>
                <!-- saves the time -->
                <v-time-picker v-if="menu2" v-model="form.time" full-width @click:minute="$refs.menu.save(time)"></v-time-picker>
              </v-menu>
            </v-col>
            </v-row>
          <div class="row">
            <!-- Bootstrap vue radio buttons - within vuetify form -->
            <b-form-group label="Status" class="col-md-12">
              <b-form-radio-group
                v-model="form.status"
                :error-messages="errors.status"
              >
                <b-form-radio value="assigned">Assigned</b-form-radio>
                <b-form-radio value="associate">Associate</b-form-radio>
                <b-form-radio value="career_break">Career Break</b-form-radio>
                <b-form-radio value="interested">Interested</b-form-radio>
              </b-form-radio-group>
              <p v-if="errors.status" class="errors">{{ errors.status[0] }}</p>
            </b-form-group>
          </div>
          <!-- dropdowns to select lecturer and course respectively -->
          <v-row>
          <v-col class="d-flex" cols="12" sm="6">
            <v-select :items="lecturers" label="Select Lecturer" v-model="form.lecturer.id" item-value="id" item-text="name" :error-messages="errors.lecturer_id"></v-select>
          </v-col>
          <v-col class="d-flex" cols="12" sm="6">
            <v-select :items="courses" label="Select Course" v-model="form.course.id" item-value="id" item-text="title" :error-messages="errors.course_id"></v-select>
          </v-col>
        </v-row>

          <v-btn color="purple darken-3"  class="white--text margin-r"><a @click="editEnrolment()">Submit</a></v-btn>
          <v-btn outlined color="grey darken-2" :to="{ name: 'enrolments_index' }" class="margin">Back</v-btn>

        </v-container>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
// importing the axios library and the moment.js library
import axios from 'axios';
import moment from 'moment'; //used to format the date in the form

export default {
  name: 'EnrolmentEdit',
  props: {
  loggedIn: Boolean
  },
  components: {

  },
  data() {
    return {
      form: {
        date: null, //set to null as the date picker requires it be null
        time: null, //set to null as the time picker requires it be null
        status: "",
        course: "",
        lecturer: ""

      },
      errors: {},
      lecturers: [],
      courses: [],
      menu1: false, //date menu
      menu2: false, //time menu
      modal2: false


    }
  },
  computed: {
    computedDateFormattedMomentjs() {
      return this.form.date ? moment(this.date).format('dddd, MMMM Do YYYY') : ''
    },
  },
  mounted(){
    this.getEnrolment();
    this.getCourses();
    this.getLecturers();
  },
  methods: {
    getEnrolment() {
      let token = localStorage.getItem('token');

      axios.get(`https://college-api-cob.herokuapp.com/api/enrolments/${this.$route.params.id}`, {
        headers: { Authorization: "Bearer " + token}
      })
      .then(response => {
        console.log(response.data);
        this.form.date = response.data.data.date;
        this.form.time = response.data.data.time;
        this.form.status = response.data.data.status;
        this.form.course = response.data.data.course;
        this.form.lecturer = response.data.data.lecturer;
        this.selectedLecturer = this.form.lecturer.id;
        console.log(this.form.lecturer);

      })
      .catch(error => {
        console.log(error)
        console.log(error.response.data)
      })
    },
    editEnrolment() {
      let token = localStorage.getItem('token');


      axios.put(`https://college-api-cob.herokuapp.com/api/enrolments/${this.$route.params.id}`, {
        date: this.form.date,
        time: this.form.time,
        status: this.form.status,
        course_id: this.form.course.id,
        lecturer_id: this.form.lecturer.id,
      },
      {
        headers: { Authorization: "Bearer " + token}
      })
      .then(response => {
        console.log(response.data);
        this.$router.push({ name: 'enrolments_index' });
      })
      .catch(error => {
        console.log(error)
        console.log(error.response.data)
        if (error.response.data.errors) {
          this.errors = error.response.data.errors
        }
      })
    },
  getCourses() {
    let token = localStorage.getItem('token');

    //console.log(token);

    axios.get('https://college-api-cob.herokuapp.com/api/courses', {
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
  }
}
}
</script>
<style>
.home {
  text-align: center;
}
</style>

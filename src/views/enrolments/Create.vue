<template>
<v-container align-center cols="12" md="8" class="margin-top">
  <v-card cols="10" md="10">
  <v-card-title class="blue lighten-5 mb-2"><h2 class="font-weight-light">Create Enrolment</h2>
    </v-card-title>
    <v-form>
      <v-container>
        <v-row>
            <v-col cols="12" md="6">
        <v-menu v-model="menu1" :close-on-content-click="false" max-width="290">
          <template v-slot:activator="{ on, attrs }">
            <v-text-field :value="computedDateFormattedMomentjs" clearable label="Enter Date" readonly v-bind="attrs" v-on="on" :error-messages="errors.date"></v-text-field>
          </template>
          <v-date-picker v-model="form.date" @change="menu1 = false"></v-date-picker>
        </v-menu>
      </v-col>
          <v-col cols="12" md="6">
            <v-menu ref="menu" v-model="menu2" :close-on-content-click="false" :return-value.sync="time" transition="scale-transition" max-width="290px" min-width="290px">
              <template v-slot:activator="{ on, attrs }">
                <v-text-field v-model="form.time" label="Picker in menu" prepend-icon="mdi-clock-time-four-outline" readonly v-bind="attrs" v-on="on" :error-messages="errors.time"></v-text-field>
              </template>
              <v-time-picker v-if="menu2" v-model="form.time" full-width @click:minute="$refs.menu.save(time)"></v-time-picker>
            </v-menu>
          </v-col>
          </v-row>
        <div class="row">
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
        <v-row>
        <v-col class="d-flex" cols="12" sm="6">
          <v-select :items="lecturers" label="Select Lecturer" v-model="form.lecturer" item-value="id" item-text="name" :error-messages="errors.lecturer_id"></v-select>
        </v-col>
        <v-col class="d-flex" cols="12" sm="6">
          <v-select :items="courses" label="Select Course" v-model="form.course" item-value="id" item-text="title" :error-messages="errors.course_id"></v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-btn color="purple darken-3"  class="white--text margin"><a @click="createEnrolment()">Submit</a></v-btn>
        <v-btn outlined color="grey darken-2" :to="{ name: 'enrolments_index' }" class="margin">Back</v-btn>
      </v-row>
      </v-container>
    </v-form>
  </v-card>
</v-container>
</template>

<script>
import axios from 'axios';
import moment from 'moment';

export default {
  name: 'EnrolmentCreate',
  props: {
    loggedIn: Boolean //<-- this is new line
  },
  components: {

  },
  data() {
    return {
      time: null,
      menu2: false,
      modal2: false,
      form: {
        date: null,
        time: null,
        status: "",
        course: "",
        lecturer: ""

      },
      errors: {},
      lecturers: [],
      courses: [],
      menu1: false,
      // filteredEnrolments: [],

    }
  },
  computed: {
    computedDateFormattedMomentjs() {
      return this.form.date ? moment(this.date).format('dddd, MMMM Do YYYY') : ''
    },
  },
  mounted() {
    this.getCourses();
    this.getLecturers();
  },
  methods: {
    createEnrolment() {
      let token = localStorage.getItem('token');

      axios.post('https://college-api-cob.herokuapp.com/api/enrolments', {
          date: this.form.date,
          time: this.form.time,
          status: this.form.status,
          course_id: this.form.course,
          lecturer_id: this.form.lecturer,
        }, {
          headers: {
            Authorization: "Bearer " + token
          }
        })
        .then(response => {
          console.log('YAY');
          console.log(response.data);
          this.$router.push({
            name: 'enrolments_index'
          });
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
  },

}
</script>
<style>
.home {
  text-align: center;
}
.margin {
  margin: 10px;
}
.errors {
  color: red;
  font-weight: light;
  font-size: 9pt;
}
</style>

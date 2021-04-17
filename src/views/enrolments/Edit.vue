<template>
  <div class="container">
    <b-form class="col-md-10">
      <div class="row">
        <b-form-group label="Date:" class="col-md-5">
          <b-form-datepicker v-model="form.date" placeholder="Enter Date" required></b-form-datepicker>
          <p class="error" v-if="errors.date">{{ errors.date[0] }}</p>
        </b-form-group>
        <b-form-group label="Enrolment Time:" class="col-md-5">
          <b-form-timepicker v-model="form.time" placeholder="Enter time" required></b-form-timepicker>
          <p class="error" v-if="errors.time">{{ errors.time[0] }}</p>
        </b-form-group>
      </div>
      <div class="row">
        <b-form-group label="Status" class="col-md-10">
          <b-form-radio-group
            v-model="form.status"
          >
            <b-form-radio value="assigned">Assigned</b-form-radio>
            <b-form-radio value="associate">Associate</b-form-radio>
            <b-form-radio value="career_break">Career Break</b-form-radio>
            <b-form-radio value="interested">Interested</b-form-radio>

          </b-form-radio-group>
          <p class="error" v-if="errors.status">{{ errors.status[0] }}</p>
        </b-form-group>
      </div>
      <div class="row">
        <b-form-group label="Lecturer" class="col-md-10">
          <b-form-select v-model="form.lecturer.id" >
            <b-form-select-option v-for="lecturer in lecturers" :value="lecturer.id" :key="lecturer.id"> {{ lecturer.name }} </b-form-select-option>
          </b-form-select>
        </b-form-group>
        <b-form-group label="Course" class="col-md-10">
          <b-form-select v-model="form.course.id" >
            <b-form-select-option v-for="course in courses" :value="course.id" :key="course.id">
              {{ course.title }}
            </b-form-select-option>
          </b-form-select>
        </b-form-group>
      </div>
      <a class="btn btn-success" @click="editEnrolment()">Submit</a>
    </b-form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'EnrolmentCreate',
  props: {
  loggedIn: Boolean //<-- this is new line
  },
  components: {

  },
  data() {
    return {
      form: {
        date: "",
        time: "",
        status: "",
        lecturer: "",
        course: ""

      },
      errors: {},
      lecturers: [],
      courses: [],
    }
  },
  mounted(){
    this.getEnrolment();
    this.getCourses();
    this.getLecturers();
  },
  methods: {
    getEnrolment() {
      let token = localStorage.getItem('token');

      axios.get(`http://college.api:8000/api/enrolments/${this.$route.params.id}`, {
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


      axios.put(`http://college.api:8000/api/enrolments/${this.$route.params.id}`, {
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
  }
}
}
</script>
<style>
.home {
  text-align: center;
}
</style>

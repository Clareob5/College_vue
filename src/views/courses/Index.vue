<template>
<div>
  Courses Page
  <br>
  <!-- <button @click="getCourses()">Get Courses</button> -->
  <button @click="logout()">Logout</button>

  <router-link :to="{ name: 'courses_create' }">Create</router-link>
  <br>
  <input type="text" v-model="term" />
  <b-button @click="searchCourse()">Search</b-button>
  <br><br>
  <select v-model="selectedLecturer">
     <option v-for="lecturer in lecturers" :value="lecturer.id" :key="lecturer.id">
       {{ lecturer.name }}
    </option>
  </select>
  <span>Selected Lecturer:: {{ selectedLecturer }}</span>

  <select v-model="selectedCourse">
     <option v-for="course in courses" :value="course.id" :key="course.id">
       {{ course.title }}
    </option>
  </select>
  <span>Selected Course: {{ selectedCourse }}</span>
  <br><br>

  <b-table striped hover :items="filteredCourses" :fields="fields">
    <template #cell(title)="data">
      <router-link :to="{ name: 'courses_show', params: { id: data.item.id }}">{{ data.item.title }}</router-link>
    </template>
    <template #cell(actions)="data">
      <router-link :to="{ name: 'courses_edit', params: { id: data.item.id }}">edit</router-link>
      <button type="button" name="delete" class="btn btn-danger btn-xs delete" @click="deleteCourse(courses, data.item.id)">&#10007;</button>
    </template>
  </b-table>

</div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'CourseIndex',
  components: {

  },
  data() {
    return {
      fields: [{
          key: 'title',
          sortable: true,
        },
        'code', 'points',
        {
          key: 'level',
          sortable: true
        },
        'actions'
      ],
      courses: [],
      lecturers: [],
      term: "",
      filteredCourses: [],
      selectedCourse: "",
      selectedLecturer: ""
    }
  },
  watch: {
    term: function() {
    this.searchCourse();
    }
  },
  mounted() {
    this.getCourses();
    this.getLecturers();
  },
  methods: {
    searchCourse() {
      this.filteredCourses = this.courses.filter(course => {
        if (course.title.toLowerCase().includes(this.term.toLowerCase())) {
        return true;
      }
      if (course.code.toLowerCase().includes(this.term.toLowerCase())) {
        return true;
      }
    });
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
    },
    deleteCourse(courses, id) {
      let token = localStorage.getItem('token');
      // const course = this.courses.indexOf(id);
       console.log(courses);
        //console.log(id);
     //  axios.delete('https://my-json-server.typicode.com/json/posts/' + result.id)
     // .then(response => {
     //   this.result.splice(id, 1)
     //   console.log(this.result);
     // });

      axios.delete(`http://college.api:8000/api/courses/${id}`,{
          headers: {
            Authorization: "Bearer " + token
          }

        })
  .then(function (response) {
    console.log(response);
    //console.log(id);
    //this.getCourses();
    this.$router.push({ name: 'courses_index' });

  })
  .catch(function (error) {
    console.log(error)
  })

      // console.log(id)
      // const course = this.courses.indexOf(id);
      // console.log(course);
      // this.courses.splice(course, 1);
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
</style>

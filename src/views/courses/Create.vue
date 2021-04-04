<template>
<div class="container">
  <b-form class="col-md-10">
    <div class="row">
      <b-form-group label="Title:" class="col-md-5">
        <b-form-input v-model="form.title" placeholder="Enter title" required></b-form-input>
        <p class="error" v-if="errors.title">{{ errors.title[0] }}</p>
      </b-form-group>
      <b-form-group label="Course Code:" class="col-md-5">
        <b-form-input v-model="form.code" placeholder="Enter code" required></b-form-input>
        <p class="error" v-if="errors.code">{{ errors.code[0] }}</p>
      </b-form-group>
    </div>
    <div class="row">
      <b-form-group label="Description:" class="col-md-10">
        <b-form-textarea v-model="form.description" placeholder="Enter Description" required></b-form-textarea>
        <p class="error" v-if="errors.description">{{ errors.description[0] }}</p>
      </b-form-group>
    </div>
    <div class="row">
      <b-form-group label="Points:" description="Points must be 100 or above" class="col-md-5">
        <b-form-input v-model="form.points" placeholder="Enter Points" required></b-form-input>
        <p class="error" v-if="errors.points">{{ errors.points[0] }}</p>
      </b-form-group>
      <b-form-group label="Level:" description="Enter a level between 7 and 10" class="col-md-5">
        <b-form-input v-model="form.level"  placeholder="Enter Level" required></b-form-input>
        <p class="error" v-if="errors.level">{{ errors.level[0] }}</p>
      </b-form-group>

    </div>
    <a class="btn btn-success" @click="createCourse()">Submit</a>
  </b-form>

</div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'CourseCreate',
  props: {
    loggedIn: Boolean //<-- this is new line
  },
  components: {

  },
  data() {
    return {
      form: {
        title: "",
        code: "",
        description: "",
        points: "",
        level: "",
      },
      errors: {}
    }
  },
  mounted() {

  },
  methods: {
    createCourse() {
      let token = localStorage.getItem('token');


      axios.post('http://college.api:8000/api/courses', {
          title: this.form.title,
          code: this.form.code,
          description: this.form.description,
          points: this.form.points,
          level: this.form.level,
        }, {
          headers: {
            Authorization: "Bearer " + token
          }
        })
        .then(response => {
          console.log('YAY');
          console.log(response.data);
          this.$router.push({
            name: 'courses_index'
          });
        })
        .catch(error => {
          console.log(error)
          console.log(error.response.data)
          if (error.response.data.errors) {
            this.errors = error.response.data.errors
          }
        })
    }
  },
}
</script>
<style>
.home {
  text-align: center;
}

.error {
  color: red;
  font-size: 8px;
}
</style>

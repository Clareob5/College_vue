<template>
  <v-container align-center cols="12" md="8">
  <v-card cols="10" md="10">
      <v-card-title>Create a Course</v-card-title>
<v-form>
  <v-container>

    <v-row>
      <v-col cols="12" md="6">
        <v-text-field v-model="form.title" :counter="30" label="Title" required></v-text-field><p v-if="errors.title">{{ errors.title[0] }}</p>

      </v-col>
      <v-col cols="12" md="6">
        <v-text-field v-model="form.code" label="Code" :counter="5" required></v-text-field>
      </v-col>

      <v-col cols="12" md="10">
        <v-textarea v-model="form.description" color="purple">
          <template v-slot:label>
            <div>
              Description
            </div>
          </template>
        </v-textarea>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6">
        <v-text-field v-model="form.points" :counter="3" label="Points" required></v-text-field>
      </v-col>

      <v-col cols="12" md="6">
        <v-text-field v-model="form.level" label="Level" required></v-text-field>
      </v-col>
    </v-row>
    <v-btn black--text color="blue darken-3"><a @click="createCourse()">Submit</a></v-btn>
  </v-container>
</v-form>
</v-card>
</v-container>
<!-- <div class="container">
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

    </div> -->

<!-- </b-form> -->
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

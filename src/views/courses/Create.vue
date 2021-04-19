<template>
  <v-container align-center cols="12" md="8" class="margin-top">
  <v-card cols="10" md="10">
      <v-card-title class="blue lighten-5 mb-2"><h2 class="font-weight-light">Create a Course</h2></v-card-title>
<v-form>
  <v-container>

    <v-row>
      <v-col cols="12" md="6">
        <v-text-field v-model="form.title" :counter="30" label="Title" :error-messages="errors.title" required></v-text-field>

      </v-col>
      <v-col cols="12" md="6">
        <v-text-field v-model="form.code" label="Code" :counter="5" :error-messages="errors.code" required></v-text-field>
      </v-col>

      <v-col cols="12" md="10">
        <v-textarea v-model="form.description" color="blue darken-3" :error-messages="errors.description">
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
        <v-text-field v-model="form.points" :counter="3" label="Points" :error-messages="errors.points" required></v-text-field>
      </v-col>

      <v-col cols="12" md="6">
        <v-text-field v-model="form.level" label="Level" :error-messages="errors.level" required></v-text-field>
      </v-col>
    </v-row>
    <v-btn color="purple darken-3"  class="white--text margin-r"><a @click="createCourse()">Submit</a></v-btn>
    <v-btn outlined color="grey darken-2" :to="{ name: 'courses_index' }"><a >Back</a></v-btn>
  </v-container>
</v-form>
</v-card>
</v-container>
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


      axios.post('https://college-api-cob.herokuapp.com/api/courses', {
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
  background-color: white !important;
  color: red;
  font-size: 12px;
}

.margin-top {
  margin-top: 30px;
}

.margin-r {
  margin-right: 5px;
}
</style>

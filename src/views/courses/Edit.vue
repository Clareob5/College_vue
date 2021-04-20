<template>
<v-container align-center cols="12" md="8" class="margin-top">
  <v-card cols="10" md="10">
    <v-card-title class="blue lighten-5 mb-2">
      <h2 class="font-weight-light">Edit Course</h2>
    </v-card-title>
    <!-- Edit courses form -->
    <v-form>
      <v-container>
        <v-row>
          <v-col cols="12" md="6">
            <!--  text field to enter form data and to display error message inline -->
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
        <!-- v-btn for calling the create course method -->
        <v-btn color="purple darken-3" class="white--text margin-r"><a @click="editCourse()">Submit</a></v-btn>
        <!-- using a :to bind to redirect to index page -->
        <v-btn outlined color="grey darken-2" :to="{ name: 'courses_index' }"><a>Back</a></v-btn>
      </v-container>
    </v-form>
  </v-card>
</v-container>
</template>

<script>
//importing axios
import axios from 'axios';

export default {
  //name from router.js to load the correct page
  name: 'CourseCreate',
  props: {
    //logged in boolean needed so if you arent logged in you cant access this page
    loggedIn: Boolean
  },
  components: {

  },
  data() {
    //returns the entered form data from the vuetify form
    return {
      form: {
        title: "",
        code: "",
        description: "",
        points: "",
        level: "",
      },
      //errors array used to display inline errors
      errors: {}
    }
  },
  mounted() {
    //getting course by id on page load
    this.getCourse();
  },
  methods: {
    getCourse() {
      //setting tokne at the logged in token from the local storage
      let token = localStorage.getItem('token');

      //fecthing the selected coures information to display in the form
      axios.get(`https://college-api-cob.herokuapp.com/api/courses/${this.$route.params.id}`, {
          headers: {
            Authorization: "Bearer " + token
          }
        })
        .then(response => {
          //reponding with the form data - this data will be in its respective form input fields
          console.log(response.data);
          this.form.title = response.data.data.title;
          this.form.code = response.data.data.code;
          this.form.description = response.data.data.description;
          this.form.points = response.data.data.points;
          this.form.level = response.data.data.level;

        })
        .catch(error => {
          console.log(error)
          console.log(error.response.data)
        })
    },
    editCourse() {
      //setting tokne at the logged in token from the local storage
      let token = localStorage.getItem('token');

      //getting axios to make a put request to the api to update the course data using the id from the route
      axios.put(`https://college-api-cob.herokuapp.com/api/courses/${this.$route.params.id}`, {
          title: this.form.title,
          code: this.form.code,
          description: this.form.description,
          points: this.form.points,
          level: this.form.level,
        }, {
          headers: {
            //passing in the token so the api knows api knows user is logged in
            Authorization: "Bearer " + token
          }
        })
        .then(response => {
          console.log(response.data);
          //redirects to index page once course is created
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

</style>

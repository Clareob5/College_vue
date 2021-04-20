<template>
<v-container align-center cols="12" md="8" class="margin-top">
  <v-card cols="10" md="10">
    <v-card-title class="blue lighten-5 mb-2">
      <h2 class="font-weight-light">Create a Course</h2>
    </v-card-title>
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
            <!-- textarea for large inputs -->
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
        <v-btn color="purple darken-3" class="white--text margin-r"><a @click="createCourse()">Submit</a></v-btn>
        <!-- using a :to bind to redirect to index page -->
        <v-btn outlined color="grey darken-2" :to="{ name: 'courses_index' }"><a>Back</a></v-btn>
      </v-container>
    </v-form>
  </v-card>
</v-container>
</template>

<script>
import axios from 'axios';

export default {
  //component name for access with router
  name: 'CourseCreate',
  props: {
    loggedIn: Boolean //<-- login prop so perosn has to be logged in to view page
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
      errors: {} //errors array to display appropriate validation errors
    }
  },
  mounted() {

  },
  methods: {
    createCourse() {
      //accessing the token in local storage
      let token = localStorage.getItem('token');

      //useing axios to post the entered from data into the
      axios.post('https://college-api-cob.herokuapp.com/api/courses', {
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
          console.log(error.response.data)
          if (error.response.data.errors) {
            this.errors = error.response.data.errors //printing the errors
          }
        })
    }
  },
}
</script>
<style>
/* custom styles */
.margin-top {
  margin-top: 30px;
}

.margin-r {
  margin-right: 5px;
}
</style>

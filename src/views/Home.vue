<template>
<div>
  <!-- if logged in you'll see your homepage -->
  <div v-if="loggedIn">
    <v-container class="center" align-center justify-center>
      <h1 class="center font-weight-light">Welcome the the College Portal</h1>
      <hr>
      <v-card class="mx-auto" max-width="800" max-height="400" outlined>
        <v-row>
          <v-col cols="12" sm="5" md="5">
            <v-card-title>
              <h4>About Us</h4>
            </v-card-title>
            <v-card-text class="font-weight-regular">
              <p>Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition. Organically grow the holistic world view of disruptive innovation via workplace diversity and empowerment.
                Bring to the table win-win survival strategies to ensure proactive domination.</p>
            </v-card-text>
          </v-col>
          <v-col cols="12" sm="6" md="6">
            <v-img :src="require('@/assets/welcomePage.jpg')" />
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </div>

  <!-- If logged out the login/register slider will appear -->
  <div id="inspire" class="login container" v-else>
    <v-layout align-center justify-center>
      <v-col cols="12" sm="8" md="10">
        <v-card class="elevation-5">
          <!-- using v-window component to have a slider to change between login and register forms -->
          <v-window v-model="step">
            <!-- login form slide -->
            <v-window-item :value="1">
              <v-row>
                <v-col cols="12" md="8">
                  <v-card-text class="mt-12">
                    <h1 class="text-center display-2 black--text text--accent-3">Sign in to College Portal</h1>
                    <v-form>
                      <v-text-field v-model="form.email" prepend-icon="person" name="email" label="Email" type="text" required></v-text-field>
                      <v-text-field v-model="form.password" id="password" prepend-icon="lock" name="password" label="Password" type="password" required></v-text-field>
                    </v-form>
                    <div class="text-center mt-3">
                      <v-btn rounded color="purple darken-3" dark @click="login()">SIGN IN</v-btn>
                    </div>
                  </v-card-text>

                </v-col>
                <v-col cols="12" md="4" class="purple darken-2">
                  <v-card-text class="white--text mt-12">
                    <h1 class="text-center display-1">Dont have an account?</h1>
                    <h5 class="text-center">Click below to sign up</h5>
                  </v-card-text>
                  <div class="text-center">
                    <v-btn rounded outlined dark @click="step++">SIGN UP</v-btn>
                  </div>
                </v-col>
              </v-row>
            </v-window-item>
            <!-- register form slide -->
            <v-window-item :value="2">
              <v-row class="fill-height">
                <v-col cols="12" md="4" class="purple darken-2">
                  <v-card-text class="white--text mt-12">
                    <h1 class="text-center display-1">Already Have an Account?</h1>
                    <h5 class="text-center">Sign in here</h5>
                  </v-card-text>
                  <div class="text-center">
                    <v-btn rounded outlined dark @click="step--">Sign in</v-btn>
                  </div>
                </v-col>
                <v-col cols="12" md="8">
                  <v-card-text class="mt-12">
                    <h1 class="text-center display-2 black--text text--accent-3">Create Account</h1>
                    <v-form>
                      <v-text-field v-model="form.name" :error-messages="errors.name" label="Name" name="Name" prepend-icon="person" type="text" color="purple darken-2" required />
                      <v-text-field v-model="form.email" label="Email" :error-messages="errors.email" name="Email" prepend-icon="email" type="text" color="purple darken-2" required></v-text-field>
                      <v-text-field v-model="form.password" :error-messages="errors.password" id="password" label="Password" name="password" prepend-icon="lock" type="password" color="purple darken-2" required />
                    </v-form>
                    <div class="text-center">
                      <v-btn rounded color="purple darken-3" dark @click="register()">SIGN UP</v-btn>
                    </div>
                  </v-card-text>
                </v-col>
              </v-row>
            </v-window-item>
          </v-window>
        </v-card>
      </v-col>
    </v-layout>
  </div>
</div>
</template>

<script>
//importing axios library
import axios from 'axios'

export default {
  //componet name
  name: 'Login',
  props: {
    loggedIn: Boolean //<-- setting the logged in boolean
  },
  data() {
    return {
      step: 1, //shows the login slide automatically
      form: {
        email: "",
        password: ""
      },
      errors: {} //for displaying errors in console

    }

  },
  methods: {
    login() {
      //fixing a bug by setting self = this
      let self = this;
      axios.post('https://college-api-cob.herokuapp.com/api/login', {
          email: this.form.email,
          password: this.form.password
        })
        .then(function(response) {
          //setting the token in local storage to be used within the other views
          localStorage.setItem('token', response.data.token);
          self.$emit('login'); // <-- emits login
          //redirecting to home
          self.$router.replace({
            name: 'home'
          });
        })
        .catch(function(error) {
          console.log(error);
          console.log(error.response.data)
          if (error.response.data.errors) {
            //set the errors object to the errors that are printed from the console
            this.errors = error.response.data.errors
          }
        })
    },
    register() {
        //fixing a bug by setting self = this
      let self = this;
      axios.post('https://college-api-cob.herokuapp.com/api/register', {
          name: this.form.name,
          email: this.form.email,
          password: this.form.password
        })
        .then(function(response) {
          console.log(response);
          localStorage.setItem('token', response.data.token);
          self.$emit('login'); // <-- this is the new line
          self.$router.replace({
            name: 'home'
          });
        })
        .catch(function(error) {
          console.log(error);
          console.log(error.response.data)
          if (error.response.data.errors) {
            //set the errors object to the errors that are printed from the console
            this.errors = error.response.data.errors
          }
        })
    }
  }
}
</script>

<style>
/* custom styles */
.login {
  text-align: center;
  padding: 10px;
}

.login-btn {
  padding-bottom: 10px;
}

.center {
  align: center;
  margin: 15px;
}
</style>

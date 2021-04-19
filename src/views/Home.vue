<template>
  <div>
  <div v-if="loggedIn">
    <v-container align-center>
      <h1>Welcome the the College Portal</h1>
    </v-container>
  </div>
  <div id="inspire" class="login container" v-else>
    <v-layout align-center justify-center>
          <v-col cols="12" sm="8" md="10">
            <v-card class="elevation-5">
              <v-window v-model="step">
                <v-window-item :value="1">
                  <v-row>
                    <v-col cols="12" md="8">
                      <v-card-text class="mt-12">
                        <h1
                          class="text-center display-2 black--text text--accent-3"
                        >Sign in to College Portal</h1>

                        <v-form lazy-validation>
                          <v-text-field
                             v-model="form.email"
                             prepend-icon="person"
                             name="email"
                             label="Email"
                             type="text"
                             required
                          ></v-text-field>
                          <v-text-field
                             v-model="form.password"
                             id="password"
                             prepend-icon="lock"
                             name="password"
                             label="Password"
                             type="password"
                             required
                          ></v-text-field>
                        </v-form>
                      <div class="text-center mt-3">
                          <v-btn rounded color="purple darken-3" dark @click="login()">SIGN IN</v-btn>
                        </div>
                      </v-card-text>

                    </v-col>
                    <v-col cols="12" md="4" class="purple darken-2">
                      <v-card-text class="white--text mt-12">
                        <h1 class="text-center display-1">Dont have an account?</h1>
                        <h5
                          class="text-center"
                        >Click below to sign up</h5>
                      </v-card-text>
                      <div class="text-center">
                        <v-btn rounded outlined dark @click="step++">SIGN UP</v-btn>
                      </div>
                    </v-col>
                  </v-row>
                </v-window-item>
                <v-window-item :value="2">
                  <v-row class="fill-height">
                    <v-col cols="12" md="4" class="purple darken-2">
                      <v-card-text class="white--text mt-12">
                        <h1 class="text-center display-1">Already Have an Account?</h1>
                        <h5
                          class="text-center"
                        >Sign in here</h5>
                      </v-card-text>
                      <div class="text-center">
                        <v-btn rounded outlined dark @click="step--">Sign in</v-btn>
                      </div>
                    </v-col>

                    <v-col cols="12" md="8">
                      <v-card-text class="mt-12">
                        <h1 class="text-center display-2 black--text text--accent-3">Create Account</h1>

                        <v-form>
                          <v-text-field
                            v-model="form.name"
                            label="Name"
                            name="Name"
                            prepend-icon="person"
                            type="text"
                            color="purple darken-2"
                          />

                          <v-text-field
                            v-model="form.email"
                            label="Email"
                            name="Email"
                            prepend-icon="email"
                            type="text"
                            color="purple darken-2"
                          />

                         <v-text-field
                            v-model="form.password"
                            id="password"
                            label="Password"
                            name="password"
                            prepend-icon="lock"
                            type="password"
                            color="purple darken-2"
                          />
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
import axios from 'axios'

export default {
  name: 'Login',
  components: {

  },
  props: {
  loggedIn: Boolean //<-- this is new line
},
  data(){
    return {
      step: 1,
      form: {
        email: "",
        password: ""
      },
      errors: {}

    }

  },
  methods:{
    login() {
      let self = this;
     axios.post('https://college-api-cob.herokuapp.com/api/login', {
       email: this.form.email ,
       password: this.form.password
     })
     .then(function (response) {
       localStorage.setItem('token', response.data.token);
       self.$emit('login'); // <-- this is the new line
       self.$router.replace({
         name: 'courses_index'
       });
     })
       .catch(function (error) {
       console.log(error);  console.log(error.response.data)
         if (error.response.data.errors) {
           this.errors = error.response.data.errors
         }
       })
   },
 register() {
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
     })
 }
}
}
</script>

<style>
.login {
  text-align: center;
  padding: 10px;
}

.login-btn {
  padding-bottom: 10px;
}

</style>

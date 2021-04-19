<template>
<div>
  <v-col cols="12" sm="8" md="10">
    <v-card container>
      <v-card-title class="blue lighten-5 mb-2">
        <h2 class="font-weight-light">{{ lecturer.name }}</h2>
      </v-card-title>
      <v-card-text cols="6" sm="6" md="6">
        <h4 class="font-weight-regular text--primary">Address: </h4>
        <p>{{ lecturer.address }}</p>
        <h4 class="font-weight-regular text--primary">Email: </h4>
        <p>{{ lecturer.email }}</p>
        <h4 class="font-weight-regular text--primary">Phone: </h4>
        <p>{{ lecturer.phone }}</p>
      </v-card-text>

      <v-btn icon plain color="orange darken-3" :to="{ name: 'lecturers_edit', params: { id: lecturer.id }}"><span class="material-icons" color="orange">
          edit
        </span></v-btn>
      <v-btn icon plain color="red darken-2" @click="deleteLecturer(lecturer)"><span class="material-icons">
          delete
        </span></v-btn>
      <v-btn plain>
        <router-link :to="{ name: 'lecturers_index' }">
          Back
        </router-link>
      </v-btn>
    </v-card>
  </v-col>


  <v-col>
    <v-card>
      <v-card-title class="blue lighten-5">
        <h3 class="font-weight-light">Enrolments of: {{ lecturer.name }}</h3>
      </v-card-title>
      <v-data-table :headers="headers" :items="lecturer.enrolments" :items-per-page="10" class="elevation-1">
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn icon plain color="orange darken-3" :to="{ name: 'enrolments_edit', params: { id: item.id }}"><span class="material-icons" color="orange">
              edit
            </span></v-btn>
          <v-btn icon plain color="red darken-2" @click="deleteEnrolment(item, item.id)"><span class="material-icons">
              delete
            </span></v-btn>
          <v-btn icon plain>
            <router-link :to="{ name: 'enrolments_show', params: { id: item.id }}"><span class="material-icons" color="blue">
                visibility
              </span></router-link>
          </v-btn>
        </template>

      </v-data-table>
    </v-card>
  </v-col>

</div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'LecturerShow',
  props: {
    loggedIn: Boolean //<-- this is new line
  },
  components: {

  },
  data() {
    return {
      lecturer: {},
      headers: [{
          text: 'date',
          value: 'date',
          sortable: true,
        },
        {
          text: 'time',
          value: 'time'
        },
        {
          sortable: true,
          text: 'status',
          value: 'status'
        },
        {
          label: 'Course',
          text: 'Course',
          value: 'course.title',
          key: 'course.title',
          sortable: true,
        },
        {
          text: 'actions',
          value: 'actions'
        },
      ],
    }
  },
  mounted() {
    let token = localStorage.getItem('token');

    axios.get(`https://college-api-cob.herokuapp.com/api/lecturers/${this.$route.params.id}`, {
        headers: {
          Authorization: "Bearer " + token
        }
      })
      .then(response => {
        console.log(response.data);
        this.lecturer = response.data.data;

      })
      .catch(error => {
        console.log(error)
        console.log(error.response.data)
      })
  },
  methods: {
    deleteLecturer(lecturer) {
      let token = localStorage.getItem('token');
      console.log(this.deleteDialog);
      this.deleteDialog = false;

      let listOfDeleteRequests = lecturer.enrolments.map((current) => axios.delete('https://college-api-cob.herokuapp.com/api/enrolments/' + current.id, {
        headers: {
          Authorization: "Bearer " + token
        }
      }));
      // log the contents of listOfDeleteRequests
      axios.all(listOfDeleteRequests)
        .then(function(response) {
          console.log(response);
          axios.delete("https://college-api-cob.herokuapp.com/api/lecturers/" + lecturer.id, {
              headers: {
                Authorization: "Bearer " + token
              }
            })
            .then(function(response) {
              console.log(response);

            })
            .catch(function(error) {
              console.log(error);
            });
        });
    },
    deleteEnrolment(enrolments, id) {
      let token = localStorage.getItem('token');
      const enrole = this.enrolments.indexOf(id);
      console.log('Enrole' + enrole);
      //this.enrolments.splice(enrole, 1);

      axios.delete(`https://college-api-cob.herokuapp.com/api/enrolments/${id}`, {
          headers: {
            Authorization: "Bearer " + token
          }

        })
        .then(function(response) {
          console.log(response);
          //console.log(id);
          //this.getEnrolments();
          //this.$router.push({ name: 'enrolments_index' });

        })
        .catch(function(error) {
          console.log(error)
        })

      // console.log(id)
      // const enrolment = this.enrolments.indexOf(id);
      // console.log(enrolment);
      // this.enrolments.splice(enrolment, 1);
      // localStorage.removeItem(enrolment);

      // axios.delete(`https://college-api-cob.herokuapp.com/api/enrolments/${id}`).then(()=>{
      //   //this.getData;
      // })
    },
  },
}
</script>

<style>
.home {
  text-align: center;
}
</style>

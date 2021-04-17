<template>
<div>

  <h4>Name: </h4> {{ lecturer.name }} <br>
  <h4>Address: </h4> {{ lecturer.address }}<br>
  <h4>Email: </h4> {{ lecturer.email }}<br>
  <h4>Phone: </h4> {{ lecturer.phone }}<br>

  <b-table striped hover :items="lecturer.enrolments">
    <!-- <template #cell(title)="data">
      <router-link :to="{ name: 'courses_show', params: { id: data.item.id }}">{{ data.item.title }}</router-link>
    </template> -->
  </b-table>

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
      lecturer: {}
    }
  },
  mounted() {
    let token = localStorage.getItem('token');

    axios.get(`http://college.api:8000/api/lecturers/${this.$route.params.id}`, {
      headers: { Authorization: "Bearer " + token}
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
  },
}
</script>

<style>
.home {
  text-align: center;
}
</style>

<template>
  <div>

    title: <input type="text" v-model="form.title" /> <br>
    code: <input type="text" v-model="form.code" /> <span v-if="errors.code"> {{ errors.code }} </span><br>
    description: <input type="text" v-model="form.description" /> <br>
    points: <input type="text" v-model="form.points" /> <span v-if="errors.points"> {{ errors.points }} </span><br>
    level: <input type="text" v-model="form.level" /> <span v-if="errors.level"> {{ errors.level }} </span><br>

    <button @click="editCourse()">Submit</button>


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
  mounted(){
    this.getCourse();
  },
  methods: {
    getCourse() {
      let token = localStorage.getItem('token');

      axios.get(`http://college.api:8000/api/courses/${this.$route.params.id}`, {
        headers: { Authorization: "Bearer " + token}
      })
      .then(response => {
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
      let token = localStorage.getItem('token');


      axios.put(`http://college.api:8000/api/courses/${this.$route.params.id}`, {
        title: this.form.title,
        code: this.form.code,
        description: this.form.description,
        points: this.form.points,
        level: this.form.level,
      },
      {
        headers: { Authorization: "Bearer " + token}
      })
      .then(response => {
        console.log(response.data);
        this.$router.push({ name: 'courses_index' });
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
</style>

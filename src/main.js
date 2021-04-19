import Vue from 'vue'
import moment from 'moment'
import Vuetify from 'vuetify'
import vuetify from './plugins/vuetify' // path to vuetify export
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import router from './router'

Vue.use(BootstrapVue);
Vue.use(Vuetify);

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  moment,
  render: h => h(App),
}).$mount('#app')

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import NutUI from '@nutui/nutui';
import '@nutui/nutui/dist/nutui.css';
import inject from './config/inject';
NutUI.install(Vue);
Vue.use(inject);
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

import Vue from 'vue';

import adminPass from './adminPass.vue';

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#admin-pass-app',
  components: {
    adminPass
  },
  template: '<admin-pass/>',
});


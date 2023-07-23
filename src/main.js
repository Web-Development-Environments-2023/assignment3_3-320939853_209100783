import Vue from "vue";
import App from "./App.vue";
import VueAxios from "vue-axios";
import axios from "axios";
import { state as store_state ,actions as store_actions} from "./store";
import routes from "./routes";
import VueRouter from "vue-router";
Vue.use(VueRouter);
const router = new VueRouter({
  routes,
});

// import VueCookies from "vue-cookies";
// Vue.use(VueCookies);

console.log(Vue.prototype.$store)
import Vuelidate from "vuelidate";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import {
  FormFilePlugin ,
  ImagePlugin ,
  ListGroupPlugin ,
  FormGroupPlugin,
  FormPlugin,
  FormInputPlugin,
  ButtonPlugin,
  CardPlugin,
  NavbarPlugin,
  FormSelectPlugin,
  AlertPlugin,
  ToastPlugin,
  LayoutPlugin,
  FormRadioPlugin ,
} from "bootstrap-vue";
[
  FormFilePlugin ,
  ImagePlugin ,
  ListGroupPlugin ,
  FormRadioPlugin ,
  FormGroupPlugin,
  FormPlugin,
  FormInputPlugin,
  ButtonPlugin,
  CardPlugin,
  NavbarPlugin,
  FormSelectPlugin,
  AlertPlugin,
  ToastPlugin,
  LayoutPlugin,
].forEach((x) => Vue.use(x));
Vue.use(Vuelidate);

axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    config.withCredentials=true;
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    return response;
  },
  function(error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

const shared_data = {
  server_domain:"http://localhost:3000",
  store_state: store_state,
  store_actions: store_actions,
  username: localStorage.username,
  userId:localStorage.userId,
  login(username,userId) {
    localStorage.setItem("username", username);
    localStorage.setItem("userId", userId);
    this.username = username;
    this.userId = userId;
    console.log("login", this.username);
    console.log(userId);
    // console.log(this.$root.store);
    // console.log(this.$root.store.store_state);
    // console.log(this.userFavorites);
  },
  logout() {
    console.log("logout");
    localStorage.removeItem("username");
    sessionStorage.removeItem('lastSearch');
    this.username = undefined;
    localStorage.removeItem('userId');
  },
  
};
// Vue.prototype.$root.store = shared_data;

new Vue({
  router,
  data() {
    return {
      store: shared_data,
    };
  },
  methods: {
    toast(title, content, variant = null, append = false) {
      this.$bvToast.toast(`${content}`, {
        title: `${title}`,
        toaster: "b-toaster-top-center",
        variant: variant,
        solid: true,
        appendToast: append,
        autoHideDelay: 3000,
      });
    },
  },
  render: (h) => h(App),
}).$mount("#app");

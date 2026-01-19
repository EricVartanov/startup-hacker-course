import {createApp} from "vue";
import App from "./App.vue";
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';
import './font-awesome.js';
import 'startup-ui/dist/index.css';
import router from "@/router";
import '../public/assets/css/variables.css'

createApp(App).component('FontAwesomeIcon', FontAwesomeIcon).use(router).mount("#app");

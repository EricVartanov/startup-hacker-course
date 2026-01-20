import {createApp} from "vue";
import App from "./App.vue";
import "./css/style.scss";
import 'startup-ui/dist/index.css';
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';
import './font-awesome.js';
import '../public/assets/css/variables.css'


createApp(App).component('FontAwesomeIcon', FontAwesomeIcon).mount("#app");

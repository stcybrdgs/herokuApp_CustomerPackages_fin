// import vue and main app component
import Vue from "vue";
import App from "./App.vue";

// import bootstrap dependencies
import "bootstrap";  // bootstrap js
import "bootstrap/dist/css/bootstrap.css";

// import/use the slideUpDown module to mimic jQuery panels in vue
import SlideUpDown from 'vue-slide-up-down';
Vue.component('slide-up-down', SlideUpDown);

// import/use the vue toasts
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
Vue.use(VueToast);

// import Font Awesome icons
import { library } from "@fortawesome/fontawesome-svg-core";  // import fontawesome
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import{ faEye, faEyeSlash, faLink, faTrashAlt, faPlus, faDollarSign, faCheck, faHashtag, faInfoCircle, faAsterisk, faTimes} from "@fortawesome/free-solid-svg-icons";  // import icons you want
library.add( faEye, faEyeSlash, faGithub, faLinkedin, faLink, faTrashAlt, faPlus, faDollarSign, faCheck, faHashtag, faInfoCircle, faAsterisk, faTimes);  // add icons to library

// create and mount instance of Vue with App component
Vue.config.productionTip = false;


new Vue({
  render: h => h(App)
}).$mount("#app");

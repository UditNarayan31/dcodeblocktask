import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// Import Vuetify
import "vuetify/styles"; // Import Vuetify styles
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

// Import icon library
import '@mdi/font/css/materialdesignicons.css'; // Ensure you are using css-loader
import './firebaseConfig'; // Import the Firebase configuration
const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi', // This is the default value - only for demonstration
    sets: {
      mdi: {
        component: 'mdi', // Use the mdi icon set
      },
    },
  },
});

const app = createApp(App);

app.use(router);
app.use(store);
app.use(vuetify); // Use Vuetify

app.mount("#app");

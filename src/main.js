import { createApp } from 'vue'
import './style.css'
import { Notify, Quasar } from 'quasar'
import router from './router'
import store from './store'
import './permission'

// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css'
// Import Quasar css
import 'quasar/src/css/index.sass'

import App from './App.vue'

const app = createApp(App)

app.use(router)
app.use(store)

app.use(Quasar, {
  plugins: { Notify }, // import Quasar plugins and add here
})

// Assumes you have a <div id="app"></div> in your index.html
app.mount('#app')

import './utils/css/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import RootContainer from './App.vue'
import router from './router'
import { FORMKIT_CONFIG, FORMKIT_PLUGIN } from '@/utils/plugins/formkit'
import { AuthService } from './entities/auth'

const app = createApp(RootContainer)

// ------------------------------------
//              Providers
// ------------------------------------
;[AuthService].forEach((provider) => {
  app.provide(provider.name, new provider())
})
// ------------------------------------
//              Components
// ------------------------------------

// ------------------------------------
//              Plugins
// ------------------------------------
app.use(FORMKIT_PLUGIN, FORMKIT_CONFIG)
app.use(createPinia())
app.use(router)
// ------------------------------------
//              Mount
// ------------------------------------
app.mount('#root')

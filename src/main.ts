import { createApp } from 'vue'
import { createPinia } from 'pinia'

import RootContainer from './App.vue'
import router from './router'
import { AuthService } from './entities/auth'
import { environment, requestPlugin } from './utils'
import { apiIntercepter } from './utils/intercepters/api.intercepter'
import { contentTypeIntercepter } from './utils/intercepters/contentType.intercepter'

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
app.use(requestPlugin, {
  mocks: environment.mock,
  delayMs: environment.requestDelay,
  interceptes: [apiIntercepter, contentTypeIntercepter]
})

app.use(createPinia())
app.use(router)
// ------------------------------------
//              Mount
// ------------------------------------
app.mount('#root')

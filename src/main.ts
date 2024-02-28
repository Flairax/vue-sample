import { createPinia } from 'pinia'
import { createApp } from 'vue'

import RootContainer from './App.vue'
import { authIntercepter } from './entities'
import router from './router'
import { environment, requestPlugin } from './utils'
import { apiIntercepter } from './utils/intercepters/api.intercepter'
import { contentTypeIntercepter } from './utils/intercepters/contentType.intercepter'

const app = createApp(RootContainer)

// ------------------------------------
//              Providers
// ------------------------------------
;[].forEach((provider) => {
  // app.provide(provider.name, provider.root)
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
  intercepters: [apiIntercepter, contentTypeIntercepter, authIntercepter]
})

app.use(createPinia())
app.use(router)
// ------------------------------------
//              Mount
// ------------------------------------
app.mount('#root')

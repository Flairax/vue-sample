import { vsPopup,  } from 'vuesax-alpha'
import { type App } from 'vue'
import 'vuesax-alpha/dist/vuesax.css'

export function useVuesax(app: App<Element>) {
  app.use(vsPopup)
  app.use(vsSelect)
  app.use(vsPopup)
}

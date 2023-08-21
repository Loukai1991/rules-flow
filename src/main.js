import { createApp } from 'vue'
import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
import App from './App.vue'
import store from "@/store"
import router from './router'
import "@/styles/index.scss"
import { loadSvg } from "@/icons/index.ts"

import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import '@/mock';
const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

loadSvg(app)
app.use(ElementPlus)
app.use(store)
app.use(router)

router.isReady().then(() => {
    app.mount("#app")
  })
  
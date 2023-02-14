import { createApp } from 'vue'
import "./style.css"
import App from './App.vue'
import './samples/node-api'
import { ipcEventInit } from './IPCevent'
import { createPinia } from 'pinia'
import router from './router'
// import 'v-viewer/dist/v'
import 'viewerjs/dist/viewer.css'
import VueViewer from 'v-viewer'


createApp(App)
  .use(router)
  .use(createPinia())
  .use(VueViewer)
  .mount('#app')
  .$nextTick(() => {
    postMessage({ payload: 'removeLoading' }, '*'),
      ipcEventInit()
  })


import { createApp } from 'vue'
import "./style.css"
import App from './App.vue'
import './samples/node-api'
import { ipcEventInit } from './IPCevent'
import { createPinia } from 'pinia'
import router from './router'
createApp(App)
  .use(router)
  .use(createPinia())
  .mount('#app')
  .$nextTick(() => {
    postMessage({ payload: 'removeLoading' }, '*'),
      ipcEventInit()
  })


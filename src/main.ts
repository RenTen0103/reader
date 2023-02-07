import { createApp } from 'vue'
import "./style.css"
import App from './App.vue'
import './samples/node-api'
import { ipcEventInit } from './IPCevent'
import { createPinia } from 'pinia'

createApp(App)
  .use(createPinia())
  .mount('#app')
  .$nextTick(() => {
    postMessage({ payload: 'removeLoading' }, '*'),
      ipcEventInit()
  })


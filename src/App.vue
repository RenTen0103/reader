<template>
  <div class="reader" id="drag_test">
    <div v-show="!ishow">
      拖拽书籍文件到此处
    </div>

    <iframe v-show="ishow" :src="location" frameborder="0" id="reader" :height="iheight + 'px'"
      :width="iwidth + 'px'"></iframe>
  </div>
</template>
<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue';
import { ipcRenderer } from 'electron';
import { bookdataStore } from './pinia/index';
import { dirUtiles } from './utils/dirUtil';
const store = bookdataStore()

const location = ref('')


const ishow = ref(false)
const iheight = ref(100)
const iwidth = ref(100)

const index = ref(0)

const iframeAdaptive = () => {

  console.log(window.innerHeight);
  console.log(window.innerWidth);
  const r = document.getElementById('drag_test')
  if (r) {
    iheight.value = r.clientHeight
    iwidth.value = r.clientWidth
  }

}


onMounted(() => {

  ipcRenderer.on('next', () => {
    if (index.value == store.rawxHtml.length) {
      return
    }
    index.value++
    location.value = store.rawxHtml[index.value].link
  })
  
  ipcRenderer.on('pre', () => {
    if (index.value == 0) {
      return
    }

    index.value--
    location.value = store.rawxHtml[index.value].link
  })

  ipcRenderer.on('start', (_, p) => {
    store.path = p
    ishow.value = true
    dirUtiles()
    location.value = store.rawxHtml[0].link

    setTimeout(()=>{
      const i = document.getElementsByTagName('iframe')[0]
      
    },5000)
  })

  iframeAdaptive()

  window.addEventListener('resize', iframeAdaptive)

  const dragWrapper = document.getElementById("drag_test");
  if (dragWrapper != null) {
    dragWrapper.addEventListener("drop", (e) => {
      e.preventDefault();
      const files = e.dataTransfer?.files;

      if (files && files.length > 0) {
        const path = files[0].path;
        console.log('path:', path);
        ipcRenderer.send('filePath', path)
      }
    })

    dragWrapper.addEventListener("dragover", (e) => {
      e.preventDefault();
    })
  }
})


</script>
<style scoped>
iframe {
  border: 0;
}



.reader {
  width: 100vw;
  height: 100vh;
  /* background-color: aqua; */
  overflow: hidden;
}
</style>

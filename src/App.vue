<template>
  <div v-show="s">
    <div class="toc" v-show="tocShow">
      <div v-for="i, index in store.nav" class="tocItem" @click="tocClick(index)">
        {{ i?.title }}
      </div>
    </div>
    <div class="reader" id="drag_test">
      <div v-show="!ishow">
        拖拽书籍文件到此处,{{ text }}
      </div>

      <iframe v-show="ishow" :src="location" frameborder="0" id="reader" :height="iheight + 'px'"
        :width="iwidth + 'px'"></iframe>
      <div class="progressbar" v-show="progressBarShow && tocShow">
        <div class="innerbar" :style="{
          width: progress + '%'
        }">

        </div>
      </div>
    </div>
    <div class="rate">
      {{ Math.ceil(progress) > 100 ? 100 : Math.ceil(progress) }}%
    </div>
  </div>

</template>
<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue';
import { ipcRenderer } from 'electron';
import { bookdataStore } from './pinia/index';
import { dirUtiles } from './utils/dirUtil';
import { iframeUtils } from './utils/iframeUtil';
import path from 'path';
const store = bookdataStore()
const progress = ref(0)
const location = ref('')
const progressBarShow = ref(false)
const tocShow = ref(false)
const ishow = ref(false)
const iheight = ref(100)
const iwidth = ref(100)
const text = ref('')
const s = ref(false)
const isPage = ref(false)
let iu: iframeUtils

const tocClick = (index: number) => {
  const orgTocRef = store.nav[index].href


  const targetxHtml = store.rawxHtml.find(e => {
    return e.ifref == orgTocRef
  })

  location.value = (targetxHtml.link);

}

const iframeAdaptive = () => {

  const r = document.getElementById('drag_test')
  if (r) {
    iheight.value = r.clientHeight
    iwidth.value = r.clientWidth
  }

}


const updataRef = (href: string) => {
  location.value = href
}

const nextSection = () => {
  let target = location.value
  for (let index = 0; index < store.rawxHtml.length; index++) {
    const element = store.rawxHtml[index];

    if (element?.link == location.value && store.rawxHtml[index + 1] != undefined) {
      target = store.rawxHtml[index + 1]?.link
      break
    }
  }

  location.value = target
}

const preSection = () => {
  let target = location.value
  for (let index = 0; index < store.rawxHtml.length; index++) {
    const element = store.rawxHtml[index];

    if (element?.link == location.value && store.rawxHtml[index - 1] != undefined) {
      target = store.rawxHtml[index - 1]?.link
      break
    }
  }



  location.value = target
}

onMounted(() => {
  const i = document.getElementsByTagName('iframe')[0]
  document.getElementsByTagName('iframe')[0].onload = () => {

    progressBarShow.value = false
    if (!iu) {

      iu = new iframeUtils(i.contentWindow!)
      iu.isPage = isPage.value
      //i1 onload事件挂载不上去，退而求其次了
      iu.addEvent('unload', (e: Event) => {

        let oref = (<Document>(e?.target))?.URL;
        console.log(oref);
        console.log(i.contentWindow?.location.href);

        if (oref != i.contentWindow?.location.href) {
          if (i.contentWindow != null) {
            updataRef(i.contentWindow?.location.href)
            console.log(oref);
            console.log(i.contentWindow?.location.href);


          }

        } else {
          let w = setInterval(() => {

            if (oref != i.contentWindow?.location.href) {
              if (i.contentWindow != null) {

                updataRef(i.contentWindow.location.href)
                clearInterval(w)
              }

            }
          }, 10)
        }

      })

      iu.addEvent('scroll', (e: Event) => {


        let st = (<Document>e.target).documentElement.scrollTop
        let sh = (<Document>e.target).documentElement.scrollHeight
        progress.value = 100 * (st / (sh - (<Document>e.target).documentElement.clientHeight));

        progressBarShow.value = true
      })
      iu.addEvent("click", (e: PointerEvent) => {
        const d = e.x / window.innerWidth
        if (d < 0.3) {
          preSection()
        } else if (d > 0.7) {
          nextSection()
        };

      })

    }


    iu.init()
    iu.isPage = isPage.value

  }


  ipcRenderer.on('hidToc', () => {
    tocShow.value = !tocShow.value
  })

  ipcRenderer.on('next', () => {

    nextSection()

  })

  ipcRenderer.on('paging', () => {
    console.log("P");

    isPage.value = !isPage.value

  })


  ipcRenderer.on('pre', () => {
    preSection()
  })

  ipcRenderer.on('start', (_, p) => {
    store.path = p
    ishow.value = true
    dirUtiles()
    tocShow.value = true
    location.value = store.rawxHtml[0].link
  })

  ipcRenderer.on('text', (_, p) => {
    if (p[1] && p[1] != '.') {
      ipcRenderer.send('filePath', p[1])
    }

    iframeAdaptive()
  })

  iframeAdaptive()

  window.addEventListener('resize', iframeAdaptive)

  const dragWrapper = document.getElementById("drag_test");
  if (dragWrapper != null) {
    dragWrapper.addEventListener("drop", (e) => {
      e.preventDefault();
      const files = e.dataTransfer?.files;

      if (files && files.length > 0) {
        document.title = path.basename(files[0].name, '.epub')
        const p = files[0].path;
        console.log('path:', p);
        ipcRenderer.send('filePath', p)
      }
    })

    dragWrapper.addEventListener("dragover", (e) => {
      e.preventDefault();
    })
  }


  ipcRenderer.send('ready')
  s.value = true
})


</script>
<style scoped>
.progressbar {
  width: 80%;
  height: 20px;
  background-color: #ffccff;
  position: fixed;
  left: 10%;
  bottom: 20px;
}

.innerbar {
  background-color: black;
  margin-left: 0;
  height: 100%;

}

iframe {
  border: 0;
}



.reader {
  width: 100vw;
  height: 100vh;
  /* background-color: aqua; */
  overflow: hidden;
}

.toc {
  width: 200px;
  height: 400px;
  background-color: beige;
  opacity: 0.7;
  border: 1px solid black;
  position: fixed;
  overflow: scroll;
}

.tocItem {
  width: 90%;
  margin-left: 5%;
  margin-top: 3px;
  border-bottom: 1px solid black;
  cursor: pointer;
}

.toc::-webkit-scrollbar {
  display: none;
}

.rate {
  position: fixed;
  right: 5px;
  bottom: 5px;
}
</style>

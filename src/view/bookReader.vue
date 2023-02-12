<template>
    <div class="toc" v-show="tocShow">
        <div v-for="i, index in store.nav" class="tocItem" @click="tocClick(index)">
            {{ i?.title }}
        </div>
    </div>
    <div class="reader" id="drag_test">
        <iframe :src="location" frameborder="0" id="reader" :height="iheight + 'px'" :width="iwidth + 'px'"></iframe>
        <div class="progressbar" v-show="tocShow && !isPage">
            <div class="innerBar" :style="{
                width: progress + '%'
            }">

            </div>
        </div>
    </div>
    <div class="rate">
        {{
    isPage?''+(currentPage + 1) + '/' + MaxPageIndex: ''+(Math.ceil(progress) > 100 ? 100 : Math.ceil(progress))
        + '%'
        }}
    </div>
</template>
<script setup lang="ts">
import { onMounted, ref, onBeforeUnmount, nextTick } from 'vue';
import { ipcRenderer } from 'electron';
import { bookdataStore } from '../pinia/index';
import { iframeUtils } from '../utils/iframeUtil';
import ElectronStore from 'electron-store';
import e from 'express';


const store = bookdataStore()
const progress = ref(0)
const location = ref('')
const progressBarShow = ref(false)
const tocShow = ref(false)

const iheight = ref(100)
const iwidth = ref(100)

const s = ref(false)
const isPage = ref(true)
const currentPage = ref(1)
const MaxPageIndex = ref(1)
let userChange = true

let iu: iframeUtils



const tocClick = (index: number) => {
    iu.isPre = false

    const orgTocRef = store.nav[index].href


    const targetxHtml = store.rawxHtml.find(e => {
        return e.ifref == orgTocRef
    })

    location.value = (targetxHtml.link);
}

const iframeAdaptive = () => {

    const r = document.getElementById('drag_test')
    console.log(r?.clientHeight);

    if (r) {
        if (r.clientHeight == 0) {
            requestAnimationFrame(() => {
                iheight.value = r.clientHeight
                iwidth.value = r.clientWidth
            })
        }
        iheight.value = r.clientHeight
        iwidth.value = r.clientWidth
    }
}

// const updataProgress = () => {
//     let cP = (document.getElementsByTagName('iframe')[0].contentWindow as any).currentPage1
//     currentPage.value = cP ? cP : 0
//     let mP = (document.getElementsByTagName('iframe')[0].contentWindow as any).maxPageIndex
//     MaxPageIndex.value = mP ? mP : 0
// }


const updataRef = (href: string) => {
    location.value = href
}

const nextPage = () => {


    if (!(document.getElementsByTagName('iframe')[0].contentWindow as any).nextPage()) {
        nextSection()
        iu.isPre = false
    }

}

const prePage = () => {
    if (!(document.getElementsByTagName('iframe')[0].contentWindow as any).prePage()) {
        preSection()
        iu.isPre = true
    }
}


const nextSection = () => {


    let target = decodeURI(location.value)

    console.log(target);


    for (let index = 0; index < store.rawxHtml.length; index++) {
        const element = store.rawxHtml[index];

        if (element?.link == location.value && store.rawxHtml[index + 1] != undefined) {
            target = store.rawxHtml[index + 1]?.link
            break
        }
    }

    location.value = target
}

const newSectionReady = () => {
    userChange = false
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

// const recodeHistory = () => {
//     let target = iu?.window?.document.elementFromPoint(0, 0);
//     setInterval(() => {
//         target = iu.window.document.elementFromPoint(iu.window.innerWidth / 2, iu.window.innerHeight / 2);
//         console.log(target);
//         let domBody = iu.window.document.body
//         // console.log(domBody.contains(target));
//         if (target != null) {
//             let re: number[] = []
//             getRecord(domBody, target, re)
//             console.log(re);

//         }



//     }, 10000)

// }


const getRecord = (dom: Element, target: Element, r: number[]) => {
    if (dom.children.length != 0 && dom != target) {
        for (let index = 0; index < dom.children.length; index++) {
            const element = dom.children[index];
            if (element.contains(target)) {
                r.push(index)
                console.log(element);

                getRecord(element, target, r)
                break
            }
        }
    }

    // dom.children
}

onBeforeUnmount(() => {
    let target = iu.window.document.elementFromPoint(iu.window.innerWidth / 2, 30);
    let domBody = iu.window.document.body
    let r: number[] = [];
    for (let index = 0; index < store.rawxHtml.length; index++) {
        const element = store.rawxHtml[index];

        if (element?.link == location.value) {
            r.push(index)
            break
        }
    }

    console.log("location:", r);

    if (target != null) {
        getRecord(domBody, target, r)
        console.log(r);

        store.history = r
        store.storeLocal()
    }

    ipcRenderer.send('stopServer')
})

const reloadHistory = () => {
    if (store.history.length > 1) {
        setTimeout(() => {
            nextTick(() => {
                let target = <Element>iu?.window.document.body
                console.log(target);

                for (let index = 1; index < store.history.length; index++) {
                    target = target.children[store.history[index]]
                }
                // store.history[1]
                if (isPage.value) {
                    while (!target.getAttribute('pageID')) {
                        target = target.parentElement!
                    }

                    let id = target.getAttribute('pageID');
                    console.log("id", id);

                    (iu.window as any).changePageTo(parseInt(id!) - 1)
                } else (target.scrollIntoView());
            })
        }, 500)



    }
}

onMounted(() => {



    ipcRenderer.send('startServer', store.path);

    (window as any)._setMaxPageIndex = (m: number) => {

        MaxPageIndex.value = m
    }


    (window as any)._setCurrentPageIndex = (m: number) => {

        currentPage.value = m

    }


    const eStore = new ElectronStore()

    let ip = <boolean>eStore.get('isPage')

    isPage.value = ip ? ip : false

    iframeAdaptive()

    // store.clrear()

    let menuShow = false

    const i = document.getElementsByTagName('iframe')[0]



    document.getElementsByTagName('iframe')[0].onload = () => {

        progressBarShow.value = false
        if (!iu) {

            iu = new iframeUtils(i.contentWindow!)
            iu.isPage = isPage.value
            //i1 onload事件挂载不上去，退而求其次了
            iu.addEvent('unload', (e: Event) => {

                if (!userChange) {
                    iu.isPre = false
                }

                let oref = (<Document>(e?.target))?.URL;

                if (oref != i.contentWindow?.location.href) {
                    if (i.contentWindow != null) {
                        updataRef(i.contentWindow?.location.href)
                        newSectionReady()
                    }

                } else {
                    let w = setInterval(() => {

                        if (oref != i.contentWindow?.location.href) {
                            if (i.contentWindow != null) {
                                updataRef(i.contentWindow.location.href)
                                clearInterval(w)
                                newSectionReady()

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
                userChange = true

                if (menuShow) return

                const d = e.x / window.innerWidth
                if (d < 0.3) {
                    if (isPage.value) {
                        prePage()
                    } else preSection()
                } else if (d > 0.7) {
                    if (isPage.value) {
                        nextPage()
                    } else nextSection()
                };

            })


            iu.addEvent('contextmenu', (e) => {
                // menuShow = true
                e.preventDefault()
                ipcRenderer.send('contextMenu')
            })
        }


        iu.init()
        iu.isPage = isPage.value

    }

    ipcRenderer.on('menuClose', () => {
        menuShow = false
    })

    ipcRenderer.on('menuShow', () => {
        menuShow = true
    })

    ipcRenderer.on('hidToc', () => {
        tocShow.value = !tocShow.value
    })

    ipcRenderer.on('nextPage', () => {
        // console.log(1);

        userChange = true
        if (isPage.value) {
            nextPage()
        } else nextSection()

    })
    ipcRenderer.on('prePage', () => {
        userChange = true
        if (isPage.value) {
            prePage()
        } else preSection()
    })

    ipcRenderer.on('next', () => {
        nextSection()

    })
    ipcRenderer.on('pre', () => {
        preSection()
    })




    ipcRenderer.on('text', (_, p) => {
        if (p[1] && p[1] != '.') {
            ipcRenderer.send('filePath', p[1])
        }

        iframeAdaptive()
    })

    if (store.history.length != 0) {
        location.value = store.rawxHtml[store.history[0]].link
        reloadHistory()
    } else location.value = store.rawxHtml[0].link



    window.addEventListener('resize', iframeAdaptive)


    s.value = true
})



</script>
<style scoped>
.reader {
    width: 100vw;
    height: 100vh;
    /* background-color: aqua; */
    overflow: hidden;
}

.toc::-webkit-scrollbar {
    display: none;
}
</style>

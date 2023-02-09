import {
    createRouter,
    createWebHashHistory,
    RouteRecordRaw
} from "vue-router";
import editCssVue from "../view/editCss.vue";
import bookReaderVue from '../view/bookReader.vue'
const routes: Array<RouteRecordRaw> = [{
    path: '/',
    component: bookReaderVue
}, {
    path: '/editCss',
    component: editCssVue
}
]
const router = createRouter({
    routes,
    history: createWebHashHistory()
})

export default router
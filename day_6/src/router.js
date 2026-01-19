import {createRouter, createWebHashHistory} from 'vue-router'

import HomeView from '../src/components/Home.vue'
import AboutUsView from '../src/components/AboutUs.vue'

const routes = [
    {path: '/', component: HomeView},
    {path: '/about-us', component: AboutUsView},
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router
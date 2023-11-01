import { createRouter, createWebHistory } from 'vue-router';

import HomePage from './pages/HomePage.vue';
import SinglePage from './pages/SinglePage.vue'
import SearchPage from './pages/SearchPage.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomePage
        },
        {
            path: '/register',
            name: 'register',
            //component: RegisterPage
        },
        {
            path: '/login',
            name: 'login',
            // component: LoginPage
        },
        {
            // path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound
        },
        {
            path: '/singleApt/:id',
            name: 'singleApt',
            component: SinglePage
        },
        {
            path: '/search',
            name: 'search',
            component: SearchPage
        },
    ]
});

export { router };
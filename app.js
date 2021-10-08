const routes = [
    { path: '/home', component: home },
    { path: '/products', component: products }
]

const router = new VueRouter({
    routes
})

const app = new Vue({
    router
}).$mount('#app')
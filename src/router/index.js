import Vue from 'vue'
import Router from 'vue-router'
const DashboardLayout = () => import( /* webpackChunkName: "dashboard" */ '../components/dashboardLayout.vue')
const LoginPage = () => import( /* webpackChunkName: "loginpage" */ '../components/LoginPage.vue')


function loadView(view) {
    return () => import(
        /* webpackChunkName: "view-
            [request]" */
        `../components/dashboardContents/${view}.vue`)
}

function AuthenticatedUser() {
    if (localStorage.getItem('token') == null) {
        return true;
    }
}

const routes = [
    {
        path: '/dashboard/',
        component: DashboardLayout,
        children: [{
                name: 'UserController',
                path: 'user',
                component: loadView('userController'),
                beforeEnter(to, from, next) {
                    if (!AuthenticatedUser()) {
                        next();
                    } else {
                        next('/');
                        alert('LOGIN FIRST!');
                    }
                }
            },
            {
                name: 'ServiceController',
                path: 'service',
                component: loadView('serviceController'),
                beforeEnter(to, from, next) {
                    if (!AuthenticatedUser()) {
                        next();
                    } else {
                        next('/');
                        alert('LOGIN FIRST!');
                    }
                }
            },
        ],
        beforeEnter(to, from, next) {
            if (!AuthenticatedUser()) {
                next();
            } else {
                next('/');
                alert('LOGIN FIRST!');
            }
        }
    },
    {
        path: '/',
        name: 'loginController',
        component: LoginPage,
    }
]

Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: routes
})

export default router
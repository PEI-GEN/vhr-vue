import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import Home from './views/Home.vue'
import FriendChat from './views/chat/FriendChat.vue'
import EmpAdv from './views/emp/EmpAdv.vue'
import HrInfo from './views/HrInfo.vue'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Login',
            component: Login,
            hidden: true
        }, {
            path: '/home',
            name: 'Home',
            component: Home,
            hidden: true,
            meta: {
                roles: ['admin', 'user']
            },
            children: [
                {
                    path: '/chat',
                    name: '在线聊天',
                    component: FriendChat,
                    hidden: true
                }, {
                    path: '/hrinfo',
                    name: '个人中心',
                    component: HrInfo,
                    hidden: true
                }
            ]
        }
        // , {
        //     path: '*',
        //     redirect: '/home'
        // }
    ]
})

// const routes = [
//     { path: '/', redirect: '/login' },
//     { path: '/login', component: Login },
//     {
//         path: '/home',
//         component: Home,
//         children: [{ path: '/chat', component: FriendChat }]
//     }
//     // ,{
//     //     path: '/emp/adv',
//     //     name: '高级资料',
//     //     component: EmpAdv
//     // }
// ]
//
// const router = new Router({
//     routes
// })
//
// export default router

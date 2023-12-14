<template>
    <div>
        <el-container>
            <el-header class="homeHeader">
                <a @click="drawer = true" class="menus"><i class="el-icon-s-unfold"></i>系统菜单</a>
                <el-drawer class="my-drawer"
                        :withHeader="false"
                        :visible.sync="drawer"
                        :direction="direction"
                        :modal="false"
                        :show-close="false"
                        size="15%"
                        withHeader="false"
                >

                    <el-menu @select="handleMenuSelect">
                        <el-submenu index="1">
                            <template slot="title"><i class="el-icon-user-solid"></i>员工资料</template>
                            <el-menu-item index="1-1" >基本资料</el-menu-item>
                            <el-menu-item index="1-2" >高级资料</el-menu-item>
                        </el-submenu>

                        <el-divider class="my-divider"></el-divider>

                        <el-submenu index="2">
                            <template slot="title"><i class="el-icon-s-check"></i>人事管理</template>
                            <el-menu-item class="my-menu-item" index="2-1">员工资料</el-menu-item>
                            <el-divider class="my-divider2"></el-divider>
                            <el-menu-item index="2-2">员工奖惩</el-menu-item>
                            <el-divider class="my-divider2"></el-divider>
                            <el-menu-item index="2-3">员工培训</el-menu-item>
                            <el-divider class="my-divider2"></el-divider>
                            <el-menu-item index="2-4">员工调薪</el-menu-item>
                            <el-divider class="my-divider2"></el-divider>
                            <el-menu-item index="2-5">员工调动</el-menu-item>
                            <el-divider class="my-divider2"></el-divider>
                        </el-submenu>

                        <el-divider class="my-divider"></el-divider>

                        <el-submenu index="3">
                            <template slot="title"><i class="el-icon-medal"></i>薪资管理</template>
                            <el-menu-item index="3-1">工资账套管理</el-menu-item>
                            <el-menu-item index="3-2">员工账套设置</el-menu-item>
                            <el-menu-item index="3-3">工资表管理</el-menu-item>
<!--                            <el-menu-item index="3-4">月末处理</el-menu-item>-->
                            <el-menu-item index="3-5">工资表查询</el-menu-item>
                        </el-submenu>

                        <el-divider class="my-divider"></el-divider>

                        <el-submenu index="4">
                            <template slot="title"><i class="el-icon-tickets"></i>统计管理</template>
                            <el-menu-item index="4-1">综合信息统计</el-menu-item>
                            <el-menu-item index="4-2">员工积分统计</el-menu-item>
                            <el-menu-item index="4-3">人事信息统计</el-menu-item>
                            <el-menu-item index="4-4">人事记录统计</el-menu-item>
                        </el-submenu>

                        <el-divider class="my-divider"></el-divider>

                        <el-submenu index="5">
                            <template slot="title"><i class="el-icon-setting"></i>系统管理</template>
                            <el-menu-item index="5-1">基础信息设置</el-menu-item>
                            <el-menu-item index="5-2">系统管理</el-menu-item>
                            <el-menu-item index="5-3">操作日志管理</el-menu-item>
                            <el-menu-item index="5-4">操作员管理</el-menu-item>
                            <el-menu-item index="5-5">备份恢复数据库</el-menu-item>
                            <el-menu-item index="5-6">初始化数据库</el-menu-item>
                        </el-submenu>


                    </el-menu>
                </el-drawer>

<!--                图片标题-->
                <a href="#/home" class="title"><img src="../../public/img/tubiao.png"></a>

                <div style="position: absolute;right: 10px;">
                    <el-button icon="el-icon-chat-dot-square" type="text" style="margin-right: 8px;color: #000000;" size="normal" @click="goChat">chat</el-button>
                    <el-divider direction="vertical"></el-divider>
                    <el-dropdown class="userInfo" @command="commandHandler">
                  <span class="el-dropdown-link">
                    您好，{{user.name}}
            <!--      <i><img :src="user.userface" alt=""></i>-->
              </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="userinfo">个人信息</el-dropdown-item>
<!--                            <el-dropdown-item command="setting">设置</el-dropdown-item>-->
                            <el-dropdown-item command="logout" divided>注销登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </el-header>
            <el-container>
<!--                <el-aside width="200px">-->
<!--                    <el-menu router unique-opened>-->
<!--                        <el-submenu :index="index+''" v-for="(item,index) in routes" v-if="!item.hidden" :key="index">-->
<!--                            <template slot="title">-->
<!--                                <i style="color: #409eff;margin-right: 5px" :class="item.iconCls"></i>-->
<!--                                <span>{{item.name}}</span>-->
<!--                            </template>-->
<!--                            <el-menu-item :index="child.path" v-for="(child,indexj) in item.children" :key="indexj">-->
<!--                                {{child.name}}-->
<!--                            </el-menu-item>-->
<!--                        </el-submenu>-->
<!--                    </el-menu>-->
<!--                </el-aside>-->
                <el-main>
                    <el-breadcrumb separator-class="el-icon-arrow-right" v-if="this.$router.currentRoute.path!='/home'" style="border-bottom: 1px solid #ebebeb;height: 20px">
                        <el-breadcrumb-item><a @click="openDrawer">菜单</a></el-breadcrumb-item>
                        <el-breadcrumb-item>{{this.$router.currentRoute.name}}</el-breadcrumb-item>

                        <div style="display: flex; align-items: center; justify-content: center;">
                            <span style="font-size: 13px;color: #3d3c3c">已打开页面：</span>

                            <el-tag
                                    size="mini"
                                    v-for="tag in $store.state.tags"
                                    :key="tag.path"
                                    closable
                                    @close="handleTagClose(tag)"
                                    @click="handleTagClick(tag)"
                                    :class="[ 'custom-tag', { 'is-selected': tag === selectedTag } ]"
                            >
                                {{ tag.name }}
                            </el-tag>
                        </div>

                    </el-breadcrumb>


                    <div class="homeWelcome" v-if="this.$router.currentRoute.path=='/home'">
                        欢迎来到微人事！
                    </div>
                    <router-view class="homeRouterView"/>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    export default {
        name: "Home",
        data() {
            return {
                // user: JSON.parse(window.sessionStorage.getItem("user"))
                drawer: false,
                direction: "ltr",
                selectedTag: null
            }
        },
        computed: {
            routes() {
                return this.$store.state.routes;
            },
            user() {
                return this.$store.state.currentHr;
            }
        },
        created() {
            console.log("home的created")
            const tags = localStorage.getItem('tags');
            if (tags) {
                this.$store.commit('setTags', JSON.parse(tags));
            }
        },
        methods: {
            goChat() {
                this.$router.push("/chat");
            },
            commandHandler(cmd) {
                if (cmd == 'logout') {
                    this.$confirm('此操作将注销登录, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.getRequest("/logout");
                        window.sessionStorage.removeItem("user")
                        this.$store.commit('initRoutes', []);
                        this.$router.replace("/");
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消操作'
                        });
                    });
                }else if (cmd == 'userinfo') {
                    this.$router.push('/hrinfo');
                }else if (cmd == 'setting') {
                    this.$router.push('/hrinfo').then(()=>{
                        this.showUpdatePasswdView();
                    });
                }
            },
            handleMenuSelect(index) {
                // 根据菜单项的 index 值进行路由跳转
                let tag = {};
                switch (index) {
                    case '1-1':
                        this.$router.push('/emp/basic');
                        tag = {
                            name: '基本资料',
                            path: '/emp/basic'
                        };
                        this.selectedTag = tag;
                        this.handleTagClick(tag);
                        this.$store.commit('addTag', tag);
                        break;
                    case '1-2':
                        console.log('/emp/adv')
                        this.$router.push('/emp/adv');
                        tag = {
                            name: '高级资料',
                            path: '/emp/adv'
                        };
                        this.selectedTag = tag;
                        this.handleTagClick(tag);
                        this.$store.commit('addTag', tag);
                        break;
                    case '2-1':
                        this.$router.push('/per/emp');
                        tag = {
                            name: '员工资料',
                            path: '/per/emp'
                        };
                        this.selectedTag = tag;
                        this.handleTagClick(tag);
                        this.$store.commit('addTag', tag);
                        break;
                    case '2-2':
                        this.$router.push('/per/ec');
                        tag = {
                            name: '员工奖惩',
                            path: '/per/ec'
                        };
                        this.selectedTag = tag;
                        this.handleTagClick(tag);
                        this.$store.commit('addTag', tag);
                        break;
                    case '2-3':
                        this.$router.push('/per/train');
                        tag = {
                            name: '员工培训',
                            path: '/per/train'
                        };
                        this.selectedTag = tag;
                        this.handleTagClick(tag);
                        this.$store.commit('addTag', tag);
                        break;
                    case '2-4':
                        this.$router.push('/per/salary');
                        tag = {
                            name: '员工调薪',
                            path: '/per/salary'
                        };
                        this.selectedTag = tag;
                        this.handleTagClick(tag);
                        this.$store.commit('addTag', tag);
                        break;
                    case '2-5':
                        this.$router.push('/per/mv');
                        tag = {
                            name: '员工调动',
                            path: '/per/mv'
                        };
                        this.selectedTag = tag;
                        this.handleTagClick(tag);
                        this.$store.commit('addTag', tag);
                        break;
                    case '3-1':
                        this.$router.push('/sal/sob');
                        tag = {
                            name: '工资账套管理',
                            path: '/sal/sob'
                        };
                        this.selectedTag = tag;
                        this.handleTagClick(tag);
                        this.$store.commit('addTag', tag);
                        break;
                    case '3-2':
                        this.$router.push('/sal/sobcfg');
                        tag = {
                            name: '员工账套设置',
                            path: '/sal/sobcfg'
                        };
                        this.selectedTag = tag;
                        this.handleTagClick(tag);
                        this.$store.commit('addTag', tag);
                        break;
                    case '3-3':
                        this.$router.push('/sal/table');
                        tag = {
                            name: '工资表管理',
                            path: '/sal/table'
                        };
                        this.selectedTag = tag;
                        this.handleTagClick(tag);
                        this.$store.commit('addTag', tag);
                        break;
                    case '3-4':
                        this.$router.push('/sal/month');
                        tag = {
                            name: '月末处理',
                            path: '/sal/month'
                        };
                        this.selectedTag = tag;
                        this.handleTagClick(tag);
                        this.$store.commit('addTag', tag);
                        break;
                    case '3-5':
                        this.$router.push('/sal/search');
                        tag = {
                            name: '工资表查询',
                            path: '/sal/search'
                        };
                        this.selectedTag = tag;
                        this.handleTagClick(tag);
                        this.$store.commit('addTag', tag);
                        break;
                    case '4-1':
                        this.$router.push('/sta/all');
                        tag = {
                            name: '综合信息统计',
                            path: '/sta/all'
                        };
                        this.selectedTag = tag;
                        this.handleTagClick(tag);
                        this.$store.commit('addTag', tag);
                        break;
                    case '4-2':
                        this.$router.push('/sta/score');
                        tag = {
                            name: '员工积分统计',
                            path: '/sta/score'
                        };
                        this.selectedTag = tag;
                        this.handleTagClick(tag);
                        this.$store.commit('addTag', tag);
                        break;
                    case '4-3':
                        this.$router.push('/sta/pers');
                        tag = {
                            name: '人事信息统计',
                            path: '/sta/pers'
                        };
                        this.selectedTag = tag;
                        this.handleTagClick(tag);
                        this.$store.commit('addTag', tag);
                        break;
                    case '4-4':
                        this.$router.push('/sta/record');
                        tag = {
                            name: '人事记录统计',
                            path: '/sta/record'
                        };
                        this.selectedTag = tag;
                        this.handleTagClick(tag);
                        this.$store.commit('addTag', tag);
                        break;
                    case '5-1':
                        this.$router.push('/sys/basic');
                        tag = {
                            name: '基础信息设置',
                            path: '/sys/basic'
                        };
                        this.selectedTag = tag;
                        this.handleTagClick(tag);
                        this.$store.commit('addTag', tag);
                        break;
                    case '5-2':
                        this.$router.push('/sys/cfg');
                        tag = {
                            name: '系统管理',
                            path: '/sys/cfg'
                        };
                        this.selectedTag = tag;
                        this.handleTagClick(tag);
                        this.$store.commit('addTag', tag);
                        break;
                    case '5-3':
                        this.$router.push('/sys/log');
                        tag = {
                            name: '操作日志管理',
                            path: '/sys/log'
                        };
                        this.selectedTag = tag;
                        this.handleTagClick(tag);
                        this.$store.commit('addTag', tag);
                        break;
                    case '5-4':
                        this.$router.push('/sys/hr');
                        tag = {
                            name: '操作员管理',
                            path: '/sys/hr'
                        };
                        this.selectedTag = tag;
                        this.handleTagClick(tag);
                        this.$store.commit('addTag', tag);
                        break;
                    case '5-5':
                        this.$router.push('/sys/data');
                        tag = {
                            name: '备份恢复数据库',
                            path: '/sys/data'
                        };
                        this.selectedTag = tag;
                        this.handleTagClick(tag);
                        this.$store.commit('addTag', tag);
                        break;
                    case '5-6':
                        this.$router.push('/sys/init');
                        tag = {
                            name: '初始化数据库',
                            path: '/sys/init'
                        };
                        this.selectedTag = tag;
                        this.handleTagClick(tag);
                        this.$store.commit('addTag', tag);
                        break;
                    default:
                        break;
                }
                // 关闭抽屉
                this.drawer = false;
            },
            openDrawer() {
                this.drawer = true; // 打开抽屉
            },
            handleTagClick(tag) {
                this.$router.push(tag.path);
                this.selectedTag = tag;

                // 更新本地存储
                localStorage.setItem('tags', JSON.stringify(this.$store.state.tags));
            },
            handleTagClose(tag) {
                // this.$store.commit('removeTag', tag);
                const tags = this.$store.state.tags;

                if (tags.length > 1) { // 至少要保留一个标签
                    const index = tags.findIndex(t => t.path === tag.path);

                    if (index > 0) {
                        const prevTag = tags[index - 1];
                        if(this.selectedTag===tag){
                            this.selectedTag = prevTag;
                            this.$router.push(prevTag.path); // 跳转到前一个标签
                        }

                        // 删除当前标签
                        this.$store.commit('removeTag', tag);

                        // 更新本地存储
                        localStorage.setItem('tags', JSON.stringify(this.$store.state.tags));
                    } else {
                        alert('第一个标签不能删除');
                    }
                } else {
                    alert('至少要保留一个标签');
                }
            }
        }
    }
</script>

<style>
    .scrollbar {
        height: 100%;
    }

    .scroll-container {
        height: 100%;
        overflow-y: auto;
    }

    .custom-tag.is-selected {
        color: #F22B2E !important;
    }

    .el-tag {
        /*display: flex !important;*/
        justify-content: center !important;
        background-color: transparent !important; /* 设置背景色为透明 */
        border: none !important; /* 去除边框样式 */
        color: #3d3c3c !important; /* 设置文本颜色 */
        cursor: pointer; /* 鼠标移上去显示指针 */
    }

    .el-drawer.ltr {
        top: 50px !important;
        height: 1500px !important;
    }

    .el-drawer__header {
        font-size: 20px;
        color: red !important;
        margin-bottom: 0px !important;

    }

    .my-divider.el-divider--horizontal {
        height: 1px;
        background-color: #ebeef5;
        margin: 3px 0;
    }

    .my-divider2.el-divider--horizontal {
        height: 1px;
        background-color: #ebeef5;
        margin: 0px 0;
    }

    .el-menu-item {
        font-size: 12px !important;
        padding-left: 30% !important;
    }

    .menus {
        color: #ff4040;
        text-decoration: none;
    }

    .homeRouterView {
        margin-top: 10px;
    }

    .homeWelcome {
        text-align: center;
        font-size: 30px;
        font-family: 华文行楷;
        color: #000000;
        padding-top: 50px;
    }

    .homeHeader {
        background-color: #ffffff;
        display: flex;
        align-items: center;
        justify-content: normal;
        padding: 0px 15px;
        box-sizing: border-box;
        border: 1px #c6c6c6; /* 添加边框 */
        /*border-radius: 5px;*/
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        height: 50px !important; /* 设置高度 */
    }

    .homeHeader .title {
        padding-left: 3px;
        text-decoration: none;
        font-size: 18px;
        /*font-family: 华文行楷;*/
        color: #000000
    }

    .homeHeader .userInfo {
        cursor: pointer;
    }

    .el-dropdown-link img {
        width: 48px;
        height: 48px;
        border-radius: 24px;
        margin-left: 8px;
    }

    .el-dropdown-link {
        display: flex;
        align-items: center;
    }
</style>

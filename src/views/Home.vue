<template>
    <div style="height: 100%">
        <el-container style="height: 100%">
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

                    <el-menu class="caidan" @select="handleMenuSelect">
                        <el-submenu index="1">
                            <template slot="title"><i class="el-icon-user-solid"></i>员工资料</template>
                            <el-menu-item index="1-1" >基本资料</el-menu-item>
                            <el-menu-item index="1-2" >高级资料</el-menu-item>
                        </el-submenu>

                        <el-divider class="my-divider"></el-divider>

                        <el-submenu index="2">
                            <template slot="title"><i class="el-icon-s-check"></i>人事管理</template>
<!--                            <el-menu-item class="my-menu-item" index="2-1">员工资料</el-menu-item>-->
<!--                            <el-divider class="my-divider2"></el-divider>-->
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
<!--                            <el-menu-item index="5-6">初始化数据库</el-menu-item>-->
                        </el-submenu>


                    </el-menu>
                </el-drawer>

<!--                图片标题-->
                <a href="#/home" class="title"><img src="../../public/img/p2.png" style="height: 50px;width: auto;padding-left: 10px"></a>

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


                    <div style="height: 100%" v-if="this.$router.currentRoute.path=='/home'">
<!--                        <div class="homeWelcome">-->
<!--                            欢迎来到人力资源管理系统！-->
<!--&lt;!&ndash;                            <el-carousel :interval="4000" type="card" height="350px">&ndash;&gt;-->
<!--&lt;!&ndash;                                <el-carousel-item v-for="item in imageUrl" :key="item">&ndash;&gt;-->
<!--&lt;!&ndash;                                    <img :src="item.url" alt="" style="max-width: 100%;"/>&ndash;&gt;-->
<!--&lt;!&ndash;                                </el-carousel-item>&ndash;&gt;-->
<!--&lt;!&ndash;                            </el-carousel>&ndash;&gt;-->
<!--                        </div>-->

<!--                        日历组件-->
                        <div class="flex-container" style="display: flex;flex-wrap: wrap;height: 100%;width: 100%">
<!--                            工作台-->
                            <div class="left">
                                <div style="height: 31%">
                                    <el-card class="user-card" shadow="hover">
                                        <div slot="header" class="clearfix">
                                            <span style="font-size: 25px;font-family: 黑体;font-weight: 700;"><span><i class="el-icon-d-caret" style="color: #ff4442"></i>工作台</span></span>
                                        </div>
                                        <el-row :gutter="20">
                                            <el-col class="card1" :span="11">
                                                <i class="card1-text">姓名：</i>{{ userProfile.name }}
                                            </el-col>
                                            <el-col class="card1" style="margin-left: 5%"  :span="11">
                                                <i class="card1-text">工号：</i>{{ userProfile.employeeId }}
                                            </el-col>
                                            <el-col class="card1":span="11">
                                                <i class="card1-text">部门：</i>{{ userProfile.department }}
                                            </el-col>
                                            <el-col class="card1" style="margin-left: 5%"  :span="11">
                                                <i class="card1-text">职位：</i>{{ userProfile.position }}
                                            </el-col>
                                            <el-col class="card1" :span="11">
                                                <i class="card1-text">入职时间：</i>{{ userProfile.entryDate }}
                                            </el-col>
                                        </el-row>
                                    </el-card>
                                </div>

    <!--                            职位管理-->
                                <div style="height: 31%;padding-top: 3%;">
                                    <el-card class="user-card" shadow="hover">
                                        <div slot="header" class="clearfix">
                                            <span style="font-size: 25px;font-family: 黑体;font-weight: 700;"><span><i class="el-icon-d-caret" style="color: #ff4442"></i>人员管理</span></span>
                                        </div>
                                        <div class="card2-container">
                                            <div class="card2">
                                                <h2 style="color: red">23(个)</h2>
                                                <h2>编内员工</h2>
                                            </div>
                                            <div class="card22">
                                                <h2 style="color: red">15(个)</h2>
                                                <h2>外包员工</h2>
                                            </div>
                                            <div class="card22">
                                                <h2 style="color: red">4(个)</h2>
                                                <h2>试用期员工</h2>
                                            </div>
                                            <div class="card2">
                                                <h2 style="color: red">18(个)</h2>
                                                <h2>退休员工</h2>
                                            </div>
                                        </div>

                                    </el-card>
                                </div>

                                <div style="height: 31%;padding-top: 3%;">
                                    <el-card class="user-card" shadow="hover">
                                        <div slot="header" class="clearfix">
                                            <span style="font-size: 25px;font-family: 黑体;font-weight: 700;"><span><i class="el-icon-d-caret" style="color: #ff4442"></i>岗位管理</span></span>
                                        </div>
                                        <div class="notification">
                                            <div class="notiglow"></div>
                                            <div class="notiborderglow"></div>
                                            <div class="notititle" style="color: #5B89FE;">总岗位数：58个</div>
                                        </div>
                                        <div class="notification">
                                            <div class="notiglow"></div>
                                            <div class="notiborderglow"></div>
                                            <div class="notititle" style="color: #55DEB9">编内岗位数：32个</div>
                                        </div>
                                        <div class="notification">
                                            <div class="notiglow"></div>
                                            <div class="notiborderglow"></div>
                                            <div class="notititle">外包岗位数：26个</div>
                                        </div>
                                    </el-card>
                                </div>
                            </div>


<!--                             消息通知-->
                            <div class="right">
                                <div style="height: 47%">
                                    <el-card class="user-card" shadow="hover">
                                        <div slot="header" class="clearfix">
                                            <span style="font-size: 25px;font-family: 黑体;font-weight: 700;"><span><i class="el-icon-d-caret" style="color: #ff4442"></i>消息通知</span></span>
                                        </div>

                                        <!-- 消息通知区域 -->
                                        <div class="notification-content">
                                            <!-- 第一条消息 -->
                                            <div class="notification-item">
                                                <h3 class="notification-title">您有新的消息!人事部门发布了新的员工手册</h3>
                                                <p class="notification-message">这是关于公司最新的员工手册,包含了员工行为准则、福利政策等重要信息。</p>
                                            </div>
                                            <!-- 第二条消息 -->
                                            <div class="notification-item">
                                                <h3 class="notification-title">您有新的消息!财务部门提醒您及时提交报销单</h3>
                                                <p class="notification-message">本月的报销单提交截止日期为下周五,请您及时填写并提交给财务部门。</p>
                                            </div>
                                            <div class="notification-item">
                                                <h3 class="notification-title">您有新的消息!行政部门通知办公区域将进行维修</h3>
                                                <p class="notification-message">下周一至周三,办公区域将进行电路维修,期间可能会有短暂停电,请提前做好准备。</p>
                                            </div>
                                            <div class="notification-item">
                                                <h3 class="notification-title">您有新的消息!人力资源部门发布了最新的招聘计划</h3>
                                                <p class="notification-message">公司计划在下个季度招聘10名软件工程师和5名市场营销专员,请各部门提供人员需求。</p>
                                            </div>
                                            <div class="notification-item">
                                                <h3 class="notification-title">您有新的消息!技术部门发布了新的代码规范</h3>
                                                <p class="notification-message">为了提高代码质量和可维护性,技术部门制定了新的代码规范,请所有开发人员仔细阅读并遵守。</p>
                                            </div>
                                            <div class="notification-item">
                                                <h3 class="notification-title">您有新的消息!销售部门分享了上个月的销售业绩</h3>
                                                <p class="notification-message">上个月,销售部门超额完成了销售目标,其中王刚和李娜两位同事的业绩尤为突出。</p>
                                            </div>
                                            <div class="notification-item">
                                                <h3 class="notification-title">您有新的消息!培训部门发布了新的培训计划</h3>
                                                <p class="notification-message">下个月,公司将开展一系列技能培训,包括项目管理、客户服务、领导力等,请感兴趣的员工报名参加。</p>
                                            </div>
                                            <div class="notification-item">
                                                <h3 class="notification-title">您有新的消息!行政部门提醒您及时更新个人信息</h3>
                                                <p class="notification-message">为了保证公司员工信息的准确性,请所有员工在本周内登录系统,检查并更新自己的个人信息。</p>
                                            </div>
                                        </div>
                                    </el-card>
                                </div>

                                <div style="height: 48%;padding-top: 3%;">
                                    <el-card class="user-card" shadow="hover">
                                        <div slot="header" class="clearfix">
                                            <span style="font-size: 25px;font-family: 黑体;font-weight: 700;"><span><i class="el-icon-d-caret" style="color: #ff4442"></i>招聘动态</span></span>
                                        </div>
                                        <div class="zhaoping-content">
                                            <div class="zhaoping-card">
                                                <p>正在招聘职位</p>
                                                <p><span class="job-count">5</span> 人</p>
                                            </div>
                                            <div class="zhaoping-card">
                                                <p>评选中</p>
                                                <p><span class="job-count">59</span> 人</p>
                                            </div>
                                            <div class="zhaoping-card">
                                                <p>待入职</p>
                                                <p><span class="job-count">2</span> 人</p>
                                            </div>
                                            <div class="zhaoping-card">
                                                <p>已入职</p>
                                                <p><span class="job-count">1</span> 人</p>
                                            </div>
                                        </div>

                                    </el-card>
                                </div>
                            </div>

<!--                            日历-->
<!--                            <div class="calendar-container">-->
<!--                                <el-calendar v-model="value">-->
<!--                                </el-calendar>-->
<!--                            </div>-->
                        </div>

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
                selectedTag: null,
                imageUrl: [
                    { url: "../../img/DSC00427.jpg" },
                    { url: "../../img/DSC00589.jpg" },
                    { url: "../../img/DSC00742.jpg" },
                    { url: "../../img/DSC01075.jpg" }
                ],
                value: new Date(),
                userProfile: {
                    name: '',
                    employeeId: '',
                    department: '系统管理部门',
                    position: '管理员',
                    entryDate: '2022-01-01'
                }
            }
        },
        mounted() {
            this.getUserProfile();
        },
        computed: {
            routes() {
                return this.$store.state.routes;
            },
            user() {
                // console(this.$store.state.currentHr);
                return this.$store.state.currentHr;
            }
        },
        created() {
            // const tags = localStorage.getItem('tags');
            // if (tags) {
            //     this.tags = JSON.parse(tags);
            // }
            this.tags=this.getTagsFromCookie();
        },
        methods: {
            getUserProfile() {
                // 调用后端接口获取用户信息
                // 假设我们有一个getUserInfo的API方法
                // this.getRequest('/userinfo/positions').then(resp => {
                //     if (resp) {
                //         this.userProfile = resp;
                //     }
                // })
                // this.getRequest('/hr/info').then(resp => {
                //     if (resp) {
                //         this.hr = resp;
                //         this.hr2 = Object.assign({}, this.hr);
                //         window.sessionStorage.setItem("user", JSON.stringify(resp));
                //         this.$store.commit('INIT_CURRENTHR', resp);
                //     }
                // })
                console.log(window.sessionStorage.getItem("user"))
                var userObject = JSON.parse(window.sessionStorage.getItem("user"));
                this.userProfile.name=userObject.name;
                this.userProfile.employeeId=userObject.id;

            },
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

                this.saveTagsToCookie(this.tags);

                // 更新本地存储
                // const tags = JSON.stringify(this.tags);
                // localStorage.setItem('tags', tags);
            },
            handleTagClose(tag) {
                // this.$store.commit('removeTag', tag);
                const tags = this.$store.state.tags;

                if (tags.length > 1) { // 至少要保留一个标签
                    const index = tags.findIndex(t => t.path === tag.path);

                    if (index >= 0) {
                        const prevTag = tags[index - 1];
                        if(this.selectedTag===tag){
                            this.selectedTag = prevTag;
                            this.$router.push(prevTag.path); // 跳转到前一个标签
                        }

                        // 删除当前标签
                        this.$store.commit('removeTag', tag);

                        // 更新本地存储
                        // localStorage.setItem('tags', this.tags);
                    } else {
                        alert('最后一个标签不能删除');
                    }
                } else {
                    alert('至少要保留一个标签');
                }
            },
            saveTagsToCookie(tags) {
                const cookieValue = JSON.stringify(tags);
                document.cookie = `tags=${cookieValue}; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/`;
            },
            getTagsFromCookie() {
                const name = 'tags=';
                const decodedCookie = decodeURIComponent(document.cookie);
                const cookieArray = decodedCookie.split(';');

                for (let i = 0; i < cookieArray.length; i++) {
                    let cookie = cookieArray[i];
                    while (cookie.charAt(0) === ' ') {
                        cookie = cookie.substring(1);
                    }
                    if (cookie.indexOf(name) === 0) {
                        const cookieValue = cookie.substring(name.length, cookie.length);
                        return JSON.parse(cookieValue);
                    }
                }

                return [];
            }
        }
    }
</script>

<style>
    html, body {
        height: 100%;
    }

    .zhaoping-content {
        height: 100%;
        display: flex;
        flex-direction: row; /* 默认值，通常可以省略 */
        justify-content: space-around; /* 这会在卡片之间添加一些间隔，你可以根据需要调整 */
        flex-wrap: wrap; /* 如果需要，这可以让卡片在不够空间的情况下换行 */
    }

    .zhaoping-card {
        display: flex;
        flex-direction: column; /* 设置Flexbox方向为垂直 */
        justify-content: center; /* 垂直居中 */
        align-items: center; /* 水平居中 */
        width: 45%;
        height: 50%;
        background: rgba(75, 136, 253,0.01);
        border-radius: 50px;
        box-shadow: rgba(0, 0, 0, 0.01) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.03) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.01) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(255, 68, 66, 0.09) 0px 4px 2px, rgba(255, 68, 66, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;
    }

    .zhaoping-card p {
        margin: 0; /* 移除默认的外边距 */
        text-align: center; /* 确保文字水平居中 */
        width: 100%; /* 让 <p> 标签占满整个容器宽度 */
        font-size: 25px;
    }

    .job-count {
        color: red; /* 将数字0的颜色设置为红色 */
    }

    .notification-content .el-card .el-card__body {
        height: 100%;
    }

    .notification-content {
        max-height: 100%; /* 设置最大高度，确保内容可滚动 */
        /*padding: 10px 0; !* 添加上下内边距 *!*/
        overflow-y: auto; /* 当内容超出最大高度时显示滚动条 */
        padding-bottom: 1px;
    }

    .notification-item {
        border-bottom: 1px solid #ebebeb; /* 添加底部边框作为分隔线 */
        padding-bottom: 15px; /* 调整底部内边距，以便分隔线和文本之间有空间 */
        margin-bottom: 15px; /* 保持原有的底部间距 */
    }

    .notification-title {
        font-size: 16px;
        font-weight: bold;
        margin: 0 0 5px 0;
    }

    .notification-message {
        font-size: 14px;
        margin: 0;
        opacity: 0.75; /* 设置文字透明度 */
    }

    /* 最后一条消息没有底部间距 */
    .notification-item:last-child {
        border-bottom: none; /* 最后一项不显示分隔线 */
        padding-bottom: 0; /* 最后一项不需要底部内边距 */
    }

    /* 自定义滚动条的整体样式 */
    ::-webkit-scrollbar {
        width: 8px; /* 设置滚动条的宽度 */
        background-color: #F5F5F5; /* 设置滚动条的背景颜色 */
    }

    /* 滚动条滑块的样式 */
    ::-webkit-scrollbar-thumb {
        border-radius: 4px; /* 设置滑块的圆角 */
        background-color: #ff4442; /* 设置滑块的颜色，可调整为网站主题颜色 */
        border: 2px solid #F5F5F5; /* 设置滑块边框和背景颜色相同，创建“边距”效果 */
        opacity: 0.5;
    }

    /* 滚动条轨道的样式 */
    ::-webkit-scrollbar-track {
        border-radius: 4px; /* 设置轨道的圆角 */
        box-shadow: inset 0 0 5px rgba(0,0,0,0.2); /* 在轨道内添加阴影，增加深度感 */
        background-color: #F5F5F5; /* 设置轨道的背景颜色 */
    }


    .notification {
        display: flex;
        flex-direction: column;
        justify-content: center; /* 增加此行以垂直居中 */
        align-items: center; /* 增加此行以水平居中 */
        isolation: isolate;
        position: relative;
        width: 95%;
        height: 30%;
        background: #ffacac;
        border-radius: 1rem;
        overflow: hidden;
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        font-size: 16px;
        --gradient: linear-gradient(to bottom, #fd134a, #af1414, #4b0505);
        --color: #e23136;
        margin-bottom: 1%;
    }

    .notification:before {
        position: absolute;
        content: "";
        inset: 0.0625rem;
        border-radius: 0.9375rem;
        background: #ffffff;
        z-index: 2
    }

    .notification:after {
        position: absolute;
        content: "";
        width: 2.25rem;
        inset: 0.65rem auto 0.65rem 0.5rem;
        border-radius: 8.125rem;
        background: var(--gradient);
        transition: transform 300ms ease;
        z-index: 4;
    }

    .notification:hover:after {
        transform: translateX(0.15rem)
    }

    .notititle {
        color: var(--color);
        padding: 0.8rem 0.25rem 0.4rem 1.25rem;
        font-weight: 500;
        font-size: 1.1rem;
        transition: transform 300ms ease;
        z-index: 5;
    }

    .notification:hover .notititle {
        transform: translateX(0.15rem)
    }

    .notification:hover .notibody {
        transform: translateX(0.25rem)
    }

    .notiglow,
    .notiborderglow {
        position: absolute;
        width: 20rem;
        height: 20rem;
        transform: translate(-50%, -50%);
        background: radial-gradient(circle closest-side at center, white, transparent);
        opacity: 0;
        transition: opacity 300ms ease;
    }

    .notiglow {
        z-index: 3;
    }

    .notiborderglow {
        z-index: 1;
    }

    .notification:hover .notiglow {
        opacity: 0.1
    }

    .notification:hover .notiborderglow {
        opacity: 0.1
    }

    .note {
        color: var(--color);
        position: fixed;
        top: 80%;
        left: 50%;
        transform: translateX(-50%);
        text-align: center;
        font-size: 0.9rem;
        width: 75%;
    }

    .card2-container {
        height: 100%;
        display: flex;
        flex-direction: row; /* 默认值，通常可以省略 */
        justify-content: space-around; /* 这会在卡片之间添加一些间隔，你可以根据需要调整 */
        flex-wrap: wrap; /* 如果需要，这可以让卡片在不够空间的情况下换行 */
    }


    .el-card__body {
        height: 75%;
    }

    .card2 .red-text {
        color: #101010 !important;
    }


    .card2 {
        width: 20%;
        height: 95%;
        background: #f7faff;
        position: relative;
        display: flex;
        flex-direction: column;
        place-content: center;
        place-items: center;
        overflow: hidden;
        border-radius: 20px;
    }

    .card2 h2 {
        z-index: 1;
        color: #000000;
        font-size: 20px;
    }

    .card2::before {
        content: '';
        position: absolute;
        width: 50px;
        background-image: linear-gradient(180deg, rgb(255, 66, 43), rgb(255, 66, 43));
        height: 130%;
        animation: rotBGimg 3s linear infinite;
        transition: all 0.2s linear;
    }

    /*@keyframes rotBGimg {*/
    /*    from {*/
    /*        transform: rotate(0deg);*/
    /*    }*/

    /*    to {*/
    /*        transform: rotate(10deg);*/
    /*    }*/
    /*}*/

    .card2::after {
        content: '';
        position: absolute;
        background: #ffffff;
        inset: 5px;
        border-radius: 15px;
    }
    /* .card:hover:before {
      background-image: linear-gradient(180deg, rgb(81, 255, 0), purple);
      animation: rotBGimg 3.5s linear infinite;
    } */


    .card22 .red-text {
        color: #101010 !important;
    }


    .card22 {
        width: 20%;
        height: 95%;
        background: #f7faff;
        position: relative;
        display: flex;
        flex-direction: column;
        place-content: center;
        place-items: center;
        overflow: hidden;
        border-radius: 20px;
    }

    .card22 h2 {
        z-index: 1;
        color: #000000;
        font-size: 20px;
    }

    .card22::before {
        content: '';
        position: absolute;
        width: 50px;
        background-image: linear-gradient(180deg, rgb(89, 138, 254), rgb(89, 138, 254));
        height: 130%;
        animation: rotBGimg 3s linear infinite;
        transition: all 0.2s linear;
    }

    .card22::after {
        content: '';
        position: absolute;
        background: #ffffff;
        inset: 5px;
        border-radius: 15px;
    }



    .card1-text {
        color: rgba(220, 64, 62, 0.8);
        font-style: normal;
    }

    .card1 {
        padding: 2%;
        background-color: rgba(245, 246, 247, 0.99);
        border-radius: 15px; /* 边框圆角 */
        margin-top: 5px;
    }

    #app {
        height: 100%;
    }


    .flex-container {
        display: flex;
    }

    .left {
        flex: 48;
        display: flex;
        flex-direction: column;
    }

    .right {
        flex: 50;
        display: flex;
        flex-direction: column;
        padding-left: 10px;
    }

    .el-card__header {
        padding: 5px 5px !important;
        border-bottom: 2px;
    }

    .user-card {
        height: 100%;
        margin: auto;
        font-family: normal;
        font-size: 17px;
        box-shadow: 0 0 10px rgb(215, 174, 179); /* 阴影效果，可以根据需要调整参数 */
        border: 1px solid #ddd; /* 边框样式，可以根据需要调整颜色和宽度 */

        padding: 10px; /* 可选，为了增加内部空白 */
        border-radius: 5px; /* 可选，为了使边框具有圆角效果 */
    }

    .calendar-container {
        display: flex;
        max-width: 49%;
        font-family: normal;
        font-size: 15px;
        box-shadow: 0 0 20px rgb(246, 232, 234); /* 阴影效果，可以根据需要调整参数 */
        border: 1px solid #ddd; /* 边框样式，可以根据需要调整颜色和宽度 */
        padding: 10px; /* 可选，为了增加内部空白 */
        border-radius: 5px; /* 可选，为了使边框具有圆角效果 */
    }

    .calendar-container2 {
        display: flex;
        max-width: 49%;
        font-family: normal;
        font-size: 15px;
        box-shadow: 0 0 20px rgb(246, 232, 234); /* 阴影效果，可以根据需要调整参数 */
        border: 1px solid #ddd; /* 边框样式，可以根据需要调整颜色和宽度 */
        padding: 10px; /* 可选，为了增加内部空白 */
        border-radius: 5px; /* 可选，为了使边框具有圆角效果 */
        margin-left: 1%;
    }

    .el-carousel__item h3 {
        color: #475669;
        font-size: 14px;
        opacity: 0.75;
        line-height: 200px;
        margin: 0;
    }

    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }

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
        font-weight: 700;
    }

    .caidan {
        font-weight: 700;
    }

    .homeRouterView {
        margin-top: 10px;
        height: 100%;
    }

    .homeWelcome {
        text-align: center;
        font-size: 25px;
        font-family: 华文行楷;
        color: #000000;
        padding-top: 0px;
        padding-bottom: 10px;

        box-shadow: 0 0 20px rgb(246, 232, 234); /* 阴影效果，可以根据需要调整参数 */
        border: 1px solid #ddd; /* 边框样式，可以根据需要调整颜色和宽度 */
        padding: 10px; /* 可选，为了增加内部空白 */
        border-radius: 5px; /* 可选，为了使边框具有圆角效果 */
        margin-bottom: 10px;
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

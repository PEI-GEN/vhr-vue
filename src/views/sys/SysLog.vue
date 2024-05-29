<template>
    <div id='app'>
<!--        <el-breadcrumb separator='/' style='margin-bottom:15px;'>-->
<!--            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>-->
<!--            <el-breadcrumb-item>操作日志管理</el-breadcrumb-item>-->
<!--        </el-breadcrumb>-->
        <el-card style="height: 15%">
            <div>
                <el-row :gutter="20">
                    <el-col :span="6">
                        <el-card>
                            <div>
                                <span>总操作次数</span>
                                <div style="font-size: 20px; font-weight: bold;">
<!--                                    {{ headerData.operatorLogCount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}-->
                                    {{ headerData.operatorLogCount}}
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="6">
                        <el-card>
                            <div>
                                <span>最近操作时间</span>
                                <div style="font-size: 20px; font-weight: bold;">
                                    {{ formattedCreateDate  }}
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="6">
                        <el-card>
                            <div>
                                <span>操作人</span>
                                <div style="font-size: 20px; font-weight: bold;">
                                    {{ headerData.operatorName }}
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="6">
                        <el-card>
                            <div>
                                <span>内容</span>
                                <div style="font-size: 20px; font-weight: bold;">
                                    {{ headerData.content }}
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
            </div>
        </el-card>
        <el-card class='el_card_cls'>
            <el-table
                    :data='tableData'
                    style='width: 100%'>
                <el-table-column
                        prop='createDate'
                        label='时间'
                        width='180'>
                </el-table-column>
                <el-table-column
                        prop='content'
                        label='内容'
                        width='180'>
                </el-table-column>
                <el-table-column
                        prop='address'
                        label='地址'>
                </el-table-column>
                <el-table-column
                        prop='event'
                        label='请求路径'>
                </el-table-column>
                <el-table-column
                        prop='type'
                        label='请求类型'>
                </el-table-column>
            </el-table>
            <el-pagination
                    @size-change='handleSizeChange'
                    @current-change='handleCurrentChange'
                    :current-page.sync='pageNum'
                    :page-size='10'
                    layout='total, prev, pager, next'
                    :total='total'
                    style='margin-top: 15px;'
            ></el-pagination>
        </el-card>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                tableData: [],
                pageNum: 1,
                total: 0,
                pageSize: 10,
                headerData: {
                    content: '..',
                    createDate: '..',
                    operatorLogCount: 0,
                    operatorName: '..'
                }
            }
        },
        methods: {
            handleCurrentChange(newNum) {
                this.pageNum = newNum
                this.init()
            },
            handleSizeChange(newSize) {
                this.pageSize = newSize
                this.init()
            },
            init() {
                this.getRequest('/sys/log/header').then(res => {
                    this.headerData = res.obj
                })
                this.getRequest('/sys/log/all/' + this.pageNum + '/' + this.pageSize).then(res => {
                    this.tableData = res.obj.list
                    this.total = res.obj.total
                })
            }
        },
        created() {
            this.init()
        },
        computed: {
            formattedCreateDate() {
                const date = new Date(this.headerData.createDate);
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const day = String(date.getDate()).padStart(2, '0');
                const hours = String(date.getHours()).padStart(2, '0');
                const minutes = String(date.getMinutes()).padStart(2, '0');
                const seconds = String(date.getSeconds()).padStart(2, '0');
                return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
            }
        }
    }
</script>

<style lang='less' scoped>
    .el_card_cls {
        margin-top: 20px;
    }
</style>

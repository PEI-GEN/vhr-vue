<template>
    <div>
<!--        <el-breadcrumb separator='/' style='margin-bottom:15px;'>-->
<!--            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>-->
<!--            <el-breadcrumb-item>员工奖惩</el-breadcrumb-item>-->
<!--        </el-breadcrumb>-->
        <el-card style="position: relative" shadow='always' :body-style="{ padding: '20px' }">
            <div slot='header'></div>
            <!-- card body -->
            <el-table :data='tableData' style='width: 100%'>
                <el-table-column prop='employee.workID' label='工号'></el-table-column>
                <el-table-column prop='employee.name' label='姓名'></el-table-column>
                <el-table-column label='时间'>
                    <template slot-scope='scope'>
                        {{ scope.row.createDate | dateFormat }}
                    </template>
                </el-table-column>
                <el-table-column prop='reason' label='原因'>
                </el-table-column>
                <el-table-column prop='remark' label='奖惩级别'>
                </el-table-column>
                <el-table-column prop='point' label='分数'>
                </el-table-column>
                <el-table-column label='操作'>
                    <template slot-scope='scope'>
                        <el-button
                                icon='el-icon-edit'
                                size='mini'
                                type='info'
                                style='margin-right: 10px;background-color: #ff624e;border-color: white;'
                                @click='showEdit(scope.row)'
                        >编辑
                        </el-button>
                        <el-button
                                icon='el-icon-edit'
                                size='mini'
                                type='info'
                                style='margin-right: 10px;background-color: #e58686;border-color: white;'
                                @click='del(scope.row.id)'
                        >删除
                        </el-button>
<!--                        <el-popconfirm-->
<!--                                confirm-button-text='好的'-->
<!--                                cancel-button-text='不用了'-->
<!--                                icon='el-icon-info'-->
<!--                                icon-color='red'-->
<!--                                title='这是一段内容确定删除吗？'-->
<!--                                @confirm='del(scope.row.id)'-->
<!--                        >-->
<!--                            <el-button-->
<!--                                    type='danger'-->
<!--                                    icon='el-icon-delete'-->
<!--                                    size='mini'-->
<!--                                    slot='reference'-->
<!--                            >删除-->
<!--                            </el-button>-->
<!--                        </el-popconfirm>-->
<!--                        <el-button type="danger" icon="el-icon-delete" size="mini" @click="handleDeleteClick(scope.row)">-->
<!--                            删除-->
<!--                        </el-button>-->
                    </template>
                </el-table-column>
            </el-table>
            <el-button type='primary' style='margin-top:15px;position: absolute;
        bottom: 10px; /* 定位到容器的底部 */
        left: 0; /* 定位到容器的右边 */' @click='showAdd'
            >添加
            </el-button>
            <el-pagination
                    class='el_page_div'
                    @size-change='handleSizeChange'
                    @current-change='handleCurrentChange'
                    :page-sizes='[5, 8, 10]'
                    :page-size='pageSize'
                    layout='sizes, prev, pager, next'
                    :total='pageTotal'>
            </el-pagination>
            <el-dialog title='添加' :visible.sync='dialogVisible2' width='30%'>
                <el-form
                        label-position='left'
                        label-width='80px'
                        :model='formLabelAlign'
                >
                    <el-form-item label='员工工号'>
                        <el-input
                                v-model='workID'
                                maxlength='8'
                                show-word-limit
                        ></el-input>
                    </el-form-item>
                    <el-form-item label='奖惩原因'>
                        <el-input v-model='formLabelAlign.reason'></el-input>
                    </el-form-item>
                    <el-form-item label='奖惩级别'>
                        <el-autocomplete
                                class='inline-input'
                                v-model='state1'
                                :fetch-suggestions='querySearch'
                                placeholder='请输入内容'
                                clearable
                        ></el-autocomplete>
                    </el-form-item>
                    <el-form-item label='分数'>
                        <el-input
                                v-model='grade'
                                disabled
                                size='normal'
                                clearable
                        ></el-input>
                    </el-form-item>
                </el-form>
                <span slot='footer'>
          <el-button @click='dialogVisible2 = false'>取 消</el-button>
          <el-button type='primary' @click='submit'>提交</el-button>
        </span>
            </el-dialog>
            <el-dialog
                    title='提示'
                    :visible.sync='dialogVisible'
                    width='30%'
                    @closed='dialogClosed'
            >
                <div class='inputBox'>
                    <span>原因：</span>
                    <el-input
                            v-model='reason'
                            size='normal'
                            style='width: 202px;'
                            clearable
                    ></el-input>
                </div>
                <div class='inputBox'>
                    <span>奖赏级别：</span>
                    <el-autocomplete
                            class='inline-input'
                            v-model='state1'
                            :fetch-suggestions='querySearch'
                            placeholder='请输入内容'
                    ></el-autocomplete>
                </div>
                <div class='inputBox'>
                    <span>分数：</span>
                    <el-input
                            v-model='grade'
                            disabled
                            size='normal'
                            style='width: 202px;'
                            clearable
                    ></el-input>
                </div>

                <span slot='footer' class='dialog-footer'>
          <el-button @click='dialogVisible = false'>取 消</el-button>
          <el-button type='primary' @click='eidtSubmit'>确 定</el-button>
        </span>
            </el-dialog>
        </el-card>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                workID: '',
                pageSize: 10,
                pageNum: 1,
                pageTotal: 0,
                tableData: [],
                dialogVisible: false,
                dialogVisible2: false,
                state1: '',
                restaurants: [
                    {
                        value: '小功'
                    },
                    {
                        value: '大功'
                    },
                    {
                        value: '嘉奖'
                    },
                    {
                        value: '警告'
                    }
                ],
                grade: 0,
                reason: '',
                id: '',
                formLabelAlign: {}
            }
        },
        methods: {
            handleSizeChange(val) {
                this.pageSize = val
                this.init()
            },
            handleCurrentChange(val) {
                this.pageNum = val
                this.init()
            },
            showAdd() {
                this.dialogVisible2 = true
            },
            init() {
                this.getRequest('/per/ec/' + this.pageNum + '/' + this.pageSize).then(res => {
                    this.tableData = res.obj.list
                })
            },
            del(id) {
                this.deleteRequest('/per/ec/delete/' + id).then(res => {
                    this.init()
                    this.$message.success(res.msg)
                })
            },
            showEdit(item) {
                this.dialogVisible = true
                this.state1 = item.remark
                this.reason = item.reason
                this.id = item.id
            },
            querySearch(queryString, cb) {
                var restaurants = this.restaurants
                console.log(restaurants)
                var results = queryString
                    ? restaurants.filter(this.createFilter(queryString))
                    : restaurants
                // 调用 callback 返回建议列表的数据
                console.log(results)
                cb(results)
            },
            createFilter(queryString) {
                return restaurant => {
                    return (
                        restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
                        0
                    )
                }
            },
            eidtSubmit() {
                this.putRequest('/per/ec/modify', {
                    id: this.id,
                    reason: this.reason,
                    remark: this.state1,
                    point: this.grade

                }).then(res => {
                    this.clearSomething()
                    // this.$message.success(res.msg)
                    this.dialogVisible = false
                    this.init()
                })
            },
            submit() {
                let workIDReg = new RegExp('^[0-9]{8}$')
                if (
                    workIDReg.test(this.workID) &&
                    this.state1 &&
                    this.state1 !== '' &&
                    this.formLabelAlign.reason &&
                    this.formLabelAlign.reason !== ''
                ) {
                    this.formLabelAlign.remark = this.state1
                    this.formLabelAlign.point = this.grade
                    console.log(this.formLabelAlign)
                    this.putRequest('/per/ec/add/' + this.workID, this.formLabelAlign).then(res => {
                        if (res.status === 200) {
                            // this.$message.success(res.data.msg)
                            this.init()
                            this.dialogVisible2 = false
                        } else {
                            this.$message.error(res.data.msg)
                        }
                    })
                } else {
                    this.$message.warning('必要项未填或者工号错误！！')
                }
            },
            clearSomething() {
                this.grade = 0
                this.state1 = ''
            },
            dialogClosed() {
                this.clearSomething()
            },
            handleDeleteClick(row) {
                MessageBox.confirm('这是一段内容确定删除吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    // 用户点击了确定按钮，执行删除操作
                    this.del(row.id);
                }).catch(() => {
                    // 用户点击了取消按钮，不执行任何操作
                });
            }
        },
        created() {
            this.init()
        },
        watch: {
            state1(val) {
                if (val === '小功') {
                    this.grade = 10
                } else if (val === '大功') {
                    this.grade = 20
                } else if (val === '嘉奖') {
                    this.grade = 5
                } else if (val === '警告') {
                    this.grade = -5
                } else {
                    this.grade = 0
                }
            }
        }
    }
</script>

<style lang='less' scoped>
    .inputBox {
        width: 300px;
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
    }

    .el-pagination {
        position: absolute;
        bottom: 10px; /* 定位到容器的底部 */
        right: 0; /* 定位到容器的右边 */
    }

    .el-card.is-always-shadow, .el-card.is-hover-shadow:focus, .el-card.is-hover-shadow:hover {
        height: 100%;
    }

    .el-card__body {
        height: 100%;
    }
</style>

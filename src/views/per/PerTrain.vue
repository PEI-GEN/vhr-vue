<template>
    <div>
<!--        <el-breadcrumb separator='/' style='margin-bottom:15px;'>-->
<!--            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>-->
<!--            <el-breadcrumb-item>员工培训</el-breadcrumb-item>-->
<!--        </el-breadcrumb>-->
        <el-card style="position: relative" shadow='always' :body-style="{ padding: '20px' }">
            <div slot='header'></div>
            <el-table :data='tableData' style='width: 100%'>
                <el-table-column prop='employee.name' label='员工名称'>
                </el-table-column>
                <el-table-column prop='trainContent' label='培训内容'>
                </el-table-column>
                <el-table-column label='时间'>
                    <template slot-scope='scope'>
                        {{ scope.row.createData | dateFormat }}
                    </template>
                </el-table-column>
                <el-table-column prop='remark' label='具体'></el-table-column>
                <el-table-column label='操作'>
                    <template slot-scope='scope'>
                        <el-button
                                type='info'
                                icon='el-icon-edit'
                                @click='showEdit(scope.row)'
                                size='mini'
                                style='margin-right: 10px;background-color: #ff624e;border-color: white;'
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
<!--                                    slot='reference'-->
<!--                                    size='mini'-->
<!--                            >删除-->
<!--                            </el-button>-->
<!--                        </el-popconfirm>-->
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                    class='el_page_div'
                    @size-change='handleSizeChange'
                    @current-change='handleCurrentChange'
                    :page-sizes='[5, 8, 10]'
                    :page-size='pageSize'
                    layout='sizes, prev, pager, next'
                    :total='pageTotal'>
            </el-pagination>
            <el-button
                    type='primary'
                    @click='addDialogVisible = true'
                    style='margin-top: 15px;position: absolute;bottom: 10px;left: 2%;'
            >添加
            </el-button
            >
            <el-dialog
                    title='修改'
                    :visible.sync='editDialogVisible'
                    width='30%'
            >
                <el-form ref='empTrainFormRef' :model='editEmpTrainForm' label-width='80px' label-position='left'>
                    <el-form-item label='培训内容'>
                        <el-input v-model='editEmpTrainForm.trainContent'></el-input>
                    </el-form-item>
                    <el-form-item label='时间'>
                        <el-date-picker type='date' placeholder='选择日期' v-model='editEmpTrainForm.createData'
                                        value-format='yyyy-MM-dd HH:mm:ss'
                                        style='width: 100%;'></el-date-picker>
                    </el-form-item>
                    <el-form-item label='具体'>
                        <el-input v-model='editEmpTrainForm.remark' type='textarea'></el-input>
                    </el-form-item>
                </el-form>
                <span slot='footer' class='dialog-footer'>
          <el-button @click='editDialogVisible = false'>取 消</el-button>
          <el-button type='warning' @click='update()'
          >确 定</el-button
          >
        </span>
            </el-dialog>
            <el-dialog
                    title='添加'
                    :visible.sync='addDialogVisible'
                    width='30%'
            >
                <el-form ref='addEmpTrainFormRef' :model='addEmpTrainForm' label-width='80px' label-position='left'>
                    <el-form-item label='员工号'>
                        <el-input v-model='addEmpTrainForm.workId' maxlength='8' show-word-limit></el-input>
                    </el-form-item>
                    <el-form-item label='培训内容'>
                        <el-input v-model='addEmpTrainForm.trainContent'></el-input>
                    </el-form-item>
                    <el-form-item label='时间'>
                        <el-date-picker type='date' placeholder='选择日期' v-model='addEmpTrainForm.trainDate'
                                        value-format='yyyy-MM-dd HH:mm:ss'
                                        style='width: 100%;'></el-date-picker>
                    </el-form-item>
                    <el-form-item label='具体'>
                        <el-input v-model='addEmpTrainForm.remark' type='textarea'></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type='primary' @click='add'>新建</el-button>
                        <el-button @click='addDialogVisible = false'>取消</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
        </el-card>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                pageSize: 10,
                pageNum: 1,
                pageTotal: 0,
                editEmpTrainForm: {},
                addEmpTrainForm: {},
                tableData: [],
                editDialogVisible: false,
                addDialogVisible: false
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
            init() {
                this.getRequest('/per/train/' + this.pageNum + '/' + this.pageSize).then(res => {
                    this.tableData = res.obj.list
                })
            },
            showEdit(item) {
                this.editDialogVisible = true
                this.editEmpTrainForm = item
            },
            del(id) {
                this.deleteRequest('/per/train/delete/' + id).then(res => {
                    // this.$message.success(res.msg)
                    this.init()
                })
            },
            add() {
                this.putRequest('/per/train/add/' + this.addEmpTrainForm.workId,
                    this.addEmpTrainForm).then(res => {
                    // this.$message.success(res.msg)
                    if (res.status === 200) {
                        this.addDialogVisible = false
                        this.init()
                    }
                })
            },
            update() {
                console.log('/per/train/modify')
                this.putRequest('/per/train/modify', this.editEmpTrainForm).then(res => {
                    console.log(res.msg)
                    this.$message.success(res.msg)
                    this.editDialogVisible = false
                    this.init()
                }).catch(error => {
                    this.init()
                })
                this.editDialogVisible = false
                this.init()
            }
        },
        created() {
            this.init()
        }
    }
</script>

<style lang='less'>
    .el-card.is-always-shadow, .el-card.is-hover-shadow:focus, .el-card.is-hover-shadow:hover {
        height: 100%;
    }

    .el-card__body {
        height: 100%;
    }

</style>

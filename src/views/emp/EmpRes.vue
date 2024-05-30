<template>
    <div>
        <el-button type="primary" @click="importFile">导入</el-button>
        <input type="file" ref="fileInput" @change="handleFileChange" style="display: none;" />

        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="name" label="姓名"></el-table-column>
            <el-table-column prop="gender" label="性别"></el-table-column>
            <el-table-column prop="nativePlace" label="籍贯"></el-table-column>
            <el-table-column prop="ethnicity" label="民族"></el-table-column>
            <el-table-column prop="birthDate" label="出生日期"></el-table-column>
            <el-table-column prop="idNumber" label="身份证号码"></el-table-column>
            <el-table-column prop="politicalStatus" label="政治面貌"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" @click="editRow(scope.$index, scope.row)">修改</el-button>
                    <el-button size="mini" type="danger" @click="deleteRow(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog title="编辑" :visible.sync="dialogVisible">
            <el-form :model="editForm">
                <el-form-item label="姓名">
                    <el-input v-model="editForm.name"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-input v-model="editForm.gender"></el-input>
                </el-form-item>
                <el-form-item label="籍贯">
                    <el-input v-model="editForm.nativePlace"></el-input>
                </el-form-item>
                <el-form-item label="民族">
                    <el-input v-model="editForm.ethnicity"></el-input>
                </el-form-item>
                <el-form-item label="出生日期">
                    <el-input v-model="editForm.birthDate"></el-input>
                </el-form-item>
                <el-form-item label="身份证号码">
                    <el-input v-model="editForm.idNumber"></el-input>
                </el-form-item>
                <el-form-item label="政治面貌">
                    <el-input v-model="editForm.politicalStatus"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveEdit">保存</el-button>
      </span>
        </el-dialog>
    </div>
</template>

<script>
    import axios from 'axios';
    import XLSX from 'xlsx';

    export default {
        data() {
            return {
                tableData: [],
                dialogVisible: false,
                editForm: {
                    id: '',
                    name: '',
                    gender: '',
                    nativePlace: '',
                    ethnicity: '',
                    birthDate: '',
                    idNumber: '',
                    politicalStatus: ''
                },
                editIndex: -1
            };
        },
        created() {
            this.fetchData();
        },
        methods: {
            fetchData() {
                axios.get('/emp/resume/employees')
                    .then(response => {
                        this.tableData = response;
                    })
                    .catch(error => {
                        console.error('Error fetching data:', error);
                    });
            },
            importFile() {
                this.$refs.fileInput.click();
            },
            handleFileChange(event) {
                const file = event.target.files[0];
                const formData = new FormData();
                formData.append('file', file);

                // 上传文件到后端
                axios.post('/emp/resume/import', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then(() => {
                    this.fetchData(); // 导入成功后重新获取数据
                    this.resetFileInput(); // 重置文件输入
                })
                .catch(error => {
                    console.error('Error importing data:', error);
                    this.resetFileInput(); // 重置文件输入
                });
            },
            resetFileInput() {
                this.$refs.fileInput.value = ''; // 清空文件输入值
            },
            deleteRow(row) {
                axios.delete(`/emp/resume/employees/${row.id}`)
                    .then(() => {
                        this.fetchData(); // 删除成功后重新获取数据
                    })
                    .catch(error => {
                        console.error('Error deleting data:', error);
                    });
            },
            editRow(index, row) {
                this.editIndex = index;
                this.editForm = { ...row };
                this.dialogVisible = true;
            },
            saveEdit() {
                axios.put(`/emp/resume/employees/${this.editForm.id}`, this.editForm)
                    .then(() => {
                        this.fetchData(); // 修改成功后重新获取数据
                        this.dialogVisible = false;
                    })
                    .catch(error => {
                        console.error('Error updating data:', error);
                    });
            }
        }
    };
</script>

<style>
    .el-table .el-button {
        margin: 0 5px;
    }
</style>

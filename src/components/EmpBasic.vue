<template>
  <div>
    <el-container>
      <el-header style="padding: 0px;display:flex;justify-content:space-between;align-items: center">
        <div style="display: inline">
          <el-input
            placeholder="通过员工名搜索员工,记得回车哦..."
            clearable
            @change="keywordsChange"
            style="width: 300px;margin: 0px;padding: 0px;"
            size="mini"
            :disabled="advanceSearchViewVisible"
            @keyup.enter.native="searchEmp"
            prefix-icon="el-icon-search"
            v-model="keywords">
          </el-input>
          <el-button type="primary" size="mini" style="margin-left: 5px" icon="el-icon-search" @click="searchEmp">搜索
          </el-button>
          <el-button slot="reference" type="primary" size="mini" style="margin-left: 5px"
                     @click="showAdvanceSearchView"><i
            class="fa fa-lg" v-bind:class="[advanceSearchViewVisible ? faangledoubleup:faangledoubledown]"
            style="margin-right: 5px"></i>高级搜索
          </el-button>
        </div>
        <div style="margin-left: 5px;margin-right: 20px;display: inline">
          <el-upload
            :show-file-list="false"
            accept="application/vnd.ms-excel"
            action="/employee/basic/importEmp"
            :on-success="fileUploadSuccess"
            :on-error="fileUploadError" :disabled="fileUploadBtnText=='正在导入'"
            :before-upload="beforeFileUpload" style="display: inline">
            <el-button size="mini" type="success" :loading="fileUploadBtnText=='正在导入'"><i class="fa fa-lg fa-level-up"
                                                                                          style="margin-right: 5px"></i>{{fileUploadBtnText}}
            </el-button>
          </el-upload>
          <el-button type="success" size="mini" @click="exportEmps"><i class="fa fa-lg fa-level-down"
                                                                       style="margin-right: 5px"></i>导出数据
          </el-button>
          <el-button type="primary" size="mini" icon="el-icon-plus"
                     @click="showAddEmpView">
            添加员工
          </el-button>
        </div>
      </el-header>
      <el-main style="padding-left: 0px;padding-top: 0px">
        <div>
          <transition name="slide-fade">
            <div
              style="margin-bottom: 15px;border: 1px;border-radius: 5px;border-style: solid;padding: 5px 0px 5px 0px;box-sizing:border-box;border-color: #20a0ff;width: 85%;margin:0 auto"
              v-show="advanceSearchViewVisible">
              <el-row>
                <el-col :span="8">
                  职位:
                  <el-select v-model="emp.posId" style="width: 130px" size="mini" placeholder="请选择职位">
                    <el-option
                      v-for="item in positions"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-col>
                <el-col :span="5" :offset="10">
                  <el-button icon="el-icon-search" type="primary" size="mini" @click="searchEmp">搜索</el-button>
                  <el-button size="mini" @click="cancelSearch">取消</el-button>
                </el-col>
              </el-row>
            </div>
          </transition>
          <el-table
            :data="emps"
            v-loading="tableLoading"
            border
            stripe
            @selection-change="handleSelectionChange"
            size="mini"
            style="width: 100%">
            <el-table-column
              type="selection"
              align="left"
              min-width="5%">
            </el-table-column>
            <el-table-column
              prop="employeeNo"
              min-width="17%"
              align="left"
              fixed
              label="工号">
            </el-table-column>
            <el-table-column
              prop="name"
              align="left"
              label="姓名"
              min-width="12%">
            </el-table-column>
            <el-table-column
              prop="gender"
              label="性别"
              min-width="8%">
            </el-table-column>
            <el-table-column
              prop="age"
              min-width="8%"
              label="年龄">
            </el-table-column>
            <el-table-column
              prop="telephoneNo"
              min-width="17%"
              align="left"
              label="电话号码">
            </el-table-column>
            <el-table-column
              prop="departmentName"
              align="left"
              min-width="9%"
              label="所属部门">
            </el-table-column>
            <el-table-column
              min-width="9%"
              align="left"
              prop="positionName"
              label="职位">
            </el-table-column>
            <el-table-column
              fixed="right"
              align="center"
              label="操作"
              min-width="15%">
              <template slot-scope="scope">
                <el-button @click="showEditEmpView(scope.row)" style="padding: 3px 8px 3px 4px;margin: 2px"
                           size="mini">编辑
                </el-button>
                <el-button type="danger" style="padding: 3px 8px 3px 4px;margin: 2px" size="mini"
                           @click="deleteEmp(scope.row)">删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <div style="display: flex;justify-content: space-between;margin: 2px">
            <el-button type="danger" size="mini" v-if="emps.length>0" :disabled="multipleSelection.length==0"
                       @click="deleteManyEmps">批量删除
            </el-button>
            <el-pagination
              background
              :page-size="10"
              :current-page="currentPage"
              @current-change="currentChange"
              layout="prev, pager, next"
              :total="totalCount">
            </el-pagination>
          </div>
        </div>
      </el-main>
    </el-container>
    <el-form :model="emp" :rules="rules" ref="addEmpForm" style="margin: 0px;padding: 0px;">
      <div style="text-align: left">
        <el-dialog
          :title="dialogTitle"
          style="padding: 0px;"
          :close-on-click-modal="false"
          :visible.sync="dialogVisible"
          width="55%">
          <el-row>
            <el-col :span="7">
              <div>
                <el-form-item label="姓名:" prop="name">
                  <el-input prefix-icon="el-icon-edit" v-model="emp.name" size="mini" style="width: 140px"
                            placeholder="请输入姓名. . ."></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div>
                <el-form-item label="性别:" prop="gender">
                  <el-radio-group v-model="emp.gender">
                    <el-radio label="male">男</el-radio>
                    <el-radio style="margin-left: 15px" label="female">女</el-radio>
                  </el-radio-group>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="7">
              <div>
                <el-form-item label="年龄:" prop="age">
                  <el-input prefix-icon="el-icon-edit" v-model="emp.age" size="mini" style="width: 130px"
                            placeholder="请输入年龄. . ."></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <div>
                <el-form-item label="职位:" prop="positionName">
                  <el-input prefix-icon="el-icon-edit" v-model="emp.positionName" size="mini" style="width: 200px"
                            placeholder="请输入员工职位. . . ."></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="10">
              <div>
                <el-form-item label="所属部门:" prop="departmentName">
                  <el-input prefix-icon="el-icon-edit" v-model="emp.departmentName" size="mini" style="width: 200px"
                            placeholder="请输入员工部门. . . ."></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>

            <el-col :span="10">
              <div>
                <el-form-item label="电话号码:" prop="telephoneNo">
                  <el-input prefix-icon="el-icon-phone" v-model="emp.telephoneNo" size="mini" style="width: 200px"
                            placeholder="请输入员工电话号码. . ."></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="10">
              <div>
                <el-form-item label="工号:" prop="employeeNo">
                  <el-input prefix-icon="el-icon-edit" v-model="emp.employeeNo" size="mini" style="width: 200px"
                            placeholder="请输入员工工号. . ."></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <span slot="footer" class="dialog-footer">
    <el-button size="mini" @click="cancelEidt">取 消</el-button>
    <el-button size="mini" type="primary" @click="addEmp('addEmpForm')">确 定</el-button>
  </span>
        </el-dialog>
      </div>
    </el-form>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        emps: [],
        keywords: '',
        fileUploadBtnText: '导入数据',
        beginDateScope: '',
        faangledoubleup: 'fa-angle-double-up',
        faangledoubledown: 'fa-angle-double-down',
        dialogTitle: '',
        multipleSelection: [],
        depTextColor: '#c0c4cc',
        positions: [],
        deps:[],
        totalCount: -1,
          pageCount:7,
        currentPage: 1,
        dialogVisible: false,
        tableLoading: false,
        advanceSearchViewVisible: false,
        emp: {
          employeeNo:'',
          name: '',
          gender: '',
          telephoneNo: '',
          age:'',
          departmentName: '',
          positionName:''
        },
        rules: {
          name: [{required: true, message: '必填:姓名', trigger: 'blur'}],
          gender: [{required: true, message: '必填:性别', trigger: 'blur'}],
          age: [{required: true, message: '必填:年龄', trigger: 'blur'}],
          telephoneNo: [{required: true, message: '必填:电话号码', trigger: 'blur'}],
          departmentName: [{required: false, message: '必填:部门', trigger: 'blur'}],
          positionName: [{required: false, message: '必填:职位', trigger: 'blur'}],
          employeeNo: [{required: true, message: '必填:工号', trigger: 'blur'}],
        }
      };
    },
    mounted: function () {
      this.loadEmps();
    },
    methods: {
      fileUploadSuccess(response, file, fileList) {
        if (response) {
          this.$message({type: response.status, message: response.msg});
        }
        this.loadEmps();
        this.fileUploadBtnText = '导入数据';
      },
      fileUploadError(err, file, fileList) {
        this.$message({type: 'error', message: "导入失败!"});
        this.fileUploadBtnText = '导入数据';
      },
      beforeFileUpload(file) {
        this.fileUploadBtnText = '正在导入';
      },
      exportEmps() {
        window.open("/employee/basic/exportEmp", "_parent");
      },//和文件导入导出有关
      cancelSearch() {
        this.advanceSearchViewVisible = false;
        this.emptyEmpData();
        this.loadEmps();
      },//高级搜索的取消
      showAdvanceSearchView() {
        this.advanceSearchViewVisible = !this.advanceSearchViewVisible;
        this.keywords = '';
        if (!this.advanceSearchViewVisible) {
          this.emptyEmpData();
          this.loadEmps();
        }
      },//高级搜索栏目弹出
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },//获取打钩的下标?
      deleteManyEmps() {
        this.$confirm('此操作将删除[' + this.multipleSelection.length + ']条数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            for(var i=0;i<this.multipleSelection.length;i++){
                this.doDelete(this.multipleSelection[i].employeeNo);
            }
        }).catch(() => {
        });
      },
      deleteEmp(row) {
        this.$confirm('此操作将永久删除[' + row.name + '], 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.doDelete(row.employeeNo);
        }).catch(() => {
        });
      },
      doDelete(ids) {
        this.tableLoading = true;
        var _this = this;
        this.deleteRequest("/employee/" + ids).then(resp => {
          _this.tableLoading = false;
          if (resp && resp.status == 200) {     //1请求已建立但还未发送，200交易成功
            var data = resp.data;
            _this.loadEmps();
          }
        })
      },
      keywordsChange(val) {
        if (val == '') {
          this.loadEmps();
        }
      },
      searchEmp() {
        this.loadEmps();
      },
      currentChange(currentChange) {
        this.currentPage = currentChange;
        this.loadEmps();
      },//翻页的
      loadEmps() {
        var _this = this;
        this.tableLoading = true;
        this.getRequest("/employees?employeeName=" + this.keywords+"&currentPage="+this.currentPage).then(resp => {
          this.tableLoading = false;
          if (resp && resp.status == 200) {
            var data = resp.data;
            _this.emps = data.employees;
            //_this.pageCount=7;
              _this.totalCount=data.count;
            console.log(_this.count);
              for(var i=0;i<_this.emps.length;i++){
                  if(_this.emps[i.toString()].gender=='male'){
                      _this.emps[i.toString()].gender='男'
                  }else{
                      _this.emps[i.toString()].gender='女'
                  }
              }
          }
        })
      },
        addEmp(formName) {
            var _this = this;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let isExit = false;
                    for(var i=0;i<this.emps.length;i++){
                        if(this.emps[i].employeeNo==this.emp.employeeNo)
                            isExit=true;
                    }

                    if (isExit) {
                        //更新
                        console.log("update");
                        this.tableLoading = true;
                        this.putRequest("/employee", this.emp).then(resp => {
                            _this.tableLoading = false;
                            if (resp && resp.status == 200) {
                                var data = resp.data;
                                _this.dialogVisible = false;
                                _this.emptyEmpData();
                                _this.loadEmps();
                            }
                        })
                    } else {
                        //添加
                        console.log("add");
                        this.tableLoading = true;
                        console.log(this.emp);
                        this.postRequest("/employee", this.emp).then(resp => {
                            _this.tableLoading = false;
                            if (resp && resp.status == 200) {
                                var data = resp.data;
                                _this.dialogVisible = false;
                                _this.emptyEmpData();
                                _this.loadEmps();
                            }
                        })
                    }
                } else {
                    return false;
                }
            });
        },
      cancelEidt(row) {
        this.dialogVisible = false;
        this.emptyEmpData();
        this.loadEmps();
      },
      showEditEmpView(row) {
        //console.log(row)
        this.dialogTitle = "编辑员工";
        if(row.gender=="男"){
            row.gender='male'
        }else{
            row.gender='female'
        }
        console.log(row.gender)
          this.emp = row;
        this.emp.employeeNo=row.employeeNo;
        this.emp.name=row.name;
        this.emp.age = row.age;
        this.emp.departmentName = row.departmentName;
        this.emp.gender=row.gender;
        //this.emp.departmentName = row.departmentName;
        this.emp.telephoneNo = row.telephoneNo;
        this.emp.positionName = row.positionName;
        this.dialogVisible = true;
      },
      showAddEmpView() {
        this.dialogTitle = "添加员工";
        this.dialogVisible = true;
      },
      emptyEmpData() {
        this.emp = {
            employeeNo:'',
            name: '',
            gender: '',
            telephoneNo: '',
            age:'',
            departmentName: '',
            positionName:''
          }
      },
    }
  };
</script>
<style>
  .el-dialog__body {
    padding-top: 0px;
    padding-bottom: 0px;
  }

  .slide-fade-enter-active {
    transition: all .8s ease;
  }

  .slide-fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }

  .slide-fade-enter, .slide-fade-leave-to {
    transform: translateX(10px);
    opacity: 0;
  }
</style>

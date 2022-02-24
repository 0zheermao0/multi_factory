<template>
  <div class="container">
    <div class="background">
      <img class="bgIMG" src="@/assets/background.jpg">
    </div>
    <div class="loginCard">
      <div class="loginIMG">
        <img src="@/assets/login.jpg" class="bgIMG">
      </div>
      <div class="loginContent">
        <div class="login-title">登录 / Login</div>
        <el-form ref="loginFormRef" class="login_form">
<!--          &lt;!&ndash; 用户名 &ndash;&gt;-->
<!--          <el-form-item prop="username">-->
<!--            <el-input prefix-icon="el-icon-s-custom"-->
<!--              placeholder="用户名"></el-input>-->
<!--          </el-form-item>-->
<!--          &lt;!&ndash; 密码 &ndash;&gt;-->
<!--          <el-form-item prop="password">-->
<!--            <el-input prefix-icon="el-icon-lock"-->
<!--              type="password" placeholder="密码"></el-input>-->
<!--          </el-form-item>-->

          <el-select v-model="formData" class="m-2" placeholder="请选择场站" size="large" @change="handleSelectChange" value-key="id">
            <el-option
                v-for="item in tableData"
                :key="item.id"
                :label="item.record"
                :value="item"
            >
            </el-option>
          </el-select>

          <!-- 按钮区域 -->
          <el-form-item>
            <el-button class="loginBtn" type="primary" @click="jump">
              <span style="margin-right: 2vw">进</span>
              <span>入</span>
            </el-button>

            <el-button class="loginBtn" type="primary" @click="handleEdit">
              <span style="margin-right: 2vw">修</span>
              <span>改</span>
            </el-button>

            <el-button class="loginBtn" type="primary" @click="handleNew">
              <span style="margin-right: 2vw">新</span>
              <span>增</span>
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <!-- 修改场站备注dialog -->
    <el-dialog title="添加新场站备注" :visible.sync="dialogFormVisible" :data="formData">
      <el-form :model="formData">
        <el-form-item label="id" :label-width="formLabelWidth">
          <el-input v-model="formData.id" autocomplete="on" disabled></el-input>
        </el-form-item>
        <el-form-item label="场站备注名" :label-width="formLabelWidth">
          <el-input v-model="formData.record" autocomplete="off" @change="change($event)"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click=updateRecord>确 定</el-button>
      </div>
    </el-dialog>

    <!-- 新增url dialog -->
    <el-dialog title="添加新场站url" :visible.sync="urlDialogVisible">
      <el-form :model="formData">
        <el-form-item label="ID" >
          <el-input v-model="formData.id" autocomplete="on"></el-input>
        </el-form-item>
        <el-form-item label="场站地址(e.g. 39.105.29.195/station)" >
          <el-input v-model="formData.url" autocomplete="on"></el-input>
        </el-form-item>
        <el-form-item label="场站备注" >
          <el-input v-model="formData.record" autocomplete="on"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="urlDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click=newUrl>确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import request from '@/network/request'
// import { baseURL } from '../../config/baseConfig'

import request from "@/network/request";

export default {
  name: 'main-page',
  created () {
    request({
      method: 'get',
      url: '/url/get',
    }).then((res) => {
      this.tableData = res.data.data
      this.formData = this.tableData[0];
      console.log(this.formData.record)
    })
  },
  data() {
    return {
      tableData: [],
      formLabelWidth: '120px',
      dialogFormVisible : false,
      urlDialogVisible: false,
      formData: {
        id: 1,
        record: "未分配",
        url: "baidu.com"
      },
      currentUrl: ""
    }
  },
  methods: {
    handleEdit(index, row) {
      this.dialogFormVisible = true;
      console.log(row.record);
    },
    handleSelectChange(){
      console.log(this.formData);
      this.currentUrl = this.formData.url

    },
    handleDelete(index, row){
      console.log(index, row)
      request({
        method: 'post',
        url: '/url/deleteUrl',
        params: {
          id: this.formData.id
          // url: this.formData.url,
          // remark: this.formData.record
        }
      }).then((res) => {
        console.log(res.data.data.user)
        if (res.data.code === 200 && res.data.message === 'SUCCESS') {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          console.log(this.formData)
          this.$set(this.tableData, this.formData.id-1, this.formData)
        } else if (res.data.message !== 'SUCCESS') {
          this.$message.error(res.data.message)
        } else if (res.data.code === 400) {
          this.$message.error(res.message)
        } else {
          this.$message.error('删除失败!')
        }
      })
      alert("delete call")
    },
    handleNew(){
      this.urlDialogVisible = true;
      this.formData.id = this.tableData.length + 1
      this.formData.url = "39.105.29.195/"
      this.formData.record = ""
    },
    // urlClick(index, row){
    //   console.log(index, row);
    //   window.open("http://"+this.tableData[index].url,"_blank");
    // },
    updateRecord(){
      this.dialogFormVisible = false;
      request({
        method: 'post',
        url: '/url/update',
        params: {
          id: this.formData.id,
          remark: this.formData.record
        }
      }).then((res) => {
        console.log(res.data.data.user)
        if (res.data.code === 200 && res.data.message === 'SUCCESS') {
          this.$message({
            type: 'success',
            message: '保存成功!'
          });
          this.tableData[this.formData.id-1].record = this.formData.record
        } else if (res.data.message !== 'SUCCESS') {
          this.$message.error(res.data.message)
        } else if (res.data.code === 400) {
          this.$message.error(res.message)
        } else {
          this.$message.error('保存失败!')
        }
        this.closeDialog()
      })
    },
    newUrl(){
      this.urlDialogVisible = false;
      request({
        method: 'post',
        url: '/url/addUrl',
        params: {
          id: this.formData.id,
          url: this.formData.url,
          remark: this.formData.record
        }
      }).then((res) => {
        console.log(res.data.data.user)
        if (res.data.code === 200 && res.data.message === 'SUCCESS') {
          this.$message({
            type: 'success',
            message: '保存成功!'
          });
          console.log(this.formData)
          this.$set(this.tableData, this.formData.id-1, this.formData)
        } else if (res.data.message !== 'SUCCESS') {
          this.$message.error(res.data.message)
        } else if (res.data.code === 400) {
          this.$message.error(res.message)
        } else {
          this.$message.error('保存失败!')
        }
      })
    },
    jump(){
      window.open("http://"+ this.currentUrl,"_blank");
    }
  }
}
</script>

<style scoped>
  .container {
    width: 100%;
    height: 100vh;
  }
  .background {
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    filter: blur(8px);
    z-index: -1;
    position: absolute;
  }
  .bgIMG {
    width: 100%;
    height: 100%;
  }
  .loginCard {
    width: 66vw;
    height: 60vh;
    display: flex;
    background-color: #e5e9f2;
    margin: auto;
    border-radius: 20px;
    z-index: 1;
  }
  .loginIMG {
    width: 50%;
    height: 100%;
  }
  .loginContent {
    width: 50%;
    text-align: center;
  }
  .login-title {
    line-height: 20vh;
    font-size: 1.8em;
    color: #e5e9f2;
  }
  >>> .el-input__inner{
    width: 19vw;
    height: 6vh;
    border-radius: 3vh;
    margin-bottom: 2vh;
    padding-left: 2.4vw;
  }
  .el-input {
    font-size: 1.2em;
  }
  >>> .el-input__prefix {
    margin-left: 7.4vw;
  }
  >>> .el-input__icon {
    margin-top: -0.75vh;
  }
  >>> .el-form-item__error {
    margin-top: -1.8vh;
    margin-left: 9vw;
    font-size: 1em;
  }
  .loginBtn {
    width: 19vw;
    height: 6vh;
    border-radius: 3vh;
    background-color: RGB(30,52,91);
    font-size: 1.375em;
    margin-top: 20px;
  }
</style>

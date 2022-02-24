<template>
  <div class="HelloWorld">
    <div class="newUrl">
      <el-button type="primary" style="float: right;margin-right: 20px" @click="handleNew"><i class="el-icon-plus"></i>&nbsp;新增</el-button>
    </div>
    <div class="table">
      <el-table
          :data="tableData"
          style="width: 100%; font-size: 20px"
          :header-cell-style="{background:'#eef1f6',color:'#ffffff'}">
        <el-table-column
            label="id"
            width="500" >
          <template slot-scope="scope">
            <span style="margin-left: 10px; color: white">{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column
            label="场站地址"
            width="500">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium" @click="urlClick(scope.$index, scope.row)">{{ scope.row.record }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
                size="mini"
                type="primary"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>

<!--            <el-button-->
<!--                size="mini"-->
<!--                type="danger"-->
<!--                @click="handleDelete(scope.$index, scope.row)">删除</el-button>-->



            <!-- 新增场站备注dialog -->
            <el-dialog title="添加新场站备注" :visible.sync="dialogFormVisible" :data="scope.row">
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


          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import request from "@/network/request";

export default {
  data() {
    return {
      tableData: [],
      formLabelWidth: '120px',
      dialogFormVisible : false,
      urlDialogVisible: false,
      formData: {
        id: 1,
        record: "未分配",
        url: ""
      }
    }
  },
  created() {
    request({
      method: 'get',
      url: '/url/get',
    }).then((res) => {
      console.log(res.data.data)
      this.tableData = res.data.data
      this.formData.id = this.tableData.length + 1;
    })
  },
  methods: {
    handleEdit(index, row) {
      // console.log(index, row);
      this.dialogFormVisible = true;
      this.formData.id = row.id;
      this.formData.record = row.record;
      console.log(row.record);
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
      this.formData.id = this.tableData.length + 1
      this.formData.url = "39.105.29.195/"
      this.formData.record = ""
      this.urlDialogVisible = true;
    },
    urlClick(index, row){
      console.log(index, row);
      window.open("http://"+this.tableData[index].url,"_blank");
    },
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
    }
  }
}
</script>

<style>
.el-table, .el-table__expanded-cell {background-color: transparent !important;}
.el-table th, .el-table tr, .el-table td {background-color: transparent !important;}

/* 去掉中间数据的分割线 */
.el-table__row>td{border: none;}
/* 去掉上面的线 */
.el-table th.is-leaf{border: none;}
/* 去掉最下面的那一条线 */
.el-table::before {height: 0px;}

</style>

<template>
  <div class="header-container">
    <el-row>
      <div class="logo-image">
        <img src="@/assets/logo.png" />
      </div>
    </el-row>
    <div class="header-title" style="font-size: 30px">
      <div style="font-size: 30px">昊业怡生科技有限公司信息化平台</div>
    </div>
<!--    <div class="newUrl">-->
<!--      <el-button type="primary" style="float: right;margin-right: 20px" @click="handleNew"><i class="el-icon-plus"></i>&nbsp;新增</el-button>-->
<!--    </div>-->
  </div>
</template>

<script>
export default {
  name: 'page-header',
  // methods: {
  //   handleNew(){
  //     this.formData.id = this.tableData.length + 1
  //     this.formData.url = "39.105.29.195/"
  //     this.formData.record = ""
  //     this.urlDialogVisible = true;
  //   },
  // }
}
</script>

<style>
  .header-container {
    text-align: center;
    width: 100%;
    color: #000000;
    display: flex;
    background-color: transparent;
  }
  .header-title {
    width: 100%;
    padding-top: 2vh;
    font-size: 1.5vw;
    font-weight: bolder;
    letter-spacing: 10px;
    text-align: left;
  }
</style>

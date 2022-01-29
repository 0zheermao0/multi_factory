<template>
  <div class="header-container">
    <el-row>
      <div class="logo-image">
        <img src="@/assets/logo.png" />
      </div>
    </el-row>
    <div class="header-title" style="font-size: 30px">
      <div style="font-size: 30px">昊业怡生科技有限公司场站分岔路</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'page-header'
}
</script>

<style>
  .header-container {
    text-align: center;
    width: 100%;
    color: #ffffff;
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

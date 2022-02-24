<template>
  <div class="container">
<!--    <div class="background">-->
<!--      <img class="bgIMG" src="@/assets/background.jpg">-->
<!--    </div>-->
<!--    <div class="global">-->
<!--      <page-header></page-header>-->
<!--      <div id="app">-->
<!--        <HelloWorld/>-->
<!--&lt;!&ndash;        <Main/>&ndash;&gt;-->
<!--      </div>-->
<!--    </div>-->
    <div>
      <page-header/>
      <MainPage/>
    </div>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
// import PageHeader from "@/components/header";
import MainPage from "@/components/MainPage";
import PageHeader from "@/components/header";

export default {
  name: 'App',
  components: {
    PageHeader,
    // PageHeader,
    // HelloWorld
    MainPage
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*margin-top: 60px;*/
}
.background{
  width: 100%;
  height: 100%;
  position: fixed;
  background-size: 100% 100%;
  background: url("assets/background.jpg") local no-repeat;
  z-index: -1;
}
.bgIMG {
  width: 100%;
  height: 100%;
}
</style>

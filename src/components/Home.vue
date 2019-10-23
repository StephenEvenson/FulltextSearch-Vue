<template>
  <div>
    <el-container class="home-container">
      <el-header class="home-header">
        <span class="home_title">智慧工厂</span>
      </el-header>
    <el-container>
    <el-aside width="180px" class="home-aside">
      <div style="display: flex;justify-content: flex-start;width: 180px;text-align: right;">
        <el-menu style="background: #ececec;width: 180px;" unique-opened router>
          <el-menu-item width="180px"
                        style="padding-left: 30px;padding-right:0px;margin-left: 0px;width: 170px;text-align: left"
                        index="/emp">
            <i class="el-icon-user-solid"></i>
                        员工管理
                        </el-menu-item>
          <el-menu-item width="180px"
                        style="padding-left: 30px;padding-right:0px;margin-left: 0px;width: 170px;text-align: left"
                        index="/image">
            <i class="el-icon-camera-solid"></i>
            图片管理
          </el-menu-item>

        </el-menu>
      </div>
    </el-aside>
    <el-main>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item v-text="this.$router.currentRoute.name"></el-breadcrumb-item>
      </el-breadcrumb>
      <keep-alive>
        <router-view v-if="this.$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!this.$route.meta.keepAlive"></router-view>
    </el-main>
    </el-container>
    </el-container>
  </div>
</template>
<script>
  export default{
    data(){
      return {
      }
    },
      methods:{
          computed: {
              user(){
                  return this.$store.state.user;
              },
              routes(){
                  return this.$store.state.routes
              }
          }
      }
  }
</script>
<style>
  .home-container {
    height: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
  }

  .home-header {
    background-color: #20a0ff;
    color: #333;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: content-box;
    padding: 0px;
  }

  .home-aside {
    background-color: #ECECEC;
    height: 100%;
  }

  .home-main {
    background-color: #fff;
    color: #000;
    text-align: center;
    margin: 0px;
    padding: 0px;;
  }

  .home_title {
    color: #fff;
    font-size: 22px;
    display: inline;
    margin-left: 8px;
  }

  .home_userinfo {
    color: #fff;
    cursor: pointer;
  }

  .home_userinfoContainer {
    display: inline;
    margin-right: 20px;
  }

  .el-submenu .el-menu-item {
    width: 180px;
    min-width: 175px;
  }
</style>

<template>
  <div>
  <div>
  <el-form :rules="rules" class="login-container" label-position="left" :model="loginForm"
           label-width="0px" v-loading="loading">
    <h3 class="login_title">系统登录</h3>
    <el-form-item prop="username">
      <el-input type="text" v-model="loginForm.username"
                auto-complete="off" placeholder="账号" @keyup.enter.native="moveMouse"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input type="password" v-model="loginForm.password" ref="pswd"
                auto-complete="off" placeholder="密码" @keyup.enter.native="submitClick" show-password></el-input>
    </el-form-item>
    <el-form-item style="width: 100%">
      <el-button type="primary" style="width: 100%" @click="submitClick">登录</el-button>
    </el-form-item>
  </el-form>
  </div>
    <div ref="three_canvas" class="three_canvas"></div>
  </div>
</template>
<script>
  import * as THREE from "three"
  export default{
    data(){
      return {
          controls: {
              scene: null,
              camera: null,
              renderer: null,
              rotationSpeed: 0.03,
              width: null,
              height: null
          },
        rules: {
          username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
          password: [{required: true, message: '请输入密码', trigger: 'blur'}]
        },
        checked: true,
        loginForm: {
          username: '',
          password: ''
        },
        loading: false
      }
    },
    created () {
        this.$nextTick(() => {
            this.init()
        })
    },
    methods: {                                              //判断登录信息
      submitClick: function () {
        var _this = this;
        this.loading = true;
        this.postRequest('/login', {
          user: this.loginForm.username,
          password: this.loginForm.password
        }).then(resp=> {
          _this.loading = false;
          if (resp && resp.status == 200) {
            var data = resp.data;
            if(!data.login){
                if(data.at=="user"){
                    _this.$message.error('用户名错误！');
                }else if(data.at=="password"){
                    _this.$message.error('密码错误！');
                }
            }else{
                _this.$message({
                    message: '登陆成功！',
                    type: 'success'
                });
                _this.$router.replace("/home");
            }
          }
        });
      },

        moveMouse(){
            this.$refs.pswd.focus();
        },

        init () {
            let {initMesh, controls} = this;
            initMesh();
        },
        initMesh () {
            this.width = 200;
            this.height = 200;
            this.scene = new THREE.Scene(); // 场景
            this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 0.1, 1000); // 相机.视场，长宽比，近面，远面
            this.camera.position.x = 0;
            this.camera.position.y = 0;
            this.camera.position.z = 30;
            this.camera.lookAt(this.scene.position)

            this.renderer = new THREE.WebGLRenderer({ antialias: true })// 渲染器
            this.renderer.setSize(this.width, this.height)
            this.renderer.setClearColor(0xFFFFFF, 1.0);

            let cubeGeometry = new THREE.CubeGeometry(10, 10, 10)
            let cubeMaterial = new THREE.MeshNormalMaterial()
            this.cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
            this.cube.position.x = 0
            this.cube.position.y = 0
            this.cube.position.z = 0
            this.cube.castShadow = true

            let spotLight = new THREE.SpotLight(0xffffff)
            this.scene.add(this.cube)
            this.scene.add(spotLight)

            this.$refs.three_canvas.append(this.renderer.domElement)
            this.renderScene()
        },
        renderScene () {
            let {controls, cube, scene, camera, renderer} = this;
            cube.rotation.x += controls.rotationSpeed;
            cube.rotation.z += controls.rotationSpeed;
            requestAnimationFrame(this.renderScene);
            renderer.render(scene, camera)
        }
    }
  }
</script>
<style>
  .login-container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 90px auto 80px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }
  .login_title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
  .login_remember {
    margin: 0px 0px 35px 0px;
    text-align: left;
  }
</style>

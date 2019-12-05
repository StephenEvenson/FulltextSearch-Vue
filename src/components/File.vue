<template>
  <div>
  <div style="display: inline" v-loading="fullscreenLoading">
    <el-input
      placeholder="请输入搜索内容...."
      clearable
      style="width: 300px;margin: 0px;padding: 0px;"
      size="medium"
      @keyup.enter.native="searchEmp"
      prefix-icon="el-icon-search"
      v-model="keywords">
    </el-input>
    <el-button type="primary" size="medium" style="margin-left: 5px" icon="el-icon-search" @click="searchEmp">搜索
    </el-button>
  </div>
    <el-form :model="files" style="width: 90%;margin-left: 3%">
    <div v-for="(item,key) in files" :key="key" >
      <el-row>
        <div align="left" class="nameTitle">{{item.title}}</div>
      </el-row>
      <el-row>
      <div v-for="i in item.highlight">
      <div align="left" class="nameContent" v-html="i">{{i}}</div>
      </div>
      </el-row>
      <el-divider></el-divider>
    </div>
    </el-form>
  </div>
</template>

<script>

    export default {
        data(){
            return{
            keywords:'',
            files:[],
            fullscreenLoading: false,
            }
        },
        methods:{
            searchEmp() {
                this.files=[];
                var _this=this;
                this.fullscreenLoading = true;
                this.getRequest("/search?q="+this.keywords).then(resp=>{
                    _this.fullscreenLoading = false;
                    var data=resp.data;
                    console.log(data);
                    for(var i=0;i<data.length;i++) {
                        _this.files.push({
                            title: data[i].title,
                            highlight: data[i].highlight,
                            content: data[i].content,
                        })
                    }
                })
            },
        }
    }
</script>

<style>
  .nameTitle{
    font-size: x-large;
    color: #0025b2;
    font-family: system-ui,STKaiti,”黑体”,”宋体”,sans-serif;
    line-height: 40px;
  }
  .nameContent{
    font-family: system-ui,STKaiti,”黑体”,”宋体”,sans-serif;
  }
  em{
    color: red;
    font-weight: bold;
    font-style: normal;
  }
</style>

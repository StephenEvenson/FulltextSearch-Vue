<template>
  <div class="img-list">
  <div class="img-content" v-for="(item,key) in imagelist" :key="key">
    <img :src="item.url">
    <div class="name" v-for="i in imagelist">
      <div>名字：{{ item.personName }}  {{ item.text }}</div>
      <div>{{ item.text }}</div>
    </div>
    <!-- 删除icon -->
    <div class="del" @click="handleFileRemove(item,key)">
      <i class="el-icon-delete"></i>
    </div>
    <!-- 放大icon -->
    <div class="layer" @click="handleFileEnlarge(item.url)">
      <i class="el-icon-view"></i>
    </div>
  </div>
    <!--上传状态-->
    <div class="img-upload">
      <div v-if="!pass && progress !== 0" class="img-content img-progress">
        <el-progress type="circle" :percentage="progress" :status="proStatus"></el-progress>
      </div>
      <el-upload class="uploader" accept="image/*"
                 ref="upload"
                 list-type="picture-card"
                 :show-file-list="false"
                 :action="params.action"
                 :on-change="uploadOnChange"
                 :on-success="uploadOnSuccess"
                 :on-error="uploadOnError"
                 :on-progress="uploadOnProgress"
                 :auto-upload="false">
        <i slot="default" class="el-icon-plus" style="font-size: 80px"></i>
      </el-upload>
    </div>
    <el-dialog title="" :visible.sync="isEnlargeImage" size="large" :modal-append-to-body="false" top="8%" width="60%">
      <img @click="isEnlargeImage = false" style="width:100%;" :src="enlargeImage">
    </el-dialog>
  </div>
</template>
<script>

  import img from "../../static/images.json"

    export default{
        name: 'upload-list',
        data(){
            return {
                pass: null,//是否上传成功
                isEnlargeImage: false,//放大图片
                progress: 0,//上传进度
                enlargeImage: '',//放大图片地址
                params: {
                    action: 'http://sp.stephenj.me:800/imgFile',
                },
                imagelist: []
            }
        },
        computed: {
            proStatus(){//上传状态
                if(this.pass){
                    return 'success'
                }else if(this.pass == false){
                    return 'exception'
                }else{
                    return ''
                }
            }
        },

        mounted: function () {
            this.loadPictures();
        },

        methods: {
            loadPictures(){
                var _this = this;
                this.imagelist=img.images;
                for(var i=0;i<this.imagelist.length;i++){
                    this.imagelist[i].url=require("../../static/images/"+this.imagelist[i].url);
                    console.log(this.imagelist[i].url);
                }
               // console.log(img.images);
            },


            handleFileEnlarge(_url){//放大图片
                console.log(_url)
                if(_url){
                    this.enlargeImage = _url;
                    this.isEnlargeImage = !this.isEnlargeImage;
                }
            },

            handleFileRemove(file,i){//删除图片
                console.log(file,i)
                if(!file.url){
                    return false;
                }
                let that = this;
                this.$confirm('是否删除此图片？','提示',{
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    //可添加ajax
                    this.$message.success("删除成功")
                    this.$message({
                        type: 'success',
                        message: '删除成功',
                        onClose: () => {
                            that.imagelist.splice(i,1)
                        }
                    })
                }).catch((meg) => console.log(meg))
            },


            uploadOnProgress(e,file){//开始上传
                console.log(e.percent,file)
                this.progress = Math.floor(e.percent)
            },
            uploadOnChange(file){
                console.log("——————————change——————————")
                // console.log(file)
                if(file.status == 'ready'){
                    console.log("ready")
                    this.$nextTick(() => {
                        this.$refs.upload.submit();
                    })
                    //重置progress组件
                    this.pass = null;
                    this.progress = 0;
                }else if(file.status == 'fail'){
                    this.$message.error("图片上传出错，请刷新重试！")
                }
            },
            uploadOnSuccess(e,file){//上传附件
                console.log("——————————success——————————")
                this.pass = true;
                this.$message.success("上传成功");
                file.url=require('../../static/images/1.jpeg');
                //file.url=require('../../static/images/'+e.image);
                this.imagelist.push({
                    url: file.url,
                    //personName: e.name,
                    //text:e.text
                })
                console.log(this.imagelist);
            },
            uploadOnError(e,file){
                console.log("——————————error——————————")
                console.log(e)
                this.pass = false;
            }
        }
    }
</script>

<style>
  *{
    box-sizing: border-box;
  }
  .img-list{
    overflow:hidden;
    width:100%;
  }
  .img-list .img-content{
    float:left;
    position:relative;
    display:inline-block;
    width:200px;
    height:270px;
    padding:5px;
    margin:5px 20px 20px 0;
    border:1px solid #d1dbe5;
    border-radius:4px;
    transition:all .3s;
    box-shadow:0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
  }
  .img-list .img-content img{
    display:block;
    width:100%;
    height:190px;
    margin:0 auto;
    border-radius:4px;
  }
  .img-list .img-content .name{
    margin-top:10px;
  }
  .img-list .img-content .name>div{
    width:90%;
    text-overflow:ellipsis;
    overflow:hidden;
    height:25px;
    line-height:25px;
  }
  .img-list .img-content:hover .del,
  .img-list .img-content:hover .layer{
    opacity:1;
  }
  .img-list .img-content .del,
  .img-list .img-content .layer{
    opacity:0;
    transition:all .3s;
  }
  .img-list .img-content .del{
    position:absolute;
    bottom:10px;
    right:10px;
    color:#8492a6;
    cursor:pointer;
    font-size:1.1em;
  }
  .img-list .img-content .layer{
    position:absolute;
    left:0;
    right:0;
    top:0;
    height:200px;
    color:#fff;
    text-align:center;
    z-index:5;
    background-color:rgba(0,0,0,.4);
  }
  .img-list .img-content .layer i{
    font-size:1.6em;
    margin-top:80px;
  }
  .img-list .img-upload{
    float:left;
    width:200px;
    height:270px;
    display:table;
    text-align:center;
  }
  .img-list .uploader{
    width:100%;
    display:table-cell;
    vertical-align:middle;
  }
  .img-list .img-progress{
    text-align:center;
    padding-top:50px;
  }
  .el-upload--picture-card {
    height: 200px !important;
    width: 200px !important;
    line-height: 250px !important;
  }
  .picture .el-icon-plus {
    font-size: 80px !important;
  }
</style>

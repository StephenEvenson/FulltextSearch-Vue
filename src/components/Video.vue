<template>
  <div>
  <el-upload
    style="margin-top: 15px;"
    action="#"
    list-type="picture-card"
    :auto-upload="false"
    :file-list="files"
     ref="upload">
    <i slot="default" class="el-icon-plus"></i>
    <div  slot="file" slot-scope="{file}">
      <img
        class="el-upload-list__item-thumbnail"
        :src="file.url" alt=""
      >
      <span class="el-upload-list__item-actions">
        <span
        class="el-upload-list__item-preview"
        @click="handlePictureCardPreview(file)"
      >
          <i class="el-icon-zoom-in"></i>
        </span>

        <span
          @click="loadPictures(file)"
        >
          <i class="el-icon-upload2"></i>
        </span>

        <span
          class="el-upload-list__item-delete"
          @click="handleRemove(file,fileList)"
        >
          <i class="el-icon-delete"></i>
        </span>
      </span>
    </div>
  </el-upload>
  <el-dialog :visible.sync="dialogVisible">
    <img width="100%" :src="dialogImageUrl" alt="">
  </el-dialog>
  </div>
</template>

<script>
    export default {
        data() {
            return {
                pic:[],
                files:[],
                pictures:[{url:'http://localhost:8080/home/stephen/ShowImages/'}],
                dialogImageUrl: '',
                dialogVisible: false,
                disabled: false
            };
        },
        mounted: function () {
            //this.loadPictures();
        },
        methods: {
            handleRemove(file,fileList) {
                //this.clarFiles();
                //file="";
               // removeOper(this.form.avatar, val.url, 'url');
                //console.log(file);
                console.log(this.files);
            },

           /* handleRemove(file, fileList) {
                console.log(file, fileList);
                let a = file.url
                console.log(a)
                let b = this.pic.indexOf(a)
                console.log(b)
                this.pic.splice(b,1)
                this.$refs.upload.splice(b,1)
                console.log(this.pic)
            },*/



            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
                console.log(files);
            },
            loadPictures(file) {
                var _this = this;
                console.log(file);
                console.log(file.url);
                var form = new FormData();
                form.append("file",file.raw);
                this.uploadFileRequest("/imgFile",form).then(resp => {
                    if (resp && resp.status == 200) {
                        _this.pictures = resp.data;
                        console.log(_this.pictures);
                    }
                })
                //file.url="192.168.0.158/Coulson.png";
                //file.url=window.URL.createObjectURL(file.item[0]);
                //file.url=require('../../static/1.jpeg');
                file.url=require('../../static/1.jpeg');
                this.fileList.push(file.url);
                console.log(this.fileList);
            }
        }
  }
</script>

<style>
  .user-info {
    font-size: 12px;
    color: #09c0f6;
  }
  .el-upload-list--picture-card .el-upload-list__item {
    height: 130px;
    width: 130px;
  }
  .el-upload--picture-card {
    height: 130px;
    width: 130px;
    line-height: 130px;
  }
</style>

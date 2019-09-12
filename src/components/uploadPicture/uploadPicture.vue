<template>
  <div>
    <el-dialog
      :visible.sync="dialogPicture"
      width="1100px"
      class="uploadPicture"
      :before-close="closeDialog">
      <div slot="title">
        <ul class="clearfix tit-tabs">
          <li
            class="fl item"
            :class="{active:tabsidx==index}"
            v-for="(item,index) in tabsBtn"
            :key="index"
            @click="handelTabs(index)"
          >{{item.text}}</li>
        </ul>
      </div>

      <div class="content">

        <!-- 平台开始 -->
        <div class="item-wrap" v-show="tabsidx==0">
          <div class="btn-wrap">
            <el-button type="danger" size="small">删除</el-button>
            <el-upload
              style="width:120px;display:inline"
              :action="baseUrl + url.File.AddImage"
              :show-file-list="false"
              :before-upload="beforeAvatarUpload"
              :http-request="imgRequest">
              <el-button type="primary" size="small">上传图片</el-button>
            </el-upload>
          </div>

          <div class="top-wrap">
            <div class="group-wrap">
              <div class="top">
                <i class="iconfont icon-plus-circle"></i>
                <span class="add-group">添加分组</span>
              </div>
              <div class="group-list">
                <div
                  class="item"
                  :class="{active:ptGroupIdx == index}"
                  v-for="(item,index) in ptGroupData"
                  :key="index"
                  @click="changeTab(item,index)">
                  <i class="iconfont icon-folder-add"></i>
                  <span class="name">组名</span>
                </div>
              </div>
            </div>
            <!-- 列表开始 -->
            <div class="list-wrap">
              <div
                v-for="(item,index) in ptListData"
                :key="index"
                class="item"
                :class="{active:item.active}"
                :style="{backgroundImage:`url(${item.url})`}"
                @click="selectImage(item)">
                <div class="name ellipsis">{{item.name}}</div>
                <div class="mask">
                  <i class="iconfont icon-check"></i>
                </div>
                <!-- <div class="del">
                    <i class="iconfont icon-delete"></i>
                  </div> -->
                <div class="del-border">
                  <div class="del" @click.stop="ptDelImage(item)">
                    <i class="iconfont icon-delete"></i>
                  </div>
                </div>
              </div>
            </div>
            <!-- 列表end -->
          </div>
          <div class="bottom">
            <el-row>
              <el-col :span="4">
                <el-checkbox v-model="cheakAll" @change="ptCheckAll" class="checkAll">全选</el-checkbox>
              </el-col>
              <el-col :span="20" style="text-align: center;">
                <el-pagination
                  ref="paging" 
                  class="pagination"
                  @size-change="handleSize" 
                  @current-change="handleCurrent" 
                  :current-page.sync="curPage" 
                  :page-sizes="[10, 20, 30, 50]" 
                  :page-size="pageSize" 
                  layout="sizes, prev, slot, next" 
                  prev-text="上一页" next-text="下一页" 
                  :total="totalNums">
                  <span style="text-align: center;">{{curPage}}/{{totalPages}}</span>
                </el-pagination>
              </el-col>
            </el-row>
          </div>
        </div>
        <!-- 平台end -->

        <!-- 本地服务开始 -->
        <div class="item-wrap" v-show="tabsidx==1">
          <div class="btn-wrap">
            <el-button type="danger" size="small">删除</el-button>
            <el-button type="primary" size="small">上传图片</el-button>
          </div>
          sdg
        </div>
        <!-- 本地服务end -->

        <!-- 提取网络照片 -->
        <div class="item-wrap" v-show="tabsidx==2">
          <div class="pic-top">
            <img src="../../assets/nopic.png" alt="">
          </div>
          <div class="desc-tip">输入图片链接</div>
          <el-input class="pic-input" v-model="picSrc" size="small" placeholder="图片链接"></el-input>
          <el-button class="zhbtn" size="small">转化</el-button>
        </div>
        <!-- 提取网络照片end -->
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogPicture = false">取 消</el-button>
        <el-button size="small" type="primary" @click="dialogPicture = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  props: {
    value: [Boolean]
  },
  data() {
    return {
      dialogPicture: this.value,
      totalNums:0,
      curPage: 1,
      pageSize: 10,
      totalPages:1,
      tabsidx: 0,
      tabsBtn: [
        { text: "平台" },
        { text: "本地服务器" },
        { text: "提取网络图片" }
      ],
      ptGroupIdx: 0,
      ptGroupData: [{ text: "组名" }, { text: "组名" }, { text: "组名" }],
      cheakAll:false,
      ptListData: [
        {
          url:"https://wx.tianranzhu777.com/web/index.php?c=utility&a=wxcode&do=image&attach=http%3A%2F%2Fmmbiz.qpic.cn%2Fmmbiz_jpg%2F9IYw9GvXVmCILWZVVWFOnIpDRu3wlrqkvJ1bXEHheNkMrqtcZw1SMByaw6TBKtuvuyKZjjIuarNa7sW16V4NGQ%2F0%3Fwx_fmt%3Djpeg",
          name: "测试图片哦",
          active: false
        },
        {
          url:"https://wx.tianranzhu777.com/web/index.php?c=utility&a=wxcode&do=image&attach=http%3A%2F%2Fmmbiz.qpic.cn%2Fmmbiz_jpg%2F9IYw9GvXVmCILWZVVWFOnIpDRu3wlrqkvJ1bXEHheNkMrqtcZw1SMByaw6TBKtuvuyKZjjIuarNa7sW16V4NGQ%2F0%3Fwx_fmt%3Djpeg",
          name: "测试图片哦",
          active: false
        },
        {
          url:"https://wx.tianranzhu777.com/web/index.php?c=utility&a=wxcode&do=image&attach=http%3A%2F%2Fmmbiz.qpic.cn%2Fmmbiz_jpg%2F9IYw9GvXVmCILWZVVWFOnIpDRu3wlrqkvJ1bXEHheNkMrqtcZw1SMByaw6TBKtuvuyKZjjIuarNa7sW16V4NGQ%2F0%3Fwx_fmt%3Djpeg",
          name: "测试图片哦",
          active: false
        },
        {
          url:"https://wx.tianranzhu777.com/web/index.php?c=utility&a=wxcode&do=image&attach=http%3A%2F%2Fmmbiz.qpic.cn%2Fmmbiz_jpg%2F9IYw9GvXVmCILWZVVWFOnIpDRu3wlrqkvJ1bXEHheNkMrqtcZw1SMByaw6TBKtuvuyKZjjIuarNa7sW16V4NGQ%2F0%3Fwx_fmt%3Djpeg",
          name: "测试图片哦",
          active: false
        },
        {
          url:"https://wx.tianranzhu777.com/web/index.php?c=utility&a=wxcode&do=image&attach=http%3A%2F%2Fmmbiz.qpic.cn%2Fmmbiz_jpg%2F9IYw9GvXVmCILWZVVWFOnIpDRu3wlrqkvJ1bXEHheNkMrqtcZw1SMByaw6TBKtuvuyKZjjIuarNa7sW16V4NGQ%2F0%3Fwx_fmt%3Djpeg",
          name: "测试图片哦",
          active: false
        },
        {
          url:"https://wx.tianranzhu777.com/web/index.php?c=utility&a=wxcode&do=image&attach=http%3A%2F%2Fmmbiz.qpic.cn%2Fmmbiz_jpg%2F9IYw9GvXVmCILWZVVWFOnIpDRu3wlrqkvJ1bXEHheNkMrqtcZw1SMByaw6TBKtuvuyKZjjIuarNa7sW16V4NGQ%2F0%3Fwx_fmt%3Djpeg",
          name: "测试图片哦",
          active: false
        },
        {
          url:"https://wx.tianranzhu777.com/web/index.php?c=utility&a=wxcode&do=image&attach=http%3A%2F%2Fmmbiz.qpic.cn%2Fmmbiz_jpg%2F9IYw9GvXVmCILWZVVWFOnIpDRu3wlrqkvJ1bXEHheNkMrqtcZw1SMByaw6TBKtuvuyKZjjIuarNa7sW16V4NGQ%2F0%3Fwx_fmt%3Djpeg",
          name: "测试图片哦",
          active: false
        },
        {
          url:"https://wx.tianranzhu777.com/web/index.php?c=utility&a=wxcode&do=image&attach=http%3A%2F%2Fmmbiz.qpic.cn%2Fmmbiz_jpg%2F9IYw9GvXVmCILWZVVWFOnIpDRu3wlrqkvJ1bXEHheNkMrqtcZw1SMByaw6TBKtuvuyKZjjIuarNa7sW16V4NGQ%2F0%3Fwx_fmt%3Djpeg",
          name: "测试图片哦",
          active: false
        },
      ],
      picSrc:''
    };
  },
  created() {},
  computed: {
    ...mapState({
      // dialogPicture:state => state.uploadPicture.dialogPicture
    })
  },
  methods: {
    handelTabs(idx) {
      let _this = this;
      _this.tabsidx = idx;
    },
    closeDialog(done) {
      done();
      // this.$store.commit('setDialogPicture',false)
    },
    changeTab(item, index) {
      let _this = this;
      _this.ptGroupIdx = index;
    },
    selectImage(item) {
      let _this = this
      if (item.active) {
        item.active = false
      } else {
        item.active = true
      }
    },
    ptDelImage(item){
      console.log(item)
    },
    ptCheckAll(value){
      // console.log(value)
      let _this = this
      if(value){
        _this.ptListData.map((item,index)=>{
          item.active = true
        })
      }else{
        _this.ptListData.map((item,index)=>{
          item.active = false
        })
      }
    },
    handleCurrent(currentVal){
      this.curPage = currentVal
      // this.getList()
    },
    handleSize(sizeVal){
      this.pageSize = sizeVal
      this.curPage = 1
      // this.getList()
    },
    beforeAvatarUpload(file){
      // console.log(file)
      // const isJPG = file.type === 'image/jpeg/png'
      // const isLt2M = file.size / 1024 / 1024 < 2
      // if (!isJPG) {
      //   this.$message.error('上传头像图片只能是 JPG 格式!')
      // }
      // if (!isLt2M) {
      //   this.$message.error('上传头像图片大小不能超过 2MB!')
      // }
      // return isJPG && isLt2M
    },
    // imgRequest(obj){
    //   // console.log(obj)
    //   // return
    //   let _this = this
    //   let imgFile = obj.file

    //   // let img = URL.createObjectURL(imgFile)
    //   // console.log(img)
    //   // return
      
    //   let params = {
    //     token:_this.$utils.getToken(),
    //     role_type:_this.url.role_type,
    //     file:imgFile
    //   }
    //   console.log(params)
    //   _this.$http.get(_this.baseUrl + _this.url.File.AddImage,{
    //     params
    //   }).then((res)=>{
    //     if(res.data.ret==200){
    //       console.log(res)
    //     }
    //   })
    // },
    imgRequest(obj){
      let _this = this
      let fileObj = obj.file
      let form = new FormData()
      form.append("file", fileObj)
      form.append("token", _this.$utils.getToken())
      form.append("role_type", _this.url.role_type)

      _this.$http({
          method:'post',
          url:_this.baseUrl + _this.url.File.AddImage,
          data:form,
          headers:{
            'Content-Type': 'multipart/form-data'
          }
        }).then((res)=>{
        if(res.data.ret==200){

        }
      })
      console.log(form.get('file'))
    },
    handleAvatarSuccess(res,file){
      // this.imageUrl = URL.createObjectURL(file.raw)
      let _this = this
    },
    handleAvatarError(err, file, fileList){
      console.log(err)
    }
  },
  watch: {
    value(val) {
      this.dialogPicture = val;
    },
    dialogPicture(val, oldVal) {
      if (val != oldVal) {
        this.$emit("input", val);
      }
    }
  }
};
</script>
<style lang="less" scoped>
@import url("./css/uploadPicture.less");
.tit-tabs {
  .item {
    padding: 8px 10px;
    margin-right: 15px;
    border-radius: 5px;
    font-size: 14px;
    &:hover {
      cursor: pointer;
      background: #409eff;
      color: #fff;
    }
  }
  .active {
    background: #409eff;
    color: #fff;
  }
}
</style>
<style lang="less">
.uploadPicture {
  .el-dialog__footer {
    border-top: 1px solid #eee;
  }
  .el-dialog__header {
    background: #f1f1f1;
  }
  .el-dialog__body {
    padding: 15px 0px 0px 0px;
  }
  // .checkAll{
  //   position: absolute;
  //   bottom: -45px;
  //   left: 50px;
  // }
  .pic-input{
    .el-input__inner{
      width: 500px;
      text-align: center;
    }
  }
}
</style>
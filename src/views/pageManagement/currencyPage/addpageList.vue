<template>
  <div class="bg-white py-2 px-1 rounded wrap box-shadow-page">
    <yTitle>新增页面</yTitle>
    <div class="content bg-gray rounded mt-2 p-1">
      <div class="form-wrap bg-white pt-3">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px">
          <div class="d-flex">
            <el-form-item label="页面分类" prop="roleType" required>
              <ySelect
              v-model="ruleForm.roleType" 
              :options="ruleRoleTypeOptions"
              @changeSel="getPageCates" placeholder="选择适用场景"></ySelect>
            </el-form-item>
            <el-form-item label="--" prop="pageType" class="merge">
              <ySelect
                v-model="ruleForm.pageType" 
                :options="pageTypeOptions"
                placeholder="选择页面分类"></ySelect>
            </el-form-item>
          </div>
          
          <el-form-item label="页面标题" prop="name">
            <el-input size="small" class="item" 
              v-model="ruleForm.name" placeholder="请输入标题"
              maxlength="60" show-word-limit></el-input>
          </el-form-item>
          <el-form-item label="页面类型" prop="type" class="hideradio">
            <el-radio-group v-model="ruleForm.type">
              <el-radio :label="1">
                <div class="wrap-item p-1" :class="{'border-blue-solid':ruleForm.type=='1'}">
                  <div class="img">
                    <img src="../../../assets/weimeng.png" alt="">
                  </div>
                  <p class="desc mt-1">通用列表</p>
                </div>
              </el-radio>
              <el-radio :label="2">
                <div class="wrap-item p-1" :class="{'border-blue-solid':ruleForm.type=='2'}">
                  <div class="img">
                    <img src="../../../assets/weimeng.png" alt="">
                  </div>
                  <p class="desc mt-1">通用详情</p>
                </div>
              </el-radio>
              <el-radio :label="3">
                <div class="wrap-item p-1" :class="{'border-blue-solid':ruleForm.type=='3'}">
                  <div class="img">
                    <img src="../../../assets/weimeng.png" alt="">
                  </div>
                  <p class="desc mt-1">通用表单</p>
                </div>
              </el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="页面路径" prop="pageUrl">
            <el-input size="small" class="item" 
              v-model="ruleForm.pageUrl" placeholder="请输入页面路径"></el-input>
          </el-form-item>
          <el-form-item label="Apiurl" prop="Apiurl">
            <el-input size="small" class="item" 
              v-model="ruleForm.Apiurl" placeholder="请输入Apiurl"></el-input>
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-radio-group v-model="ruleForm.status">
              <el-radio label="1">显示</el-radio>
              <el-radio label="0">隐藏</el-radio>
            </el-radio-group>
          </el-form-item>
          <!-- <el-form-item label="申请信息" prop="info">
            <el-input size="small" class="item" 
              v-model="ruleForm.info" placeholder="请输入..." 
              type="textarea"
              :rows="4"></el-input>
          </el-form-item> -->
        </el-form>
      </div>
    </div>
    <div class="footer py-2 bg-white">
      <el-button size="mini" style="padding:7px 35px;" @click="goBack()">取消</el-button>
      <el-button size="mini" type="primary" @click="goNext('ruleForm')">保存并下一步</el-button>
    </div>
  </div>
</template>
<script>
import ySelect from '@/components/ySelect/index'
export default {
  data(){
    return {
      ruleForm:{
        name:'',
        Apiurl:'',
        pageUrl:'',
        // info:'',
        status:'1',
        type:1,
        roleType:null,
        pageType:null
      },
      rules:{
        roleType:[
          {required: true, message: '请选择页面分类'}
        ],
        pageType:[
          {required: true, message: '请选择页面分类'}
        ],
        name:[
          {required: true, message: '请输入页面标题'}
        ],
        Apiurl:[
          {required: true, message: '请输入Apiurl'}
        ],
        pageUrl:[
          {required: true, message: '请输入页面路径'}
        ],
        // info:[
        //   {required: true, message: '请输入申请信息'}
        // ],
        type:[
          {required: true, message: '请选择页面类型'}
        ],
        status:[
          {required: true, message: '请选择页面状态'}
        ]
      },
      ruleRoleTypeOptions:[],
      pageTypeOptions:[]
    }
  },
  created(){
    this.GetRoleType().then(()=>{
      // this.getList()
    })
  },
  methods:{
    goBack(){
      this.$router.go(-1)
    },
    changePageCateSel(){

    },
    GetRoleType(){
      return new Promise((resolve,reject)=>{
        let _this = this
        _this.$http.post(_this.baseUrl + _this.url.common.GetRoleType,{
          role_type:_this.url.role_type,
          token:_this.$utils.getToken()
        }).then((res)=>{
          if(res.data.ret==200){
            // console.log(res.data.data)
            let data = res.data.data
            let arr = []
            // _this.options = data.map((item)=>{
            //   return {
            //     label:item.name,
            //     value:Number(item.role_type)
            //   }
            // })
            
            _this.roleTypeList = data.map((item)=>{
              return {
                label:item.name,
                value:Number(item.role_type)
              }
            })

            _this.ruleRoleTypeOptions = data.map((item)=>{
              return {
                label:item.name,
                value:Number(item.role_type)
              }
            })
          //  _this.options.unshift({label:'全部适用',value:-1})
          _this.ruleRoleTypeOptions.unshift({label:'全部',value:-1})
          //  _this.options.unshift({label:'选择适用场景',value:-2})
            resolve()
          }
        })
      })
    },
    getPageCates(roleType){
      return new Promise((resolve,reject)=>{
        let _this = this 
        if(roleType==-2){
          _this.pageTypeOptions = []
          return false
        }
        _this.$http.post(_this.baseUrl + _this.url.Common.GetAllValidCateList,{
          token:_this.$utils.getToken(),
          role_type:roleType || roleType == 0 ? roleType : -1
        }).then((res)=>{
          if(res.data.ret==200){
            let data = res.data.data
            _this.pageOptions = data.list.map((item,index)=>{
              return {
                label:item.name,
                value:Number(item.id)
              }
            })
            _this.pageTypeOptions = data.list.map((item,index)=>{
              return {
                label:item.name,
                value:Number(item.id)
              }
            })
            resolve(_this.pageOptions)
          }
        })
      })
    },
    goNext(formName){
      let _this = this

      _this.$refs[formName].validate((valid)=>{
        if(!valid){
          return false
        }
        _this.$http.post(_this.baseUrl + _this.url.Common.AddPage,{
          token:_this.$utils.getToken(),
          type:_this.ruleForm.type,
          cate_id:_this.ruleForm.pageType,
          name:_this.ruleForm.name,
          path:_this.ruleForm.pageUrl,
          api_url:_this.ruleForm.Apiurl,
          is_drafts:1,
          status:_this.ruleForm.status
        }).then((res)=>{
          if(res.data.ret==200){
            _this.$message({
              type: 'success',
              message: '添加成功!'
            })
            setTimeout(()=>{
              _this.$router.push({
                path:'/pageManagement/currencyPage/customPage'
              })
            },500)
          }
        })
      })
    }
  },
  components:{
    ySelect
  }
}
</script>
<style lang="less" scoped>
.item{
  width: 40%;
}
.form-wrap{
  padding-bottom: 100px;
}
.wrap-item{
  border: 1px dashed #eee;
  .img{
    width: 100px;
    height: 50px;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .desc{
    text-align: center;
  }
}
.border-blue-solid{
  border: 1px solid #2589FF;
}
.footer{
  width: calc(100% - 274px);
  position: fixed;
  left: 263px;
  bottom: 0;
  box-shadow:0px 0px 3px 0px rgba(34,36,47,0.1);
  border-radius: 10px 10px 0 0;
  text-align: center;
}
</style>
<style lang="less">
.wrap{
  .hideradio{
    .el-radio__input{
      visibility: hidden !important;
    }
  }
}

</style>
<template>
  <div class="content bg-gray">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px">
      <el-form-item label="活动区域：" prop="scene">
        <!-- <el-select class="item" size="small" v-model="ruleForm.scene" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select> -->
        <ySelect v-model="ruleForm.scene" :options="options" :configs="configs"></ySelect>
      </el-form-item>
      <el-form-item label="标题：" prop="name">
        <el-input size="small" class="item" v-model="ruleForm.name" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="布局：" prop="layout">
        <el-radio-group v-model="ruleForm.layout">
          <el-radio class="theme-raido" label="default">
            <div class="wrap-item" :class="{'border-blue-dashed':ruleForm.layout=='default'}">
              <div class="img">
                <img src="../../assets/weimeng.png" alt="">
              </div>
              <p class="desc">微盟布局</p>
            </div>
          </el-radio>
          <el-radio class="theme-raido" label="youzan">
            <div class="wrap-item" :class="{'border-blue-dashed':ruleForm.layout=='youzan'}">
              <div class="img">
                <img src="../../assets/youzan.png" alt="">
              </div>
              <p class="desc">有赞布局</p>
            </div>
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="主题：" prop="theme">
          <el-radio-group v-model="ruleForm.theme">
            <el-radio label="red"><span class="yzcolor"></span>胭脂红</el-radio>
            <el-radio label="blue"><span class="tkcolor"></span>天空蓝</el-radio>
          </el-radio-group>
      </el-form-item>
      <el-form-item label="根字体：" prop="rootFontSize">
        <el-input 
          size="small" class="item" 
          placeholder="请输入根字体大小" 
          type="number"
          max="16"
          min="12"
          v-model="ruleForm.rootFontSize">
          <template slot="append">px</template>
        </el-input>
      </el-form-item>
      <el-form-item label="状态：" prop="status">
        <el-radio-group v-model="ruleForm.status">
          <el-radio label="1">可用</el-radio>
          <el-radio label="0">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <div class="bottom">
      <el-button @click="submitManage('ruleForm')" size="small" type="primary">保存</el-button>
      <el-button @click="goBackList" size="small">取消</el-button>
    </div>
  </div>
</template>
<script>
import ySelect from '@/components/ySelect/index'

export default {
  data(){
    return {
      configs:{
        disabled:false
      },
      manageId:'',
      options:[],
      ruleForm:{
        scene:0,
        name:'',
        layout:'1',
        theme:'1',
        status:'1',
        rootFontSize:''
      },
      rules:{
        name:[
          {required: true, message: '请输入侧边栏组的名称'}
        ],
        layout:[
          {required: true, message: '请输入侧边栏组的布局方式'}
        ],
        theme:[
          {required: true, message: '请输入侧边栏组的主题方式'}
        ],
        rootFontSize:[
          {required: true, message: '请输入根字体大小'}
        ],
        status:[
          {required: true, message: '请选择可用状态'}
        ]
      }
    }
  },
  created(){
    // console.log(this.$route.query)
    this.getRoleType()
    if(this.manageId = this.$route.query.id){
      this.getInfo()
      this.configs.disabled = true
    }
    
  },
  methods:{
    goBackList(){
      this.$router.go(-1)
    },
    submitManage(formName){
      let _this = this,
          url = '',
          params={};
      _this.$refs[formName].validate((valid)=>{
        if(!valid){
          return false
        }

        params = {
          token:_this.$utils.getToken(),
          role_type:_this.ruleForm.scene,
          name:_this.ruleForm.name,
          layout:_this.ruleForm.layout,
          theme:_this.ruleForm.theme,
          rootFontSize:_this.ruleForm.rootFontSize,
          status:_this.ruleForm.status
        }
        
        if(_this.manageId){
          url = _this.baseUrl + _this.url.manageFactory.EditManageById
          params.id = _this.manageId
        }else{
          url = _this.baseUrl + _this.url.manageFactory.AddManage
        }

        _this.$http.get(url,{
          params
        }).then((res)=>{
          if(res.data.ret==200){
            _this.$message({
              type: 'success',
              message: '更改成功!'
            })
            _this.goBackList()
          }
        })

      })
    },
    getInfo(){
      let _this = this
      _this.$http.get(_this.baseUrl + _this.url.manageFactory.GetManageInfoById,{
        params:{
          token:_this.$utils.getToken(),
          id:_this.manageId
        }
      }).then((res)=>{
        if(res.data.ret==200){
          let data = res.data.data
          _this.ruleForm.name = data.name
          _this.ruleForm.layout = data.layout //需要修改
          _this.ruleForm.theme = data.theme  //需要修改
          _this.ruleForm.status = data.status  
          _this.ruleForm.rootFontSize = data.rootFontSize  
          _this.ruleForm.scene = Number(data.role_type)
        }
      })
    },
    getRoleType(){
      let _this = this
      _this.$http.get(_this.baseUrl + _this.url.common.GetRoleType,{
        params:{
          role_type:0,
          token:_this.$utils.getToken()
        }
      }).then((res)=>{
        if(res.data.ret==200){
          // console.log(res.data.data)
          let data = res.data.data
          _this.options = data.map((item)=>{
            return {
              label:item.name,
              value:Number(item.role_type)
            }
          })
          // console.log(_this.options)
        }
      })
    },


  },
  components:{
    ySelect
  }
}
</script>
<style lang="less" scoped>
.content{
  padding: 10px;
  border-radius: 10px;
  .item{
    width: 270px;
  }
  .wrap-item{
    width: 200px;
    height: 200px;
    border: 1px dashed #ccc;
    text-align: center;
    padding: 10px;
    .img{
      width: 150px;
      height: 150px;
      margin: 0 auto;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .desc{
      margin-top: 20px;
    }
    
  }
  .yzcolor{
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #ccc;
    margin-right: 5px;
  }
  .tkcolor{
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: blue;
    margin-right: 5px;
  }
  
  .bottom{
    position: fixed;
    bottom: 0;
    left: 130px;
    width: calc(100% - 140px);
    padding: 10px 0;
    text-align: center;
    background:rgba(255,255,255,1);
    box-shadow:0px 0px 5px 0px rgba(0, 0, 0, 0.2);
    border-radius: 5px 5px 0 0;
  }
}
</style>
<style lang="less">
.content{
  .el-form-item__label{
    font-weight: bold;
  }
  .theme-raido{
    .el-radio__input{
      visibility: hidden !important;
    }
  }
}
</style>
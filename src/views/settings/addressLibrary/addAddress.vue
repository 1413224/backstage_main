<template>
  <div class="content bg-white rounded box-shadow-page p-2">
    <yTitle>新增地址</yTitle>
    <div class=" bg-gray rounded p-1 mt-2">
      <div class=" bg-white py-2 rounded">
        <el-form
          :model="ruleForm" :rules="rules" 
          ref="ruleForm" label-width="120px">
          <el-form-item label="联系人" prop="accountName" class="ruleInput">
            <el-input size="small" v-model="ruleForm.accountName" placeholder="请输入联系人"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="phone" class="ruleInput">
            <el-input size="small" v-model="ruleForm.phone" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item label="座机号" class="ruleInput">
            <el-input style="width:108px;" size="small" v-model="ruleForm.areaCode" placeholder="请填写区号"></el-input>
            <el-input style="width:201px;" class=" ml" size="small" v-model="ruleForm.sitPhone" placeholder="请填写座机号"></el-input>
            <el-input style="width:193px;" class=" ml" size="small" v-model="ruleForm.exPhone" placeholder="请填写分机号"></el-input>
            <span class="tips font-sm ml-1">优先显示座机号</span>
          </el-form-item>
          <el-form-item label="邮编" prop="zipcode" class="ruleInput">
            <el-input size="small" v-model="ruleForm.zipcode" placeholder="请输入邮政编码"></el-input>
          </el-form-item>
          <el-form-item label="地址类型">
            <el-checkbox-group v-model="ruleForm.addressList">
              <el-checkbox :label="0">发货地址</el-checkbox>
              <el-checkbox :label="1">收票地址</el-checkbox>
              <el-checkbox :label="2">退货地址</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="bottom">
      <el-button class="bottom-btn" @click="goBackList()" size="small">取消</el-button>
      <el-button class="bottom-btn" @click="submitManage('ruleForm')" size="small" type="primary">确定</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return {
      ruleForm:{
        accountName:'',
        phone:'',
        areaCode:'',
        sitPhone:'',
        exPhone:'',
        zipcode:'',
        addressList:[0]
      },
      rules:{
        accountName:[
          {required: true, message: '请输入联系人'}
        ],
        phone:[
          {required: true, message: '请输入手机号'}
        ]
      }
    }
  },
  created(){

  },
  methods:{
    goBackList(){
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="less" scoped>
.tips{
  color: #999999FF;
}
.el-checkbox-group{
  margin-top: 3px;
}
.bottom{
  position: fixed;
  bottom: 0;
  left: 262px;
  width: calc(100% - 272px);
  padding: 10px 0;
  text-align: center;
  background:rgba(255,255,255,1);
  box-shadow:0px 0px 5px 0px rgba(0, 0, 0, 0.2);
  border-radius: 5px 5px 0 0;
}
</style>
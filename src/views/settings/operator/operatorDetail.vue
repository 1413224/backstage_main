<template>
  <div class="content bg-white box-shadow-page rounded p-1">
    <div class=" bg-gray rounded p-1">
      <div class=" bg-white rounded px-1 py-4">
        <el-form
          :model="ruleForm" :rules="rules" 
          ref="ruleForm" label-width="120px">
          <el-form-item label="角色名称" class="item">
            <p class="text font-sm">163554</p>
          </el-form-item>
          <el-form-item label="角色描述" class="item">
            <p class="text font-sm">描述数数诉</p>
          </el-form-item>
          <el-form-item label="角色" class="item">
            <p class="text font-sm">fdfgh</p>
          </el-form-item>
          <el-form-item label="权限" class="item">
            <el-collapse v-model="activeNames" class="rounded">
              <el-collapse-item title="一致性 Consistency" name="0">
                <div class="list-item">
                  <p class="tit p-1">首页导航图标</p>
                  <div class="cont-wrap d-flex py-1">
                    <p class="label">查看列表</p>
                    <p class="label">查看列表</p>
                    <p class="label">查看列表</p>
                    <p class="label">查看列表</p>
                  </div>
                </div>
              </el-collapse-item>
            </el-collapse>
          </el-form-item>
          <el-form-item label="状态" class="item">
            <p class="text font-sm">启用</p>
          </el-form-item>
          <el-form-item label="角色账户" class="item">
            <p class="text font-sm">大水电费点</p>
          </el-form-item>
          <el-form-item label="角色手机号" class="item">
            <p class="text font-sm">1521515151</p>
          </el-form-item>
          <el-form-item label="账户密码" class="item">
            <p class="text font-sm">123456789</p>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return {
      ruleForm:{

      },
      rules:{},
      activeNames:['0']
    }
  },
  created(){

  }
}
</script>
<style lang="less" scoped>
.text{
  color: #22242F;
  line-height: 40px;
}
.item{
  margin-bottom: 0;
}
.item /deep/ .el-form-item__label{
  color:#686A73;
}
.item /deep/ .el-form-item__label{
  padding: 0 30px 0 0;
}
.el-collapse{
  border-left: 1px solid #ebeef5;
  border-right: 1px solid #ebeef5;
  width: 700px;
  overflow: hidden;
}
.el-collapse /deep/ .el-collapse-item__header{
  background: #FAFAFA;
  padding-left: 10px;
}
.list-item{
  .tit{
    color: #686A73;
  }
  .cont-wrap{
    background: #F2F2F6;
    .label{
      padding: 0 20px;
    }
  }
}
</style>
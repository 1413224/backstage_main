<template>
  <div class="content bg-white box-shadow-page rounded p-1">
    <div class="bg-gray rounded p-1">
      <div class="bg-white py-2 px-1 rounded">
        <el-form
          :model="ruleForm" 
          :rules="rules"
          ref="ruleForm" 
          label-width="120px">
          <el-form-item label="角色类型" prop="roleType">
            <ySelect
              v-model="ruleForm.roleType" 
              :options="options"
              @changeSel="changeSel"></ySelect>
          </el-form-item>
          <el-form-item label="角色名称" prop="roleName">
            <el-input v-model="ruleForm.roleName" size="small" class="item" placeholder="请输入角色名称"></el-input>
          </el-form-item>
          <el-form-item label="角色描述" prop="roleDesc">
            <el-input v-model="ruleForm.roleDesc" size="small" 
              class="item" placeholder="请输入角色描述"
              maxlength="60"
              type="textarea"
              :rows="4"
              show-word-limit></el-input>
          </el-form-item>
          <el-form-item label="权限选择" required>
            <el-collapse v-model="activeNames" class="collapse">
              <el-collapse-item 
                :title="item.title" :name="index" 
                v-for="(item,index) in roleList" :key="index">
                <div class="item-collapse"
                  v-for="(itm,idx) in item.roleItemList" :key="idx">
                  <el-checkbox :indeterminate="itm.indeterminate" class="checkall pl-1 py-1" 
                    v-model="itm.checkAll" @change="checked => handleCheckAllChange(checked,idx)">
                    {{itm.title}}
                  </el-checkbox>
                  <div class="list bg-gray py-1 pl-4">
                    <el-checkbox-group
                      v-model="itm.checkedCities" @change="value => handleCheckedCitiesChange(value,idx)">
                      <el-checkbox v-for="(listItem,i) in itm.list" :label="listItem.label" :key="i">
                        {{listItem.text}}
                      </el-checkbox>
                    </el-checkbox-group>
                  </div>
                </div>
              </el-collapse-item>
            </el-collapse>
          </el-form-item>
          <el-form-item label="状态" prop="status" required>
            <el-radio-group v-model="ruleForm.status">
              <el-radio label="1">显示</el-radio>
              <el-radio label="0">隐藏</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="bottom">
      <el-button @click="goBackList()" size="small">取消</el-button>
      <el-button @click="submitManage('ruleForm')" size="small" type="primary">确定</el-button>
    </div>
  </div>
</template>
<script>
import ySelect from '@/components/ySelect/index'
import actions from '../actions/roleConfig/addRole.js'
export default {
  data(){
    return {
      ruleForm:{
        roleName:'',
        roleDesc:'',
        status:'1',
        roleType:''
      },
      rules:{
        roleName:[
          {required: true, message: '请输入角色名称'}
        ],
        roleDesc:[
          {required: true, message: '请输入角色描述'}
        ],
        roleType:[
          {required: true, message: '请选择角色类型'}
        ]
      },
      activeNames:['0'],
      roleList:[
        {
          title:'商城管理',
          roleItemList:[
            {
              isIndeterminate:null,//不确定状态
              checkAll:false,
              checkedCities:[],//选中的list
              title:'导航',
              list:[
                {
                  label:'1',
                  text:'查看列表'
                },
                {
                  label:'2',
                  text:'查看列表22'
                }
              ]
            },
            {
              isIndeterminate:null,//不确定状态
              checkAll:false,
              checkedCities:[],//选中的list
              title:'导航2',
              list:[
                {
                  label:'1',
                  text:'查看列表2'
                },
                {
                  label:'2',
                  text:'查看列表222'
                }
              ]
            }
          ]
        }
      ],
      options:[]
    }
  },
  created(){
    this.GetRoleType()
  },
  methods:{
    ...actions,
    changeSel(){

    },
    goBackList(){

    },
    handleCheckAllChange(checked,idx){
      console.log(checked)
      console.log(idx)
    },
    handleCheckedCitiesChange(value,idx){
      console.log(value)
      console.log(idx)
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
.bottom{
  position: fixed;
  bottom: 0;
  left: 264px;
  width: calc(100% - 274px);
  padding: 10px 0;
  text-align: center;
  background:rgba(255,255,255,1);
  box-shadow:0px 0px 5px 0px rgba(0, 0, 0, 0.2);
  border-radius: 5px 5px 0 0;
  .el-button--small{
    padding: 8px 30px;
  }
}
.collapse{
  border-left: 1px solid #ebeef5;
  border-right: 1px solid #ebeef5;
  border-radius: 5px;
  overflow: hidden;
  width: 50%;
}
.collapse /deep/ .el-collapse-item__header{
  background: #FAFAFA;
  padding-left: 10px;
}
</style>
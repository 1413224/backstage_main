<template>
  <div class="wrapper">
    <h3>全球地址库</h3>
      <el-card class="box-card">
        <div class="tit-wrap">
          <span style="margin-left:50px;">名称</span>
          <span style="margin-left:150px;">状态</span>
          <span style="margin-left:150px;">操作</span>
        </div>
        <div class="tree-wrap">
          <!-- :data="addressData" -->
          <el-tree 
            :data="treeData"
            :props="defaultProps" 
            :load="loadNode"
            node-key="id"
            ref="tree"
            lazy
            :default-expanded-keys="['1']">
          </el-tree>
        </div>
      </el-card>
  </div>
</template>
<script>
import { reject } from 'q';
export default {
  name:'addressLibrary',
  data(){
    return {
      defaultProps:{
        children: 'children',
        label:'name'
      },
      addressData:[
        {
          label: '一级 1',
          children:[
            {
              label:'二级 1-1',
              children:[
                {
                  label:'三级 1-1-1'
                }
              ]
            }
          ]
        }
      ],
      treeData:[
        ],
      areaIdParent:''
    }
  },
  created(){

  },
  methods:{
    getValidList(id){
      let _this = this
      let params
      if(id){
         params={
          parent_id:id
        }
      }
      return new Promise((resolve,reject)=>{
        _this.$http.get(_this.url.user.GetValidList,{
          params
        }).then((res)=>{
          if(res.data.ret==200){
            // _this.firstData = res.data.data.list
            resolve(res.data.data.list)
          }
        })
      }) 
    },
    
    loadNode(node,resolve){
      let _this = this
      if(node.level == 0){
        _this.getValidList().then(function(data){
          resolve(data)
        })
      }else{
        _this.getValidList(node.data.id).then(function(data){
          return resolve(data)
        })
      }
    },

    handleNodeClick(data){
      console.log(data)
    }
  }
}
</script>
<style lang="less" scoped>
.box-card{
  margin-top: 30px;
  .tit-wrap{
    font-size: 14px;
    background: rgb(235, 238, 242);
    padding: 10px 0;
  }
}
</style>

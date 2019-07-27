<template>
  <div class="wrapper">
    <h3>全球地址库</h3>
      <el-card class="box-card">
        <div class="tit-wrap">
          <span style="margin-left:50px;">名称</span>
          <span style="margin-left:500px;">状态</span>
          <span style="margin-left:238px;">操作</span>
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
            <span class="custom-tree-node" slot-scope="{ node, data}">
              <span class="zdy-node-label">{{node.label}}</span>
              <span>
                <span style="width: 340px;display: flex;justify-content: space-between;padding-right:10px">
                  <span>
                    <el-tag v-if="data.status==1"  size="mini" class="mouse-hand" type="success" @click.native="openConfirm(data, '是否将此区域的状态变更为不显示状态?', 0, changeStatusById)">显示</el-tag>
                    <el-tag v-if="data.status==0" size="mini" class="mouse-hand" type="info" @click.native="openConfirm(data, '是否将此区域的状态变更为显示状态?', 1, changeStatusById)">不显示</el-tag>			
                    <!-- <el-tag  size="mini" class="mouse-hand" type="info">/</el-tag> -->
                  </span>
                  <span>
                    <!-- v-if="data.level!=4" -->
                    <el-tooltip  class="item" effect="dark" content="添加子分类" placement="top">
                      <el-button size="mini" type="primary" icon="el-icon-circle-plus-outline" plain @click="showAddArea(data,'dialogForm')"></el-button>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="编辑" placement="top">
                      <el-button size="mini" type="primary" icon="el-icon-edit-outline" plain @click="showEditArea(data)"></el-button>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="删除" placement="top">
                      <el-button size="mini" type="danger" icon="el-icon-delete" plain @click="() => remove(node, data)"></el-button>
                    </el-tooltip>
								  </span>
                </span>
              </span>
            </span>
          </el-tree>
        </div>
      </el-card>

      <el-dialog
        :title="dialogTitle"
        :visible.sync="dialogVisible"
        @close="resetForm('dialogForm')"
        width="30%"
        class="dialog">
        <span>
          <el-form :model="dialogForm" :rules="rules" ref="dialogForm" label-width="130px">
            <el-form-item label="上级分类：" prop="parentName">
              <el-input v-model="dialogForm.parentName" disabled=""></el-input>
              <input type="hidden" v-model="dialogForm.parentId">
              <input type="hidden" v-model="dialogForm.id">
            </el-form-item>
            <el-form-item label="名称：" prop="name">
              <el-input v-model="dialogForm.name"></el-input>
            </el-form-item>
            <el-form-item label="英文名称：" prop="name_en">
              <el-input v-model="dialogForm.name_en"></el-input>
            </el-form-item>
            <el-form-item label="简写(缩写）：" prop="abbreviation">
              <el-input v-model="dialogForm.abbreviation"></el-input>
            </el-form-item>
            <el-form-item label="区域编号：" prop="number">
              <el-input v-model="dialogForm.number" @keyup.native="dialogForm.number=dialogForm.number.toString().replace(/[^\d]/g, '')"></el-input>
            </el-form-item>
            <el-form-item label="人口：" prop="population">
              <el-input v-model="dialogForm.population" @keyup.native="dialogForm.population=dialogForm.population.toString().replace(/[^\d]/g, '')"></el-input>
            </el-form-item>
            <el-form-item label="Logo：" prop="thumb">
              <el-upload id="logo-upload" class="avatar-uploader" 
              action="http://47.104.187.243:18666/datacenter/v1/fileupload/image" 
              :show-file-list="false" :before-upload="beforeUpload" 
              :http-request="imgRequest"
              :on-remove="onRemove"
              >
                <div v-if="dialogForm.thumb" class="avatar">
                    <i class="el-icon-close" style="width:18px;height:18px;" @click="deleteImg()" ></i>
                    <img :src="dialogForm.thumb" class="image">
                </div>
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="显示状态：" prop="status">
              <el-radio-group v-model="dialogForm.status">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-button v-if="showAddEdit" style="margin-left:50px" type="primary" @click="addAreaSubmit('dialogForm')">立即创建</el-button>
            <el-button v-if="!showAddEdit" style="margin-left:50px" type="primary" @click="editAreaSubmit('dialogForm')">保存</el-button>
          </el-form>
        </span>
      </el-dialog>

  </div>
</template>
<script>
import { reject } from 'q'
import actions from './actions/index'
export default {
  name:'addressLibrary',
  data(){
    return {
      defaultProps:{
        children: 'children',
        label:'name',
        isLeaf:'is_leaf'
      },
      addressData:[],
      treeData:[],
      areaIdParent:'',
      dialogVisible:false,
      dialogTitle:'添加子分类',
      showAddEdit:true,
      dialogForm:{
        parentName:'',
        name:'',
        parentId:'',
        id:'',
        name_en:'',
        abbreviation:'',
        number:'',
        population:'',
        thumb:'',
        status:1
      },
      rules:{
        name:[{ required:true,message:'请输入分类名称',trigger:'blur' }],
        number:[{ required:true,message:'请输入区域编号',trigger:'blur' }],
      },
      // transferDataByAdd:'',//需清空
    }
  },
  created(){

  },
  methods:{
    ...actions
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
  .zdy-node-label{
    width: 340px;
    display: inline-block;
    // border: 1px solid #333;
  }
  .el-tree{
    width: 900px;
    margin-left: 20px;
    .custom-tree-node{
      width: 100%;
      display: flex;
      justify-content: space-between;
      .el-button--mini{
        padding: 5px 6px;
      }
    }
  }
  
  
}
</style>
<style lang="less">
.dialog{
  .avatar-uploader {
    .el-upload{
      border: 1px dashed #d9d9d9 !important;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }
}
.tree-wrap{
  .el-tree-node{
    padding-top: 10px;
    // padding-right: 10px;
  }
  .el-tree-node__content{
    line-height: 26px;
  }
  .el-tree-node__content:hover{
    background: #ebeef2;
  }
}
</style>


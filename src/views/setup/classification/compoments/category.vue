<template>
  <div class="category-wrap">
    <div 
      class="category" 
      v-for="(contentItem,contentIndex) in dimenArray" 
      :key="contentIndex">
      <ul class="category-ul" :ref="'category'+contentIndex">
                  <!-- v-model="categoryList" -->
                  <!-- @end="onEnd" -->
        <draggable 
          v-model="dimenArray[contentIndex]"
          @end="onEnd($event,contentIndex)">
          <li 
            class="category-item"
            :class="idxArray[contentIndex].idx == index ? 'bg-gray' : ''"
            v-for="(item,index) in contentItem" :key="index"
            :data-id="item.id"
            @click="clickCategory(contentIndex,index,item)">

            <span class="txt" :class="idxArray[contentIndex].disable ? 'disable' : ''">{{item.name}}</span>

            <div class="del" @click.stop="delCategory(item.id)">
              <svg-icon className="icon-del" icon-class="del" color="#B2AEBC"/>
            </div>
            <div class="edit" @click.stop="editCategory(item,contentIndex-1)">
              <svg-icon className="icon-edit" icon-class="edit" color="#B2AEBC"/> 
            </div>
          </li>
        </draggable>
      </ul>
      <el-button @click="addCategory(contentIndex-1)" v-if="!idxArray[contentIndex].disable" class="add-category" type="primary" plain>新增分类</el-button>
      <el-button @click="completeSort(contentIndex)" v-if="idxArray[contentIndex].disable" class="add-category" type="primary">完成排序</el-button>
    </div>

    <el-dialog
      :title="dialogText"
      :visible.sync="dialogVisible"
      width="30%"
      @before-close="closeForm('categoryForm')">
      <el-form :model="categoryForm" :rules="categoryRules" ref="categoryForm" label-width="80px">
        <el-form-item label="排序" prop="display_order">
          <el-input v-model="categoryForm.display_order"></el-input>
        </el-form-item>
        <el-form-item label="分类类型" prop="type">
          <el-select v-model="categoryForm.type">
            <el-option :value="1" label="企业领域分类"></el-option>
            <el-option :value="2" label="职位分类"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分类状态" prop="status">
          <el-radio-group v-model="categoryForm.status">
            <el-radio :label="1">可用</el-radio>
            <el-radio :label="0">不可用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="分类名称" prop="name">
          <el-input v-model="categoryForm.name"></el-input>
        </el-form-item>
        <el-form-item label="分类代码" prop="code">
          <el-input v-model="categoryForm.code"></el-input>
        </el-form-item>
        <el-form-item label="分类图片" prop="thumb">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="categoryForm.thumb" :src="categoryForm.thumb" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="分类描述" prop="description">
          <el-input type="textarea" v-model="categoryForm.description"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeForm('categoryForm')">取 消</el-button>
        <el-button type="primary" @click="submitForm('categoryForm')">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<script>
// import { mapState } from 'vuex'
// import qs from 'qs'
import draggable from 'vuedraggable'
import actions from '../actions/category'
export default {
  name:'category',
  components:{
    draggable
  },
  props:{

  },
  data(){
    return {
      parentId:null,//用于新增分类
      editId:null,//用于编辑分类
      categoryList:[
        {text:'分类1'},
        {text:'分类2'},
      ],
      dialogText:'新增分类',
      dialogVisible:false,
      dimenArray:[],
      idxArray:[
        {idx:0,disable:false},
        {idx:0,disable:false},
        {idx:0,disable:false},
        {idx:0,disable:false},
      ],
      categoryForm:{
        parent_id:'',//所属上级分类
        display_order:'',
        type:1,
        code:'',
        name:'',
        description:'',
        status:1,
        thumb:''
      },
      categoryRules:{
        name:[{required: true, message: '请输入分类名称', trigger: 'blur'}],
        type:[{required: true, message: '请选择分类类型', trigger: 'blur'}],
        status:[{required: true, message: '请选择分类状态', trigger: 'blur'}]
      }
    }
  },
  created(){
    
  },
  mounted(){
    this.$nextTick(()=>{
      this.getList()
    })
  },
  computed:{
    // ...mapState({
    //   list:state => state.category.list
    // })
  },  
  methods:{
    ...actions
  }
}
</script>

<style lang="less" scoped>
@import url('../styles/category.less');
// .del{
//   width: 30px;
//   height: 30px;
//   border: 1px solid #333;
//   position: absolute;
//   top: 0;
//   z-index: 100;
// }
</style>


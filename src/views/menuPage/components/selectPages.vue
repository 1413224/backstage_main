<template>
  <el-dialog
    title="请选择页面"
    :visible.sync="dialogVisible"
    width="40%"
    :before-close="handleClose">
    <el-row>
      <el-col>
        <span>页面分类：</span>
        <el-select 
          size="small" 
          v-model="cateModel" 
          placeholder="请选择"
          @change="changeCate">
          <el-option 
            v-for="(item,index) in cateList" 
            :key="index"
            :value="item.id"
            :label="item.name"></el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row style="margin-top:30px;">
      <el-table
        :data="tableData"
        stripe
        style="width: 100%">
        <el-table-column
          prop="name"
          label="页面名称"
          width="130">
        </el-table-column>
        <el-table-column
          prop="path"
          label="页面路径"
          width="130">
        </el-table-column>
        <el-table-column
          prop="cate_name"
          label="所属分类"
          width="130">
        </el-table-column>
        <!-- <el-table-column
            prop="status"
            label="状态"
            width="120">
          <template slot-scope="scope">
              <el-button v-if="scope.row.status==1" class="status" type="success" size="small">显示</el-button>
              <el-button v-if="scope.row.status==0" class="status" type="danger" size="small">隐藏</el-button>
          </template>
        </el-table-column> -->
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button @click="selectPage(scope.row)" type="text" size="small">选择</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
  </el-dialog>
</template>
<script>
import { resolve, reject } from 'q';
export default {
  name:'selectPages',
  props:{
    value:[Boolean],
    roleType:{
      type:String
    }
  },
  created(){
    // console.log(this.id)
    // this.getCateList().then(()=>{
    //   this.getPageList()
    // })
  },
  data(){
    return {
      dialogVisible:this.value,
      cateModel:null,
      cateList:[],
      tableData:[]
    }
  },
  methods:{
    handleClose(done){
      done()
    },
    selectPage(row){
      // console.log(row)
      let _this = this
      _this.$emit('selSrc',row)
    },
    getCateList(cateValue){
      return new Promise((resolve,reject)=>{
        let _this = this
        _this.$http.get(_this.baseUrl + _this.url.System.GetAllValidCateList,{
          params:{
            token:_this.$utils.getToken(),
            role_type:_this.roleType,
            // role_type:0
            // status:1
          }
        }).then((res)=>{
          if(res.data.ret==200){
            let data = res.data.data.list
            _this.cateList = data
            if(_this.cateList.length!=0){
              _this.cateModel = data[0].id
            }
            resolve()
          }
        })
      })
    },
    getPageList(id){
      let _this = this
      _this.$http.get(_this.baseUrl + _this.url.System.GetList,{
        params:{
          token:_this.$utils.getToken(),
          role_type:_this.roleType,
            // role_type:0,
            cate_id:id || id==0 ? id : _this.cateModel,
            status:1
        }
      }).then((res)=>{
        if(res.data.ret==200){
          let data = res.data.data.list
          _this.tableData = data
        }
      })
    },
    changeCate(id){
      this.getPageList(id)
    }
  },
  watch:{
    value(val){
      this.dialogVisible = val
    },
    dialogVisible(val,oldVal){
      if(val!=oldVal){
        this.$emit('input',val)
      }
      if(val==true){
        this.getCateList().then(()=>{
          this.getPageList()
        })
      }
    }
  }
}
</script>
<style lang="less" scoped>

</style>
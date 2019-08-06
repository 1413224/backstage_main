<template>
  <div>
    <MyTable 
      :tableData="tableData"
      :columns="columns"
      :rowDrop="rowDrop"
      @changeStatus="changeStatus"
      @edit="edit"
      @del="del"
      @detail="goDetail"
      @dropOnEnd="dropOnEnd">
    </MyTable>
    <Pagination
      :totalNums="totalNums"
      :pageSize="pageSize"
      :pageTotalNum="pageTotalNum"
      :curPage="curPage"
      @currentChange="currentChange"
      @sizeChange="sizeChange">
    </Pagination>
    <ySelect v-model="selData.modelVal" :options="selData.optionData"></ySelect>
    
    <yArea></yArea>
  </div>
</template>
<script>
import MyTable from '@/components/table/myTable'
import Pagination from '@/components/pagination/pagination'
import ySelect from '@/components/ySelect/index'
import yArea from '@/components/cascader/yArea'
export default {
  data(){
    return {
      rowDrop:true,
      totalNums:0,
      pageSize:10,
      pageTotalNum:1,
      curPage:1,
      columns:[
        { 
          prop: "logo", //与表格字段一致（接口字段）
          label: "标题",
          width:'180',
          logo:true
        },
        { prop: "create_name", label: "发布人" },
        { prop: "item_name", label: "栏目" },
        { prop: "create_time", label: "创建时间",time:true},
        { prop: "weight", label: "权重" },
        { prop: "status", label: "状态",status:true,isClick:false},//isClick不填，默认可点击
        { 
          label: "操作",
          actions:[
            {label:'编辑',icon:'el-icon-edit-outline',type:'primary',operation:'edit'},
            {label:'删除',icon:'el-icon-delete',type:'danger',operation:'del'},
            {label:'详情',icon:'el-icon-document',type:'primary',operation:'detail'}
          ]
        },
      ],
      tableData:[
        
      ],
      selData:{
        modelVal:null,
        optionData:[
          {value:1,label:'黄金糕'},
          {value:2,label:'双皮奶'},
        ]
      }

    }
  },
  created(){
    this.getList()
  },
  methods:{
    getList(){
      let _this = this
      _this.$http.get('http://api.9yetech.com/apigw/plugin/projectManage/Issue/GetList',{
        params:{
          token:_this.$utils.getToken(),
          page_num:_this.curPage,
          page_size:_this.pageSize,
          status:-1
        }
      }).then((res)=>{
        if(res.data.ret==200){
          // console.log(res)
          _this.tableData = res.data.data.list
          _this.totalNums = Number(res.data.data.total_nums)
          _this.pageTotalNum = Number(res.data.data.total_pages)
        }
      })
    },
    currentChange(currentVal){
      this.curPage = currentVal
      this.getList()
    },
    sizeChange(sizeVal){
      this.pageSize = sizeVal
      this.curPage = 1
      this.getList()
    },
    changeStatus(status,id){
      console.log(status)
      console.log(id)
    },
    edit(id,row){
      console.log(row)
      console.log(id)
    },
    del(id,row){
      console.log(row)
      console.log(id)
    },
    goDetail(id,row){
      console.log(row)
      console.log(id)
    },
    dropOnEnd(ids){
      console.log(ids)
    },
    aa(val){
      console.log(val)
    }
  },
  components:{
    MyTable,
    Pagination,
    ySelect,
    yArea
  }
}
</script>
<style lang="less" scoped>

</style>


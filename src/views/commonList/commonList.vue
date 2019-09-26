<template>
  <div class="wrapper">
    <div class="page-list" v-if="type=='list'">
      <div class="head">
        {{pageData.title}}
        <span class="desc">--{{pageData.desc}}</span>
        <div class="extends-info">
          <div v-for="(item,index) in extendsInfo" :key="index">
            <yText v-if="item.type=='text'" :configs="item"></yText>
          </div>          
        </div>
      </div>
      <!-- <router-view></router-view> -->
      <!-- 或外层重新装一层 -->
      <div class="bg-gray content">
        <!-- 提示信息开始 -->
        <div class="toptip" v-if="pageData.comment">{{pageData.comment}}</div>
        <!-- 提示信息end -->
        <div class="search-wrap">
          <!-- 搜索列表数据 -->
          <search @changeList="changeList"></search>
        </div>
        <!-- 展示数据开始 -->
        <div class="bg-bule wrapper-md">
          <div class="item" 
            v-for="(item,index) in statInfo"
            :key="index">{{item.name}}：
            <span class="collect">{{statInfoData[item.field]}}</span>
          </div>
        </div>
        <!-- 展示数据end -->
        <div class="table-wrap">
          <div  v-for="(item,index) in mainData" :key="index">
            <template v-if="item.type=='diyTable'">
              <diyTable
                :configs="item"
                v-model="listData">
                  <el-pagination
                    ref="paging" 
                    @size-change="handleSize" 
                    @current-change="handleCurrent"
                    :page-sizes="[10, 20, 30, 50]"
                    :current-page.sync="curPage"
                    :page-size="pageSize" 
                    :total="totalNums"
                    layout="sizes, prev, slot, next"
                    prev-text="上一页" next-text="下一页">
                      <span style="text-align: center;">{{curPage}}/{{totalPages}}</span>
                    </el-pagination>
                </diyTable>
            </template>
          </div>
          <!-- <div v-if="listData.length!=0">
            <component
            :is="item.type" 
            v-for="(item,index) in mainData" 
            :key="index"
            :configs="item"
            :lists="item.type=='diyTable'?listData:''"></component> 
          </div>-->
        </div>
        <!-- <yButton :configs="btnConfig"></yButton> -->
      </div>
    </div>

    <div class="page-add" v-if="type=='add'">
      <div class="head">头部标题</div>
      <addModel></addModel>
    </div>

  </div>
</template>
<script>
const MyTable = () => ({
  component:import("@/components/table/myTable"),
}) 
const diyTable = () => ({
  component:import("@/components/table/diyTable")
})
// import diyTable from '@/components/table/diyTable'
import yButton from '@/components/yButton/yButton'
import yImage from '@/components/yImage/yImage'
import yText from '@/components/yText/yText'
import search from './compoments/search'
import addModel from './compoments/addModel'
import { mapState } from 'vuex'
export default {
  name:'commonList',
  data(){
    return {
      type:'list',
      headerConfigs:{},
      mainConfigs:{},
      pageConfigs:{},
      statInfo:[],//统计数据
      statInfoData:{},//保存统计数据字段
      listData:[],//页面接口getlist请求数据

      curPage:1,
      pageSize:10,
      totalPages:1,
      totalNums:0

    }
  },
  created(){
    // console.log(this.pageData)
    // console.log(this.headerData)
    // console.log(this.mainData)
    let _this = this
      _this.statInfo = _this.pageData.statInfo //赋值统计数据
      _this.$nextTick(()=>{
        _this.setStatInfoData()
        _this.getList()
      })
      
  },
  mounted(){
    let _this = this
      
  },
  methods:{
    setStatInfoData(){//统计数据字段赋值
      let _this = this
      _this.statInfo.map((item)=>{
        // console.log(item)
        _this.$set(_this.statInfoData,item.field,0)
      })
    },
    getList(){
      let _this = this
      let token
      if(_this.pageData.needLogin){
        token = _this.$utils.getToken()
      }
      let params = Object.assign({
        page_num:_this.curPage,
        page_size:_this.pageSize
      },{token:token,status:-1},_this.ruleForm)
      //apiService为空时，不需要请求
      if(_this.pageData.apiService){
        _this.$http.post(_this.pageData.apiService,params).then((res)=>{
          if(res.data.ret==200){
            let data = res.data.data
            data.list.map((item)=>{
              item.checkModel = false
            })
            _this.listData = data.list
            // console.log(_this.listData)
            _this.statInfoData['total_nums'] = data.total_nums
            if(data.total_pages){
              _this.totalPages = data.total_pages || 1
            }
            if(data.total_nums){
              _this.totalNums = data.total_nums
            }
          }
        })
      }
    },
    changeList(val){
      this.listData = []
      this.getList()
    },
    handleSize(sizeVal){
      this.pageSize = sizeVal
      this.curPage = 1
      this.getList()
    },
    handleCurrent(currentVal){
      this.curPage = currentVal
      this.getList()
    }
  },
  computed:{
    ...mapState({
      pageData:state => state.diypage.pageData,
      headerData:state => state.diypage.headerData,
      mainData:state => state.diypage.mainData,
      ruleForm:state => state.diypage.ruleForm,//search数据（入参）
      listNum:state => state.diypage.listNum,
    }),
    extendsInfo(){
      return this.pageData.extendsInfo
    }
  },
  watch:{
    listNum(val,oldVal){
      if(val!=oldVal){
        this.getList()
      }
    }
  },
  components:{
    search,
    MyTable,
    addModel,
    yText,
    diyTable,
    yImage,
    yButton
  }
}
</script>
<style lang="less" scoped>
.desc{
  font-size: 12px;
}
.content{
  padding: 10px;
  margin-top: 30px;
  .toptip{
    width: calc(100% - 20px);
    min-height: 50px;
    border-radius: 5px;
    // border: 1px solid #ccc;
    padding: 10px;
    margin-bottom: 10px;
    font-size: 12px;
    background: #fff;
  }
  .search-wrap{
    background: #fff;
    padding: 20px 10px 20px 10px;
  }
  
  .table-wrap{
    // border: 1px solid #333;
    margin-top: 20px;
  }
  
  .wrapper-md{
    padding: 20px;
    font-size: 12px;
    .item{
      display: inline-block;
    }
    .collect{
      color: #2589FF;
    }
  }
}
@media screen and (max-width: 1200px){
  .table-wrap{
    max-width: 860px;
    overflow-x: scroll;
  }
}
</style>


<template>
  <div class="wrapper">
    <div class="page-list" v-if="type=='list'">
      <div class="head">头部标题</div>
      <div class="bg-gray content">
        <div class="search-wrap">
          <search></search>
          <!-- <el-input placeholder="请输入内容" v-model="input1">
            <template slot="prepend">Http://</template>
          </el-input> -->
        </div>
        <div class="table-wrap">
          <MyTable></MyTable>
        </div>
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
      pageConfigs:{}
    }
  },
  // beforeRouteEnter(to, from, next){
  //   next(vm => {
  //     console.log(999)
  //   })
  // },
  created(){
    // this.getPageConfigs()
    // console.log(8888)
  },
  methods:{
    // getPageConfigs(){
    //   let _this = this
    //   _this.$store.dispatch('getConfigs').then((data)=>{
    //     let diypageConfigs = _this.$store.state.diypage

    //     _this.headerConfigs = diypageConfigs.headerData
    //     _this.mainConfigs = diypageConfigs.mainData
    //     _this.pageConfigs = diypageConfigs.pageData
    //     // console.log(_this.$store.state.diypage)
    //   })
    // }
  },
  computed:{
    // ...mapState({
    //   configsData:state => state.diypage.configsData
    // })
  },
  components:{
    search,
    MyTable,
    addModel
  }
}
</script>
<style lang="less" scoped>
.content{
  padding: 10px;
  margin-top: 30px;
  .search-wrap{
    background: #fff;
    padding: 10px 10px 20px 10px;
  }
  .table-wrap{
    // border: 1px solid #333;
    margin-top: 20px;
  }
}
</style>


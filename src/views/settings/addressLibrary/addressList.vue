<template>
  <div class="content rounded box-shadow-page px-1 py-2 bg-white">
    <div class=" d-flex a-center">
      <yTitle>地址库</yTitle>
      <p class="tip font-sm">目前商家地址库最多保存200条地址，<span>已添加10个</span></p>
    </div>
    <div class=" bg-gray rounded p-1 mt-2">
      <div class="search bg-white rounded py-2 px-2">
        <el-button style="" @click="addAddress()" type="primary" size="mini">新增地址</el-button>
      </div>

      <div class="table-wrap">
        <el-table
          :data="tableData"
          stripe>
          <el-table-column
            prop="name"
            label="联系人">
          </el-table-column>
          <el-table-column
            prop="phone"
            label="手机号">
          </el-table-column>
          <el-table-column
            prop="address"
            label="详细地址">
          </el-table-column>
          <el-table-column
            prop="em"
            label="邮编">
          </el-table-column>
          <el-table-column label="地址类型">
            <template slot-scope="scope">
              <div><el-button @click="changeAddress(scope.row.id)" type="primary" size="mini">发货地址</el-button></div>
              <div class="mt"><el-button @click="changeAddress(scope.row.id)" size="mini">退货地址</el-button></div>
            </template>
          </el-table-column>
          <el-table-column
            label="操作">
            <template slot-scope="scope">
              <el-button @click="goEdit(scope.row.id,scope.row)" type="text" size="small">详情</el-button>
              <el-button @click="delManage(scope.row.id)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

    </div>
    <el-pagination
      ref="paging" 
      class="pagination mt-2 text-right"
      @size-change="handleSize"
      @current-change="handleCurrent"
      :current-page="curPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalNums">
    </el-pagination>
  </div>
</template>
<script>
export default {
  data(){
    return {
      tableData:[
        {}
      ],
      totalNums:0,
      curPage: 1,
      pageSize: 10,
      totalPages:1,
    }
  },
  created(){

  },
  methods:{
    addAddress(){
      this.$router.push({
        path:'/settings/addressLibrary/addAddress'
      })
    },
    goEdit(id){

    },
    delManage(id){

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
  }
}
</script>
<style lang="less" scoped>
.tip{
  color: #686A73;
  span{
    color: #333333FF;
  }
}
</style>

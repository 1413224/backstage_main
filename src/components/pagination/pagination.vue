<template>
  <div class="pagination-wrap">
    <el-pagination 
      ref="paging"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="curPage"
      :page-sizes="[10, 20, 30, 50]"
      :page-size="pageSize"
      :total="totalNums"
      layout="sizes, prev, slot, next" prev-text="上一页" next-text="下一页">
      <span style="text-align: center;">{{curPage}}/{{pageTotalNum}}</span>
    </el-pagination>
  </div>
</template>
<script>
export default {
  name:'pagination',
  props:{
    pageTotalNum:{
      type:Number,
      default:1
    },
    pageSize:{
      type:Number,
      default:10
    },
    curPage:{
      type:Number,
      default:1,
    },
    totalNums:{
      type:Number,
      default:0
    }
  },
  methods:{
    handleSizeChange(sizeVal){
      this.$emit('sizeChange',sizeVal)
    },
    handleCurrentChange(currentVal){
      this.$emit('currentChange',currentVal)
    }
  }
}
</script>
<style lang="less" scoped>
.pagination-wrap{
  text-align: center;
  margin-top: 50px;
}
</style>

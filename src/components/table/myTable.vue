<template>
  <div class="table-wrap">
    <el-row :class="rowDrop ? 'move' : ''">
      <el-table 
        :data="tableData" 
        :stripe="yTableClass=='stripe' ? true : false"
        :border="yTableClass=='border' ? true : false"
        :max-height="yMaxHeight"
        row-key="id"
        @selection-change="handleSelectionChange">
        <el-table-column
          v-if="yCanCheckBox"
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          v-for="(column,index) in columns"
          :prop="column.prop"
          :key="index"
          :label="column.label"
          :width="column.width">
          <template slot-scope="scope">
            <div v-if="column.logo || column.thumb" class="logo">
              <img class="logo-img" :src="scope.row.logo || column.thumb" alt="">
            </div>
            <el-tag :class="column.isClick == false ? '' : 'point'" v-else-if="column.status" size="mini" :type="Number(scope.row.status) ? 'success' : 'danger'" disable-transitions>
              <span @click="changeStatus(Number(scope.row.status),scope.row.id,column.isClick)">
                {{Number(scope.row.status) ? '显示' : '隐藏'}}
              </span>
            </el-tag>
            <div v-else-if="column.actions">
              <template v-if="column.btnType=='textBtn'">
                <el-button 
                  type="text"
                  v-for="(item,index) in column.actions"
                  :key="index"
                  @click="operation(scope.row.id,scope.row,item.operation)">{{item.label}}</el-button>
              </template>
              <el-tooltip v-else
                v-for="(item,index) in column.actions"
                :key="index"
                class="item" effect="dark" :content="item.label" placement="top">
                  <el-button
                  size="mini"
                  :type="item.type"
                  :icon="item.icon"
                  plain
                  @click="operation(scope.row.id,scope.row,item.operation)"></el-button>
              </el-tooltip>
            </div>
            <span v-else-if="column.time">{{scope.row.create_time | formatDate}}</span>
            <span v-else>{{scope.row[column.prop]}}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    
  </div>
</template>
<script>
import Sortable from 'sortablejs'

export default {
  name:'my-table',
  props:{
    tableData: Array,
    columns: Array,
    rowDrop:{
      type:Boolean,
      default:false
    },
    configs:[Object]
    
  },
  data(){
    return {

    }
  },
  created(){

  },
  computed:{
    yTableClass(){ return this.configs.tableClass },
    yMaxHeight(){ return this.configs.height},
    yCanCheckBox(){ return this.configs.canCheckBox}
  },
  mounted(){
    // console.log(this.rowDrop)
    let _this = this
    if(_this.rowDrop){
      _this.rowDropMethod()
    }
  },
  methods:{
    changeStatus(status,id,isClick){
      if(isClick==false){
        return false
      }
      this.$emit('changeStatus',status,id)
    },
    operation(id,row,operation){
      // console.log(operation)
      let _this = this
      switch(operation) {
        case 'edit':
          _this.$emit('edit',id,row)
          break;
        case 'del':
          _this.$emit('del',id,row)
          break;
        case 'detail':
          _this.$emit('detail',id,row)
      }
    },
    rowDropMethod(){
      let tbody = document.querySelector('.el-table__body-wrapper tbody')
      let _this = this
      Sortable.create(tbody,{
        onEnd({newIndex, oldIndex}){
          let currRow = _this.tableData.splice(oldIndex, 1)[0]
          _this.tableData.splice(newIndex, 0, currRow)

          let ids = []
          _this.tableData.map((item)=>{
            ids.push(item.id)
          })
          _this.$emit('dropOnEnd',ids.toString())
        }
      })
    },
    handleSelectionChange(val){
      // console.log(val)
      let ids = []
      val.map((item)=>{
        ids.push(item.id)
      })
      console.log(ids.toString())
    }
    

  }
}
</script>
<style lang="less" scoped>
.table-wrap{
  .logo{
    width: 60px;
    height: 60px;
    .logo-img{
      width: 100%;
      height: 100%;
    }
  }
  .point{
    :hover{
      cursor: pointer;
    }
  }
  .item{
    padding: 6px;
  }
  .move /deep/ .el-table__row{
    &:hover{
      cursor: move;
    }
  }
}

</style>

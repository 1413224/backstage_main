<template>
  <div class="diy-table-wrap">
    <div class="content">
      <!-- 头部开始 -->
      <div class="tit-wrap clearfix">
        <el-checkbox
          v-if="canCheckBox"
          class="checkall" 
          :indeterminate="isIndeterminate" 
          v-model="checkAll"
          @change="handleCheckAllChange" 
          style="width:50px"></el-checkbox>
        <div 
          class="item"
          :style="{minWidth:`${item.minWidth}px`}"
          v-for="(item,index) in th" 
          :key="index">
          <div 
            class="labels" 
            v-for="(itm,idx) in item.label" 
            :key="idx">
            {{itm.value}}
          </div>
        </div>
      </div>
      <!-- 头部结束 -->
      <!-- 表格开始 -->
      <div class="list-wrap" v-if="list.length!=0">
        <draggable 
          v-model="list"
          @end="onEnd($event)"
          :options="draggableOptions">
          <div 
            class="item" 
            :class="tabClass"
            v-for="(item,index) in list"
            :key="index">
            <!-- 几列 -->
            <!-- @change="checked=>checkItem(checked,item)" -->
            <!-- <el-checkbox 
              class="checkbox" 
              :value="item.id"
              v-model="checkData"></el-checkbox> -->
              <!-- <input type="checkbox" v-model="checkData" :value="item.id"> -->
              <el-checkbox 
                v-model="item.checkModel" 
                @change="checked=>handleCheckItemChange(checked,item)"></el-checkbox>
            <div
              class="line-item"
              :class="{tabClass,'dragtab':needPagebean==false?true:false}"
              :style="{minWidth:`${itm.minWidth}px`}"
              v-for="(itm,idx) in lineConfig[0].column" :key="idx">
                <!-- 循环组件内容 -->
                <div v-for="(comItem,ide) in itm.component" :key="ide" :class="{linebtn:comItem.type=='button'}">
                  <yText 
                    v-if="comItem.type=='text' 
                    && comItem.format=='dateTime' && item[comItem.field] !=''"
                     :configs="comItem">
                    {{ item[comItem.field] | formatDate}}
                  </yText>
                  <yText v-else-if="comItem.type=='text' && item[comItem.field] !=''"  :configs="comItem">
                    {{ item[comItem.field] }}
                  </yText>
                  <yText class="default" v-else-if="comItem.type=='text' && item[comItem.field] ==''" :configs="comItem">
                    {{ comItem.defaultValue }}
                  </yText>
                  <!-- :status="item[comItem.statusField]" -->
                  <yButton class="tabbtn" v-if="comItem.type=='button'" 
                    :configs="comItem" 
                    
                    v-model="item[comItem.statusField]"
                    :listItem="item">
                  </yButton>
                </div>
                <!-- 循环组件内容end -->
              </div>
          </div>
        </draggable>
      </div>
      <div class="nolist-wrap" v-if="list.length==0">
        暂无数据
      </div>
      <!-- <div>暂无数据</div> -->
      <!-- 表格结束 -->
      <div v-show="needPagebean" class="pagination">
        <slot></slot>
      </div>
      

    </div>
  </div>
</template>
<script>
// import Sortable from 'sortablejs'
import actions from './actions/index'
import draggable from 'vuedraggable'
import yButton from '@/components/yButton/yButton'
import yImage from '@/components/yImage/yImage'
import yText from '@/components/yText/yText'
import { mapState } from 'vuex'
export default {
  name:'diyTable',
  props:{
    configs:[Array,Object],
    lists:[Array,Object],
    value:[Array,Object]
  },
  data(){
    return {
      checkAll:false,
      isIndeterminate:true,
      // list:this.lists,
      list:this.value,
      checkedList:[],//选中的行
      draggableOptions:{
        disabled:this.needPagebean ? this.needPagebean : false
      }
    }
  },

  created(){
    // console.log(this.configs)
    // console.log(this.lists)
    // this.getCompoment()
    // console.log(this.tableList)
  },
  mounted(){
    // this.rowDropMethod()
  },
  computed:{
    ...mapState({
      lineConfig:state => state.diypage.lineConfig,
      tableConfig:state => state.diypage.tableConfig,
      // tableList:state => state.diypage.tableList,
      
    }),
    
    yTableClass(){ return this.configs.tableClass },
    yHeight(){ return this.configs.height },
    canCheckBox(){ return this.configs.canCheckBox },
    th(){ return this.configs.th },
    tr(){ return this.configs.tr },
    tabClass(){
      return this.tableConfig.tableClass
    },

    needPagebean(){ return this.configs.needPagebean},

  },
  methods:{
    ...actions,
  },
  watch:{
    value(val){
      this.list = val
    },
    list(val,oldVal){
      if(val!=oldVal){
        this.$emit('input',val)
      }
    }
  },
  components:{
    yButton,
    yImage,
    yText,
    draggable
  }
}
</script>
<style lang="less" scoped>
@media screen and (max-width: 1500px){
  .content{
    // max-width: 1200px;
    // overflow-x: scroll;
  }
}
.diy-table-wrap{
  background: #fff;
  .pagination{
    text-align: center;
    padding: 30px 0;
  }
  .default{
    font-style: italic;
    color: #666;
    font-size: 14px;
  }
  .checkall{
    // margin-left: 10px;
    width: 16px !important;
  }
  .content{

  }
  .tit-wrap{
    width: calc(100% - 20px);
    background: #f5f7f9;
    padding: 10px;
    border-top:1px solid #ebeef5;
    border-bottom: 1px solid #ebeef5;
    font-size: 14px;
    text-align: center;
    color: #666; 
    display: table;
    .item{
      display: table-cell;
      .labels{
        text-align: left;
      }
    }
  }
}
.nolist-wrap{
  // padding: 20px;
  height: 100px;
  line-height: 100px;
  text-align: center;
  font-size: 14px;
  color: #666;
}
.list-wrap{
  .item.stripe{
    &:nth-child(2n){
      background: #ebeef5;
    }
  }
  .item{
    display: table;
    width: calc(100% - 20px);
    border-bottom: 1px solid #ebeef5;
    padding: 0 10px;
    background: #fff;
    .checkbox{
      margin-right: 5px;
    }
    .line-item{
      padding: 10px 0;
      font-size: 15px;
      display: table-cell;
      // flex: 1;
      .linebtn{
        display: inline-block;
        margin-right: 5px;
      }
    }
    .dragtab{
      &:hover{
        cursor: move;
      }
    }
    .line-item.border{
      border-right: 1px solid #ebeef5;
      &:last-child{
        border-right: none;
      }
    }
    .tabbtn{
      display: inline-block;
    }
    .tabbtn /deep/ .el-button--small{
      padding: 5px 7px;
    }
  }
}
</style>
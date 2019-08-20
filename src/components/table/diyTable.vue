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
      <div class="list-wrap">
        <draggable 
          v-model="list"
          @end="onEnd($event)">
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
              :class="tabClass"
              :style="{minWidth:`${itm.minWidth}px`}"
              v-for="(itm,idx) in lineConfig[0].column" :key="idx">
                <!-- 循环组件内容 -->
                <div v-for="(comItem,ide) in itm.component" :key="ide" :class="{linebtn:comItem.type=='button'}">
                  <yText v-if="comItem.type=='text' && comItem.format=='dateTime'" :configs="comItem">
                    {{ item[comItem.field] | formatDate}}
                  </yText>
                  <yText v-else-if="comItem.type=='text'" :configs="comItem">
                    {{ item[comItem.field] }}
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
      <!-- 表格结束 -->


    </div>
  </div>
</template>
<script>
// import Sortable from 'sortablejs'
import draggable from 'vuedraggable'
import yButton from '@/components/yButton/yButton'
import yImage from '@/components/yImage/yImage'
import yText from '@/components/yText/yText'
import { mapState } from 'vuex'
export default {
  name:'diyTable',
  props:{
    configs:[Object],
    lists:[Array,Object]
  },
  data(){
    return {
      checkAll:false,
      isIndeterminate:true,
      list:this.lists,
      checkedList:[],//选中的行
    }
  },
  created(){
    // console.log(this.lineConfig)
    // console.log(this.tableConfig)
    // this.getCompoment()
  },
  mounted(){
    // this.rowDropMethod()
  },
  computed:{
    ...mapState({
      lineConfig:state => state.diypage.lineConfig,
      tableConfig:state => state.diypage.tableConfig
    }),
    
    yTableClass(){ return this.configs.tableClass },
    yHeight(){ return this.configs.height },
    canCheckBox(){ return this.configs.canCheckBox },
    th(){ return this.configs.th },
    tr(){ return this.configs.tr },
    tabClass(){
      return this.tableConfig.tableClass
    }
  },
  methods:{
    handleCheckItemChange(checked,item){
      let _this = this
      if(checked==true){
        _this.checkedList.push(item)
        if(_this.checkedList.length == _this.list.length){
          _this.checkAll = true
          _this.isIndeterminate = false
        }else{
          _this.checkAll = false
          _this.isIndeterminate = true
        }
      }else{
        _this.checkAll = false
        _this.isIndeterminate = true
      }
        console.log(_this.getIds())
    },
    handleCheckAllChange(val){
      let _this = this
      _this.list.map((item,index)=>{
        item.checkModel = val
      })
        // console.log(_this.getIds())
        // console.log(_this.list)

    },
    getIds(){
      let _this = this
      let idsArray=[]
      let ids = ''
      _this.list.map((item)=>{
        if(item.checkModel==true){
          idsArray.push(item.id)
        }
      })
      ids = idsArray.toString()
      return ids
    },
    getCompoment(){
      let _this = this
      // _this.lineConfig[0].column.map((item,index)=>{
      //   console.log(item)
      // })
      _this.list.map((item,index)=>{
        console.log(item)
      })

    },
    onEnd(){
      console.log(this.list)
    }
  },
  watch:{

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
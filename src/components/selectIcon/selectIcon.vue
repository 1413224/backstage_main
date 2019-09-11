<template>
  <div>
    <el-dialog
      title="请图标选择"
      :visible.sync="dialogIcon"
      width="50%">
      <div class="iconwrap">
        <div class="item" 
          v-for="(item,index) in iconList" :key="index"
          @click="selIcon(item)">
          <i class="iconfont" :class="item.iconfont"></i>
          <span>{{item.iconfont}}</span>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import iconList from './iconList'
export default {
  name:'selectIcon',
  props:{
    value:[Boolean]
  },
  data(){
    return {
      iconList:iconList.iconList,
      dialogIcon:this.value
    }
  },
  created(){
    // console.log(this.iconList)
  },
  methods:{
    selIcon(item){
      // console.log(item.iconfont)
      this.$emit('selIcon',item.iconfont)
    }
  },
  watch:{
    value(val){
      this.dialogIcon = val
    },
    dialogIcon(val,oldVal){
      if(val!=oldVal){
        this.$emit('input',val)
      }
    }
  }
}
</script>
<style lang="less" scoped>
.iconwrap{
  display: flex;
  flex-wrap: wrap;
  max-height: 600px;
  overflow-y: scroll;
  .item{
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    align-items: center;
    width: 100px;
    padding: 10px;
    &:hover{
      background: #eee;
      cursor: pointer;
    }
    .iconfont{
      font-size: 32px;
    }
  }
}
</style>
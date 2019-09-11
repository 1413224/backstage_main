<template>
  <div>
    <el-dialog
      title="请选择"
      :visible.sync="dialogSrc"
      width="50%">
      <div class="wrap">
        <div class="item-wrap">
          <div class="label-tit">标题：</div>
          <div class="label-wrap">
            <el-button size="small">sdf</el-button>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name:'selectSrc',
  props:{
    value:[Boolean]
  },
  data(){
    return {
      dialogSrc:this.value
    }
  },
  methods:{

  },
  computed:{

  },
  watch:{
    value(val){
      this.dialogSrc = val
    },
    dialogSrc(val,oldVal){
      if(val!=oldVal){
        this.$emit('input',val)
      }
    }
  }
}
</script>
<style lang="less" scoped>
.label-tit{
  font-size: 14px;
  font-weight: bold;
}
.label-wrap{
  margin-top: 20px;
}
</style>
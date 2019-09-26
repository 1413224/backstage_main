<template>
  <div>
    <el-cascader
      v-model="areaArr"
      :props="areaProps"
      clearable
      size="small"></el-cascader>
  </div>
</template>
<script>
import { resolve } from 'q';
export default {
  name:'yArea',
  // model:{
  //   prop:'areaArr',
  //   event:'getAreaArr'
  // },
  props:{
    value:[Array,String]
  },
  data(){
    let _this = this
    return {
      areaItem:[],
      areaArr:_this.value,
      areaProps:{
        checkStrictly:true,
        lazy: true,
        lazyLoad(node,resolve){
          if(node.level == 0){
            _this.getAreaList(1).then(function(areaItem){
              resolve(areaItem)
            })
          }else{
            _this.getAreaList(node.data.value).then(function(areaItem){
              resolve(areaItem)
            })
          }
        }
      }
    }
  },
  created(){
  },
  mounted(){
  },
  watch:{
    value(val){
      this.areaArr = val
    },
    areaArr(val,oldval){
      if(val!=oldval){
        this.$emit('input',val)
      }
    }
  },
  methods:{
    handleAreaItem(value){
      let _this = this
    },
    getAreaList(parantId){
      let _this = this
      let params = {
        token:_this.$utils.getToken(),
        status:1,
        parent_id:parantId
      }
      return new Promise(function(reso,rej){
        _this.$http.post(_this.baseUrl + _this.url.control.GetAreaList,params).then(function(res){
          if(res.data.ret == 200){
            let list = res.data.data.list
            _this.areaItem = list.map(item => ({
              value:Number(item.id),
              label:item.name,
              leaf:item.is_leaf
            }))
            reso(_this.areaItem)
          }
        })
      })
    }
  }
}
</script>
<style lang="less" scoped>
.el-cascader{
  width: 100%;
}
</style>

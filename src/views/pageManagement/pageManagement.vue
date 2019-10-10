<template>
  <div>
    <yTitle>页面管理</yTitle>
    <!-- <upLoadPicture v-model="dialogPicture"></upLoadPicture> -->
    <div class="wrap">
      <div class="item">fsa</div>
      <div class="item">fsa</div>
      <div class="item">fsa</div>
      <div class="item">fsa</div>
    </div>
  </div>
</template>
<script>
import upLoadPicture from '@/components/uploadPicture/uploadPicture'
export default {
  data(){
    return {
      dialogPicture:true
    }
  },
  created(){

  },
  methods:{

  },
  components:{
    upLoadPicture
  }
}
</script>
<style lang="less" scoped>

</style>
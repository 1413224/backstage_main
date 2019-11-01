<template>
  <div class="content bg-white py-2 px-1 rounded box-shadow-page">
    <yTitle>权限组</yTitle>
    <div class=" bg-gray rounded p-1 mt-2">
      <div class="list-wrap mt-1 clearfix">
        <div class="item rounded mr-2 mb-2 fl bg-white"
          v-for="(item,index) in list"
          :key="index" @click="goGroupList(item.role_type)">
          <div class="list-tit px-2 pb-2">
            <p class="tit pt-2">{{item.name}}</p>
            <p class="desc mt-1 ellipsis2">{{item.desc}}</p>
          </div>
          <div class="list-bottom d-flex px-2 j-sb a-center">
            <p class="navbar">固定</p>
            <div class="nums">
              <span class="num">{{item.perm_nums}}</span>
              <span class="text">个</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return {
      perm_nums:'',
      list:[]
    }
  },
  created(){
    this.getStatistics()
  },
  methods:{
    getStatistics(){
      let _this = this
      _this.$http.post(_this.baseUrl + _this.url.Perm.Statistics,{
        token:_this.$utils.getToken()
      }).then((res)=>{
        if(res.data.ret==200){
          let data = res.data.data
          _this.list = data
        }
      })
    },
    goGroupList(roleType){
      this.$router.push({
        path:'/perm/permGroup',
        query:{
          roleType:roleType
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.list-wrap{
  width: 95%;
  // border:1px solid #333;
  margin: 10px auto 0;
  .item{
    width: 310px;
    border: 1px solid #E8E8E8;
    overflow: hidden;
    &:hover{
      border: 1px solid #2589FF;
      cursor: pointer;
    }
    &:nth-child(2n){
      .list-tit{
        background:url('../../assets/list-tit.png') 100% 100% no-repeat;
        color: #fff;
      }
      .desc{
        color: #fff;
      }
    }
    .list-tit{
      font-size: 14px;
      font-weight: bold;
      color: #333;
      background: #E3F0FC;
      height: 80px;
    }
    .desc{
      font-size: 12px;
      color: #999;
      line-height: 16px;
    }
    .list-bottom{
      padding: 15px 20px;
      .navbar{
        color: #666;
        font-size: 12px;
      }
      .nums{
        color: #333;
        .num{
          font-size: 16px;
          color: #FF6A00;
          font-weight: bold;
        }
        .text{
          font-size: 12px;
        }
      }
    }
  }
}
</style>
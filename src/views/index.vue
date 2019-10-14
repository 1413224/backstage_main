<template>
  <div>
    <div class="head clearfix pt-2 pb-2 pl-1 pr-2">
      <div class="left fl d-flex a-center">
        <img src="../assets/youzan.png" class="logo" alt="">
        <p class="tit ml-1">早安，成高成网络科技，祝你开心每一天！</p>
      </div>
      <div class="right fr d-flex">
        <div class="item mr-1 d-flex flex-column a-center">
          <p class="tit">系统页面总数</p>
          <p class="num mt-1">99</p>
        </div>
        <div class="xian"></div>
        <div class="item ml-1 d-flex flex-column a-center">
          <p class="tit">通用页面总数</p>
          <p class="num mt-1">99</p>
        </div>
      </div>
    </div>
    <div class="list-wrap mt-1 d-flex">
      <div class="item rounded mr-2">
        <div class="list-tit px-1 py-1">
          <p class="tit">成高成管理后台</p>
          <p class="desc mt-1">-管理整个平台的数据信息-管理整个平台的数据信息</p>
        </div>
        <div class="list-bottom d-flex px-1 j-sb a-center">
          <el-button type="primary" plain size="mini">立即设置</el-button>
          <div class="nums">
            <span class="num">30</span>
            <span class="text">页</span>
          </div>
        </div>
      </div>
      <div class="item rounded mr-2">
        <div class="list-tit px-1 py-1">
          <p class="tit">成高成管理后台</p>
          <p class="desc mt-1">-管理整个平台的数据信息-管理整个平台的数据信息</p>
        </div>
        <div class="list-bottom d-flex px-1 j-sb a-center">
          <el-button type="primary" plain size="mini">立即设置</el-button>
          <div class="nums">
            <span class="num">30</span>
            <span class="text">页</span>
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

    }
  },
  created(){

  },
  methods:{

  }
}
</script>
<style lang="less" scoped>
.head{
  width: calc(100% - 28px);
  box-shadow:0px 0px 3px 0px rgba(34,36,47,0.1);
  background: #fff;
  margin-top: -10px;
  // margin-left: -15px;
  border-radius: 0 0 10px 10px;
  .left{
    .logo{
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
    .tit{
      font-size: 14px;
      color: #333;
      font-weight: bold;
    }
  }
  .right{
    .xian{
      width: 1px;
      height: 30px;
      margin-top: 3px;
      background: #E3E2E5;
    }
    .item{
      .tit{
        color: #999;
        font-size: 12px;
      }
      .num{
        font-weight: bold;
      }
    }
  }
}
.list-wrap{
  .item{
    width: 200px;
    border: 1px solid #E8E8E8;
    overflow: hidden;
    &:hover{
      border: 1px solid #2589FF;
    }
    &:nth-child(2n){
      .list-tit{
        background:url('../assets/list-tit.png') 100% 100%;
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
    }
    .desc{
      font-size: 12px;
      color: #999;
      line-height: 16px;
    }
    .list-bottom{
      padding: 15px 10px;
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
<style lang="less">
.list-bottom{
  .el-button--primary.is-plain{
    border-radius: 20px;
    background: transparent;
    color: #2589FF;
  }
  .el-button--mini{
    padding: 4px 15px;
  }
}

</style>
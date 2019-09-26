<template>
  <div class="zent-breadcrumb">
    <span>移动店铺</span>
    <ul class="navbar-right fr">
      <!-- <li>套餐升级</li>
      <li>客户消息</li> -->
      <li class="sfc-solution-user">
        <!-- <svg-icon icon-class="clipboard"/> -->
        <i class="iconfont icon-unorderedlist"></i>
        <ul class="acount-menu">
          <!-- 多视图 -->
          <li>
            <!-- <svg-icon icon-class="clipboard"></svg-icon> -->
            <i class="iconfont icon-shop"></i>
            <span class="lab">切换店铺</span>
          </li>
          <router-link tag="li" to="/useredit">
            <!-- <svg-icon icon-class="clipboard"></svg-icon> -->
            <i class="iconfont icon-user"></i>
            <span class="lab">账号信息</span>
          </router-link>
          <li tag="li" to="" @click="logout">
            <!-- <svg-icon icon-class="clipboard"></svg-icon> -->
            <i class="iconfont icon-poweroff"></i>
            <span class="lab">退出账号</span>
          </li>
        </ul> 
      </li>
      <li><ySkin></ySkin></li>
    </ul>
  </div>
</template>
<script>
import ySkin from '@/components/ySkin/index'
export default {
  data(){
    return {

    }
  },
  components:{
    ySkin
  },
  methods:{
    logout(){
      let _this = this,
        info = JSON.parse(localStorage.getItem("info"));
        
      _this.$http.post(_this.baseUrl + _this.url.user.Logout,{
        token:info.token,
        role_type:_this.url.role_type
      }).then((res)=>{
        if(res.data.ret == 200){
          localStorage.removeItem('info')
          _this.$message('退出登录成功')
          _this.$router.replace({
            path:`/login?redirect=${_this.$route.fullPath}`
          })
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.zent-breadcrumb{
  position: relative;
  height: 56px;
  min-width: 750px;
  box-sizing: border-box;
  background: #fff;
  border-bottom: 1px solid #e5e5e5;
  padding: 0 100px 0 5px;
  padding: 21px;
  font-size: 14px;
  .navbar-right{
    li{
      float:left;
      padding: 0 15px;
      height: 33px;
      display: inline-block;
      // border: 1px solid #333;
      cursor: pointer;
      &:hover{
        color: #50a8f5;
      }
      .acount-menu{
        position: absolute;
        top: 48px;
        right: 10px;
        z-index: 3000;
        width: 200px;
        display: none;
        font-size: 14px;
        color: #61616A;
        background: #FFFFFF;
        box-shadow: 0 2px 10px 0 rgba(15, 12, 70, 0.1);
        border: 1px solid #E5E4E9;
        border-radius: 4px;
        padding: 0 10px;
        li{
          width: 170px;
          height: 50px;
          line-height: 50px;
          color: #61616A;
          display: block;
          border-bottom: 1px solid #E5E4E9;
          font-size: 14px;
          .lab{
            margin-left: 10px;
            display: inline-block;
          }
          &:hover{
            color: #50a8f5;
          }
          &:last-child{
            border: none;
          }
        }
      }
      &.sfc-solution-user{
        &:hover{
          .acount-menu{
            display: block;
          }
        }
      }
    }
  }
}
</style>

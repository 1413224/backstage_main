<template>
  <div>
    <div class="head clearfix bg-white p">
      <div class="left fl"></div>
      <div class="right fr">
        <el-button size="mini">取消</el-button>
        <el-button type="primary" plain size="mini">预览</el-button>
        <el-button type="primary" size="mini">保存</el-button>
      </div>
    </div>

    <div class="content-wrap">
      <div class="content bg-white box-shadow-page p-1 rounded">
        <yTitle class="mt ml mb-1">列表页面</yTitle>
        <div class="bg-gray rounded p-1">sdfs</div>
      </div>
    </div>


    <!-- 侧边配置项 -->
    <el-drawer
      title=""
      :visible.sync="configDrawer"
      direction="rtl"
      :modal="false"
      size="100%"
      class="config-drawer">
      <el-form 
        :model="collForm"
        :rules="collRules" 
        ref="collForm" 
        label-width="70px"
        class="coll-form">
        <el-collapse v-model="activeNames" @change="handleChange" class="collapse">
          <el-collapse-item title="配置信息" name="1">
            <el-form-item label="页面类型" prop="pageType">
              <p style="margin-top:2px;color:#686A73;">通用列表</p>
            </el-form-item>
            <el-form-item label="ApiUrl" prop="pageType">
              <p style="margin-top:2px;color:#686A73;">129482538/usercenter/design/set</p>
            </el-form-item>
            <el-form-item label="页面名称" prop="name">
              <el-input class="coll-input" v-model="collForm.name" size="mini"></el-input>
            </el-form-item>
            <el-row>
              <el-col :span="14">
                <el-form-item label="所属分类" prop="roleType">
                  <ySelect
                    v-model="collForm.roleType" 
                    :options="options"
                    @changeSel="changeSel"
                    class="coll-input"></ySelect>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="-" prop="pageType" class="mergecoll">
                  <ySelect
                    v-model="collForm.pageType" 
                    :options="pageTypeOptions"
                    placeholder="页面分类"
                    class="coll-input"></ySelect>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="PATH" prop="pagePath">
              <el-input class="coll-input" v-model="collForm.pagePath" size="mini"></el-input>
            </el-form-item>
            <el-form-item label="状态" prop="status" class="status-text">
              <el-radio-group v-model="collForm.status">
                <el-radio label="1">显示</el-radio>
                <el-radio label="0">隐藏</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-collapse-item>

          <!-- 标签信息 -->
          <el-collapse-item name="2">
            <template slot="title">
              <el-checkbox checked class="check" @click.stop.native="check()"></el-checkbox>
              标签信息
            </template>
            <draggable 
              v-model="collForm.spanList"
              @end="end"
              class="span-draggable">
              <li class="item mb-2 p-1" v-for="(item,index) in collForm.spanList" :key="index">
                <el-form-item label="标签名称">
                  <el-input class="coll-input" v-model="item.name" size="mini"></el-input>                  
                </el-form-item>
                <el-form-item label="标签路径">
                  <el-input class="coll-input" v-model="item.path" size="mini"></el-input>                  
                </el-form-item>
                <el-form-item label="状态" class="status-text">
                  <el-radio-group v-model="item.jumpType">
                    <el-radio label="1">当前窗口</el-radio>
                    <el-radio label="0">新窗口</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="链接" v-if="item.jumpType==0">
                  <el-input class="coll-input" v-model="item.windowPath" size="mini"></el-input>                  
                </el-form-item>
              </li>
            </draggable>
            <div class="addlabel-wrap">
              <div class="add-btn font-sm d-flex a-center pl-1"
                @click="addDragSpan()">
                <i class="iconfont icon-jiahao"></i>
                <p class=" ml-1">添加一个标签</p>
              </div>
              <p class="desc font-sm mt-2">最多添加 10 个导航，拖动选中的导航可对其排序</p>
            </div>
          </el-collapse-item>
          <!-- 标签信息 end -->

          <!-- 额外信息 -->
          <el-collapse-item name="3">
            <template slot="title">
              <el-checkbox :checked="false" class="check" @click.stop.native="check()"></el-checkbox>
              额外信息
            </template>
          </el-collapse-item>
          <!-- 额外信息end -->

          <!-- 统计信息 -->
          <el-collapse-item name="4">
            <template slot="title">
              <el-checkbox :checked="false" class="check" @click.stop.native="check()"></el-checkbox>
              统计信息
            </template>
            <el-form-item label="统计信息">
              <p style="margin-top:2px;color:#686A73">符合条件的页面总数</p>
            </el-form-item>
            <el-form-item label="自定义说明" class="label-width">
              <p style="margin-top:2px;color:#686A73;display:inline-block;margin-right:10px;">
                {{adyText}}
              </p>
              <el-button type="text" class="edit-text" @click="showEditZDY">修改</el-button>
            </el-form-item>
            <div class="edit-wrap" v-show="editZDY">
              <el-form-item label="自定义说明" class="label-width">
                <el-input class="coll-input" size="mini" v-model="adyChageText"></el-input>                  
              </el-form-item>
              <div class="btn-wrap" style="text-align:center">
                <el-button type="primary" size="mini">确定</el-button>
                <el-button size="mini" @click="hideEditZDY">取消</el-button>
              </div>
            </div>
          </el-collapse-item>
          <!-- 统计信息end -->

          <!-- 提示信息 -->
          <el-collapse-item name="5">
            <template slot="title">
              <el-checkbox :checked="false" class="check" @click.stop.native="check()"></el-checkbox>
              提示信息
            </template>
            <el-form-item label="描述" prop="tsDesc">
              <el-input class="coll-input" 
                v-model="collForm.tsDesc" size="mini" type="textarea"
                :rows="3"
                placeholder="请输入..."></el-input>
            </el-form-item>
            <el-form-item label="状态" class="status-text">
              <el-radio-group v-model="collForm.tshrefStatus">
                <el-radio label="1">系统链接</el-radio>
                <el-radio label="0">自定义链接</el-radio>
              </el-radio-group>
            </el-form-item>
            <div>
              <el-button class="lianijie" size="mini" v-show="collForm.tshrefStatus==1">选择链接</el-button>
              <el-form-item label="H5链接" prop="desc" v-show="collForm.tshrefStatus==0">
                <el-input class="coll-input" 
                  v-model="collForm.tshref" size="mini"
                  placeholder="请填写需要跳转的链接"></el-input>
              </el-form-item>
            </div>
          </el-collapse-item>
          <!-- 提示信息end -->

          <!-- 筛选设置 -->
          <el-collapse-item name="6">
            <template slot="title">
              <el-checkbox :checked="false" class="check" @click.stop.native="check()"></el-checkbox>
              筛选设置
            </template>
          </el-collapse-item>
          <!-- 筛选设置end -->

          <!-- 汇总数据 -->
          <el-collapse-item name="7">
            <template slot="title">
              <el-checkbox :checked="false" class="check" @click.stop.native="check()"></el-checkbox>
              汇总数据
            </template>
          </el-collapse-item>
          <!-- 汇总数据end -->

          <!-- 列表设置 -->
          <el-collapse-item name="8">
            <template slot="title">
              <el-checkbox :checked="false" class="check" @click.stop.native="check()"></el-checkbox>
              列表设置
            </template>
          </el-collapse-item>
          <!-- 列表设置end -->

          <el-collapse-item title="页面信息" name="100">
            <el-form-item label="页面标题" prop="pagrTitle">
              <el-input class="coll-input" v-model="collForm.pagrTitle" size="mini"></el-input>
            </el-form-item>
            <el-form-item label="页面描述" prop="desc">
              <el-input class="coll-input" 
                v-model="collForm.desc" size="mini" type="textarea"
                :rows="3"
                placeholder="请输入页面描述..."></el-input>
            </el-form-item>
            <el-form-item label="页面说明" prop="desc">
              <el-input class="coll-input" 
                v-model="collForm.sm" size="mini" type="textarea"
                :rows="3"
                placeholder="请输入页面说明..."></el-input>
            </el-form-item>
          </el-collapse-item>
        </el-collapse>
      </el-form>
    </el-drawer>
    <!-- 侧边配置项end -->
  </div>
</template>
<script>
import ySelect from '@/components/ySelect/index'
import draggable from 'vuedraggable'
export default {
  data(){
    return {
      configDrawer:true,
      activeNames:['1','','','5'],
      options:[
        {label:'全部适用',value:-1}
      ],
      pageTypeOptions:[

      ],
      collForm:{
        name:'dsf',
        pagePath:'',
        status:'',
        pageType:null,
        roleType:'',
        pagrTitle:'',
        desc:'',
        sm:'',
        spanList:[
          {name:'测试标题1',path:'dd',jumpType:'1',windowPath:''},
          {name:'测试标题2',path:'ff',jumpType:'1',windowPath:''},
        ],
        tsDesc:'',
        tshrefStatus:'1',
        tshref:''
      },
      collRules:{

      },
      editZDY:false,
      adyText:'符合条件的页面总数',
      adyChageText:''
    }
  },
  methods:{
    handleChange(val){
      console.log(val)
    },
    changeSel(val){

    },
    check(){

    },
    end(evt){
      // console.log(evt)
      console.log(this.collForm.spanList)
    },
    addDragSpan(){
      let _this = this,
          itemLen = _this.collForm.spanList.length;
      if(itemLen==10){
        _this.$message({
          type:'warning',
          message:'最多只能添加10个导航!'
        })
        return
      }
      _this.$set(_this.collForm.spanList,itemLen,{name:'',path:''})
    },
    showEditZDY(){
      this.editZDY = true
    },
    hideEditZDY(){
      this.editZDY = false
    }
  },
  components:{
    ySelect,
    draggable
  }
}
</script>
<style lang="less" scoped>
@import url('./actions/customPage.less');
.lianijie{
  margin-left: 35px;
}
</style>
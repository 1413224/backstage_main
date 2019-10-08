<template>
  <div class="detail-wrap">
    <yTitle>{{titText}} - 栏目管理</yTitle>
    <div class="content bg-gray">
      <div class="search clearfix">
        <el-button @click="delBatch()" size="small" type="danger" plain>批量删除</el-button>
        <el-button @click="addColumn('column')" size="small" type="primary" plain>新增</el-button>
      </div>
          <!-- :lazy="true"
          :load="load" 
          :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
          -->
      <div class="table-wrap">
        <el-table
          :data="tableData"
          row-key="id"
          stripe
          default-expand-all
          @selection-change="selectionChange"
          style="width: 100%">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            prop="name"
            label="栏目名称"
            width="180">
          </el-table-column>
          <el-table-column
            prop="menuType"
            label="栏目类型"
            width="180">
          </el-table-column>
          <el-table-column
            label="栏目图标"
            width="180">
            <template slot-scope="scope">
              <i class="icon iconfont" :class="scope.row.icon"></i>
            </template>
          </el-table-column>
          <el-table-column
            prop="path"
            label="栏目路径"
            width="180">
          </el-table-column>
          <el-table-column
            label="移动"
            width="180">
            <template slot-scope="scope">
              <i @click="umDisplayOrder(scope.row.id,1)" class="iconfont icon-zhiding"></i>
              <i @click="umDisplayOrder(scope.row.id,2)" class="iconfont icon-xiangshang"></i>
              <i @click="umDisplayOrder(scope.row.id,3)" class="iconfont icon-xiangxia"></i>
              <i @click="umDisplayOrder(scope.row.id,4)" class="iconfont icon-dibu"></i>
            </template>
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态"
            width="180">
            <template slot-scope="scope">
              <div @click="changeStatus(Number(scope.row.status),scope.row.id)">
                <el-button v-if="scope.row.status==1" class="status" type="success" size="small">可用</el-button>
                <el-button v-if="scope.row.status==0" class="status" type="danger" size="small">禁用</el-button>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="text"
                @click="handleEdit(scope.row)">编辑
              </el-button>
              <el-button
                v-if="scope.row.menuType!='menuPage'"
                size="mini"
                type="text"
                @click="handleAdd(scope.row)">添加
              </el-button>
              <el-button
                size="mini"
                type="text"
                @click="handleDel(scope.row)">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <el-dialog
        :title="dialogColumnGroupText"
        :visible.sync="dialogColumnGroup"
        width="30%">
        <el-form :model="ColumnGroup" :rules="columnGroupRules" ref="ColumnGroup" label-width="110px">
          <el-form-item label="栏目类型：" prop="type">
            <el-radio-group v-model="ColumnGroup.menuType" @change="tabColumnGroup">
              <el-radio label="menuLabel">栏目组</el-radio>
              <el-radio label="menuPage" :disabled="disableColumn">页面</el-radio>
            </el-radio-group>
          </el-form-item>
          <div v-if="ColumnGroup.menuType=='menuLabel'">
            <el-form-item label="组名称：" prop="name">
              <el-input size="small" class="item-input" v-model="ColumnGroup.name" placeholder="请输入名称"></el-input>
            </el-form-item>
          </div>
          <div v-if="ColumnGroup.menuType=='menuPage'">
            <el-form-item  label="页面名称：" prop="pageName">
              <el-input size="small" class="item-input" v-model="ColumnGroup.pageName" placeholder="请输入名称"></el-input>
            </el-form-item>
          </div>

          <el-form-item label="跳转类型：" v-if="ColumnGroup.menuType=='menuPage'">
            <el-radio-group v-model="ColumnGroup.goType" @change="changeGoType">
              <el-radio label="0">内部页面</el-radio>
              <el-radio label="1">系统自带</el-radio>
              <el-radio label="2">外部链接</el-radio>
            </el-radio-group>
          </el-form-item>
          <template v-if="ColumnGroup.menuType=='menuPage'">
            <el-form-item v-if="ColumnGroup.goType==0" label="路径：" prop="path">
              <el-input size="small" class="item-input" v-model="ColumnGroup.pagePath" placeholder="请输入以'/'开头的路径"></el-input>
            </el-form-item>

            <el-form-item v-if="ColumnGroup.goType==1" label="请选择系统页面：">
              <span>{{selectSrcName + ' ' + ColumnGroup.selectSrcPath}}</span>
              <el-button style="margin-left:10px;" size="small" @click="clickSrc">
                <div>点击选择</div>
              </el-button>
            </el-form-item>

            <el-form-item v-if="ColumnGroup.goType==2" label="外部链接：">
              <el-input size="small" class="item-input" v-model="ColumnGroup.outSidePath" placeholder="请输入以http或https开头的路径"></el-input>              
            </el-form-item>
          </template>



          <!-- <div v-if="ColumnGroup.menuType=='menuPage'">
            <el-form-item label="页面路径：" prop="pagePath">
              <el-input size="small" class="item-input" v-model="ColumnGroup.pagePath" placeholder="请输入页面路径"></el-input>
            </el-form-item>
          </div> -->
          <el-form-item v-if="ColumnGroup.menuType=='menuPage'" label="跳转方式：" prop="isBlank">
            <el-radio-group v-model="ColumnGroup.isBlank">
              <el-radio label="1">当前窗口</el-radio>
              <el-radio label="0">新窗口</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="状态：" prop="status">
            <el-radio-group v-model="ColumnGroup.status">
              <el-radio label="1">可用</el-radio>
              <el-radio label="0">禁用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button size="small" @click="dialogColumnGroup = false">取 消</el-button>
          <el-button size="small" type="primary" @click="submitMenuGroup('ColumnGroup')">确 定</el-button>
        </span>
      </el-dialog>

      <el-dialog
        :title="dialogColumnText"
        :visible.sync="dialogColumn"
        width="30%"
        :before-close="closeDialogColumn">
        <!-- :before-close="closeDialogColumn" -->
        <el-form :model="column" :rules="columnRules" ref="column" label-width="110px">
          <el-form-item label="栏目类型：" prop="menuType">
            <el-radio-group v-model="column.menuType" @change="tabColumn">
              <el-radio label="menu" >栏目</el-radio>
              <el-radio label="menuPage" :disabled="disableColumn">页面</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item v-if="column.menuType=='menu'" label="栏目名称：" prop="name">
            <el-input size="small" class="item-input" v-model="column.name" placeholder="请输入名称"></el-input>
          </el-form-item>
          <el-form-item v-if="column.menuType=='menuPage'" label="页面名称：" prop="pageName">
            <el-input size="small" class="item-input" v-model="column.pageName" placeholder="请输入页面名称"></el-input>
          </el-form-item>
          <el-form-item label="栏目图标：">
            <div @click="clickIcon" class="iconfont ico" :class="iconClass"></div>
          </el-form-item>
          <el-form-item v-if="column.menuType=='menuPage'" label="跳转方式：" prop="isBlank">
            <el-radio-group v-model="column.isBlank">
              <el-radio label="1">当前窗口</el-radio>
              <el-radio label="0">新窗口</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="跳转类型：">
            <el-radio-group v-model="column.goType" @change="changeGoType">
              <el-radio label="0">内部页面</el-radio>
              <el-radio label="1">系统自带</el-radio>
              <el-radio label="2">外部链接</el-radio>
            </el-radio-group>
          </el-form-item>

          <template>
            <el-form-item v-if="column.goType==0" label="路径：" prop="path">
              <el-input size="small" class="item-input" v-model="column.path" placeholder="请输入以'/'开头的路径"></el-input>
            </el-form-item>

            <el-form-item v-if="column.goType==1" label="请选择系统页面：">
              <span>{{selectSrcName + ' ' + column.selectSrcPath}}</span>
              <el-button style="margin-left:10px;" size="small" @click="clickSrc">
                <div>点击选择</div>
              </el-button>
            </el-form-item>

            <el-form-item v-if="column.goType==2" label="外部链接：">
              <el-input size="small" class="item-input" v-model="column.outSidePath" placeholder="请输入以http或https开头的路径"></el-input>              
            </el-form-item>
          </template>
          
          <el-form-item label="状态：" prop="status">
            <el-radio-group v-model="column.status">
              <el-radio label="1">可用</el-radio>
              <el-radio label="0">禁用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button size="small" @click="calcelColumn('column')">取 消</el-button>
          <el-button size="small" type="primary" @click="submitColumn('column')">确 定</el-button>
        </span>
      </el-dialog>

      <el-dialog
        :title="dialogPageText"
        :visible.sync="dialogPage"
        :before-close="closeDialogPage"
        width="30%">
        <el-form :model="pageColumn" :rules="pageColumnRules" ref="pageColumn" label-width="120px">
          <el-form-item label="页面名称：" prop="pageName">
            <el-input size="small" class="item-input" v-model="pageColumn.pageName" placeholder="请输入名称"></el-input>
          </el-form-item>
          <el-form-item label="跳转方式：" prop="isBlank">
            <el-radio-group v-model="pageColumn.isBlank">
              <el-radio label="1">当前窗口</el-radio>
              <el-radio label="0">新窗口</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="跳转类型：">
            <el-radio-group v-model="pageColumn.goType" @change="changePageGoType">
              <el-radio label="0">内部页面</el-radio>
              <el-radio label="1">系统自带</el-radio>
              <el-radio label="2">外部链接</el-radio>
            </el-radio-group>
          </el-form-item>

          <template>
            <!-- :key="Math.random()" -->
            <el-form-item v-if="pageColumn.goType==0" label="路径：" prop="path">
              <el-input size="small" class="item-input" v-model="pageColumn.path" placeholder="请输入以'/'开头的路径"></el-input>
            </el-form-item>

            <el-form-item v-if="pageColumn.goType==1" label="请选择系统页面：">
              <span>{{selectSrcName + ' ' + pageColumn.selectSrcPath}}</span>
              <el-button style="margin-left:10px;" size="small" @click="clickSrc">
                <div>点击选择</div>
              </el-button>
            </el-form-item>

            <el-form-item v-if="pageColumn.goType==2" label="外部链接：">
              <el-input size="small" class="item-input" v-model="pageColumn.outSidePath" placeholder="请输入以http或https开头的路径"></el-input>              
            </el-form-item>
          </template>


          <el-form-item label="状态：" prop="status">
            <el-radio-group v-model="pageColumn.status">
              <el-radio label="1">可用</el-radio>
              <el-radio label="0">禁用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button size="small" @click="dialogPage = false">取 消</el-button>
          <el-button size="small" type="primary" @click="submitEditPage('pageColumn')">确 定</el-button>
        </span>
      </el-dialog>

      <selectIcon v-model="dialogIcon" @selIcon="selIcon"></selectIcon>
      <!-- <selectSrc v-model="dialogSrc"></selectSrc> -->
      
      <selectPage 
        v-model="dialogSelectPage" 
        :roleType="$route.query.roleType"
        @selSrc="selSrc"></selectPage>

    </div>
  </div>
</template>
<script>
import breadCrumb from '@/components/breadcrumb/breadcrumb'
import selectIcon from '@/components/selectIcon/selectIcon'
// import selectSrc from '@/components/selectSrc/selectSrc'
import selectPage from './components/selectPages'
import actions from './actions/menuDetail'
export default {
  data(){
    return {
      dialogSelectPage:false,
      selectSrcName:'',
      
      dialogIcon:false,
      dialogSrc:false,
      iconClass:'icon-tianjia',
      parentId:'',
      rowId:'',
      disableColumn:false,
      dialogColumnGroup:false,
      dialogColumn:false,
      dialogPage:false,
      dialogColumnText:'',
      dialogColumnGroupText:'',
      dialogPageText:'',
      ColumnGroup:{
        goType:'0',
        selectSrcPath:'',
        selectSrcId:null,
        outSidePath:'',
        menuType:'menuLabel',
        name:'',
        status:'1',
        pageName:'',
        pagePath:'',
        isBlank:'1'
      },
      columnGroupRules:{
        name:[
          {required: true, message: '请输入栏目组名称',trigger:'blur'}
        ],
        pageName:[
          {required: true, message: '请输入页面名称',trigger:'blur'}
        ],
        pagePath:[
          {required: true, message: '请输入页面路径',trigger:'blur'}
        ]
      },
      column:{
        selectSrcPath:'',
        selectSrcId:null,
        goType:'0',
        menuType:'menu',
        name:'',
        // pathName:'',
        pageName:'',
        path:'',
        icon:'',
        isBlank:'1',
        status:'1',
        outSidePath:''
      },
      columnRules:{
        name:[
          {required: true, message: '请输入侧边栏组的名称',trigger:'blur'}
        ],
        pageName:[
          {required: true, message: '请输入页面名称',trigger:'blur'}
        ],
        menuType:[
          {required: true, message: '请选择栏目类型',trigger:'blur'}
        ],
        path:[
          {required: true, message: '请输入路径',trigger:'blur'}
        ]
      },
      pageColumn:{
        selectSrcPath:'',
        selectSrcId:null,
        outSidePath:'',
        goType:'0',
        pageName:'',
        path:'',
        isBlank:'1',
        status:'1',
        dd:''
      },
      pageColumnRules:{
        pageName:[
          {required: true, message: '请输入页面名称',trigger:'blur'}
        ],
        path:[
          {required: true, message: '请输入路径',trigger:'blur'}
        ]
      },
      tableData:[
        // {
        //   create_time: "1567524540",
        //   display_order: "0",
        //   group_id: "8",
        //   icon: "",
        //   id: 11,
        //   isBlank: "0",
        //   is_leaf: "1",
        //   level: "0",
        //   menuType: "menu",
        //   name: "sd saas",
        //   parent_id: "0",
        //   path: "/path",
        //   status: "1",
        //   update_time: "1567524540"
        // }
      ],
      selection:[],
      titText:''
    }
  },
  created(){
    let _this = this
    if(_this.$route.query.roleName){
      _this.titText = decodeURI(_this.$route.query.roleName)
    }
    _this.getList()
  },
  methods:{
    ...actions,
  },
  watch:{
    iconClass(val,oldVal){
      if(val!=oldVal){
        return val
      }
    }
  },
  components:{
    selectIcon,
    // selectSrc,
    selectPage
  }
}
</script>
<style lang="less" scoped>
.content{
  margin-top: 20px;
  padding: 10px;
  border-radius: 5px;
  .search{
    background: #fff;
    padding: 10px;
    .search-input{
      width: 250px;
    }
  }

  .table-wrap{
    margin-top: 10px;
    border: 1px solid #eee;
    border-radius: 10px;
    overflow: hidden;
    .status{
      padding: 5px;
    }
  }
  .ico{
    // border: 1px solid #333;
    width: 120px;
  }
  .cell{
    .icon{
      font-size: 26px !important;
      &:hover{
        cursor: default !important;
      }
    }
    .iconfont{
      font-size: 20px;
      &:hover{
        cursor: pointer;
      }
    }
  }
  .iconfont{
    font-size: 32px;
    color: #ccc;
    &:hover{
      cursor: pointer;
    }
  }
}
</style>
<style lang="less">
.table-wrap{
  .tag{
    cursor: pointer;
  }
}
.item-input{
  width: 65%;
}
</style>
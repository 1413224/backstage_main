export default {
  load(tree, treeNode, resolve){
    // console.log(tree)
    // console.log(treeNode)
    let _this = this
    _this.$http.post(_this.baseUrl + _this.url.Menu.GetMenuList,{
      token:_this.$utils.getToken(),
      group_id:_this.$route.query.id,
      parent_id:tree.id
    }).then((res)=>{
      if(res.data.ret==200){
        let data = res.data.data
        data.list.map((item)=>{
          if(item.is_leaf){
            item.hasChildren = false
          }else{
            item.hasChildren = true
          }
        })
        resolve(data.list)
      }
    })

  },
  addColumn(formName){
    let _this = this
    _this.dialogColumnText = '新增'
    _this.column.menuType = 'menu'
    _this.column.name = ''
    _this.column.pageName = ''
    _this.column.isBlank = '1'
    _this.column.path = ''
    _this.column.status = '1'
    _this.iconClass = 'icon-tianjia'

    _this.column.goType = '0'
    _this.column.selectSrcPath =''
    _this.selectSrcName =''
    
    _this.disableColumn = false
    _this.dialogColumn = true
  },
  closeDialogColumn(done){
    this.$nextTick(()=>{
      this.$refs['column'].resetFields()
      done()
    })
  },
  closeDialogPage(done){
    this.$refs['pageColumn'].resetFields()
    done()
  },
  calcelColumn(formName){
    this.$refs['column'].resetFields()
    this.dialogColumn = false
  },
  submitColumn(formName){
    let _this = this,
        url = '';
    _this.$refs[formName].validate((valid)=>{
      if(!valid){
        return false
      }
      let params = {
        token:_this.$utils.getToken(),
        group_id:_this.$route.query.id,
        parent_id:'',
        menuType:_this.column.menuType,
        icon:_this.iconClass=='icon-tianjia' ? '' : _this.iconClass,
        isBlank:_this.column.isBlank,
        // path:_this.column.path,
        path_type:_this.column.goType,
        status:_this.column.status
      }
      if(_this.column.menuType=='menu'){
        params.name=_this.column.name
      }else if(_this.column.menuType=='menuPage'){
        params.name=_this.column.pageName
      }

      //判断页面类型
      if(_this.column.goType=='0'){
        params.path = _this.column.path
      }else if(_this.column.goType=='1'){
        params.path = _this.column.selectSrcId
      }else if(_this.column.goType=='2'){
        params.path = _this.column.outSidePath
      }

      if(_this.dialogColumnText=='新增'){
        url = _this.baseUrl + _this.url.Menu.AddMenu
      }else if(_this.dialogColumnText=='编辑'){
        url = _this.baseUrl + _this.url.Menu.EditById
        params.id = _this.rowId
      }

      _this.$http.post(url,params).then((res)=>{
        if(res.data.ret==200){
          _this.$message({
            type: 'success',
            message: '更改成功!'
          })
          _this.dialogColumn = false
          // _this.$refs[formName].resetFields()
          _this.getList()
        }
      })
    })
  },

  getList(parentId){
    let _this = this
    _this.$http.post(_this.baseUrl + _this.url.Menu.GetAllList,{
      token:_this.$utils.getToken(),
      group_id:_this.$route.query.id,
      parent_id:parentId || 0
    }).then((res)=>{
      if(res.data.ret==200){
        let data = res.data.data
        _this.tableData = data.list
      }
    })
  },

  handleAdd(row){
    console.log(row)
    let _this = this
    _this.rowId = row.id
    _this.disableColumn = false
    _this.selectSrcName = ''
    if(row.menuType=="menu"){
      _this.parentId = row.id
      _this.dialogColumnGroupText = '新增'
      _this.ColumnGroup.menuType = 'menuLabel'
      _this.ColumnGroup.name = ''
      _this.ColumnGroup.pageName = ''
      _this.ColumnGroup.pagePath = ''
      _this.ColumnGroup.isBlank = '1'
      _this.ColumnGroup.status = '1'

      _this.ColumnGroup.goType = '0'
      _this.ColumnGroup.selectSrcPath = ''
      _this.ColumnGroup.selectSrcId = null
      _this.ColumnGroup.outSidePath = ''
      _this.dialogColumnGroup = true
    }else if(row.menuType=="menuPage"){
      // _this.dialogPage = true
    }else if(row.menuType=="menuLabel"){
      _this.dialogPageText = '新增'
      _this.pageColumn.pageName = ''
      _this.pageColumn.path = ''
      _this.pageColumn.isBlank = '1'
      _this.pageColumn.status = '1'

      _this.pageColumn.selectSrcPath = ''
      _this.pageColumn.selectSrcId = null

      _this.dialogPage = true
    }
  },

  submitMenuGroup(formName){
    let _this = this,
        params = {},
        url = '';
    _this.$refs[formName].validate((valid)=>{
      if(!valid){
        return false
      }
      params = {
        token:_this.$utils.getToken(),
        group_id:_this.$route.query.id,
        parent_id:_this.parentId
      }
      //添加栏目组
      if(_this.ColumnGroup.menuType=='menuLabel'){
        params.menuType = _this.ColumnGroup.menuType
        params.name =  _this.ColumnGroup.name
        params.status = _this.ColumnGroup.status
      }else if(_this.ColumnGroup.menuType=='menuPage'){
        params.menuType = _this.ColumnGroup.menuType
        params.name = _this.ColumnGroup.pageName
        // params.path = _this.ColumnGroup.pagePath
        params.path_type=_this.ColumnGroup.goType,
        params.isBlank = _this.ColumnGroup.isBlank
        params.status = _this.ColumnGroup.status
        //判断页面类型
        if(_this.ColumnGroup.goType=='0'){
          params.path = _this.ColumnGroup.path
        }else if(_this.ColumnGroup.goType=='1'){
          params.path = _this.ColumnGroup.selectSrcId
        }else if(_this.ColumnGroup.goType=='2'){
          params.path = _this.ColumnGroup.outSidePath
        }
      }

      //新增编辑判断
      if(_this.dialogColumnGroupText=='新增'){
        url = _this.baseUrl + _this.url.Menu.AddMenu
      }else if(_this.dialogColumnGroupText=='编辑'){
        url = _this.baseUrl + _this.url.Menu.EditById   
        params.id = _this.rowId     
      }

      _this.$http.post(url,params).then((res)=>{
        if(res.data.ret==200){
          _this.$message({
            type: 'success',
            message: '更改成功!'
          })
          _this.dialogColumnGroup = false
          _this.getList()
        }
      })

    })
  },

  handleDel(row){
    // console.log(row)
    let _this = this

    _this.$confirm('此操作将永久删除该信息, 是否继续?', '提示',{
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(()=>{
      _this.$http.post(_this.baseUrl + _this.url.Menu.DelMenuByIds,{
        token:_this.$utils.getToken(),
        ids:row.id
      }).then((res)=>{
        if(res.data.ret==200){
          _this.$message({
            type: 'success',
            message: '删除成功!'
          })
          
          _this.getList()
        }
      })
    }).catch(()=>{
      _this.$message({
        type: 'info',
        message: '已取消删除'
      })
    })
  },

  handleEdit(row){
    console.log(row)
    let _this = this
    _this.rowId = row.id
    _this.$http.post(_this.baseUrl + _this.url.Menu.GetInfoById,{
      token:_this.$utils.getToken(),
      id:row.id
    }).then((res)=>{
      if(res.data.ret==200){
        let data = res.data.data
        if(row.menuType=='menuPage'){
          _this.dialogPageText = '编辑'
          _this.pageColumn.pageName = data.name
          _this.pageColumn.path = data.path
          _this.pageColumn.isBlank = data.isBlank
          _this.pageColumn.status = data.status

          if(data.path_type=='0'){
            _this.pageColumn.goType = '0'
            _this.pageColumn.path = data.path

          }else if(data.path_type=='1'){
            _this.pageColumn.goType = '1'
            _this.pageColumn.selectSrcPath = data.path

          }else if(data.path_type=='2'){
            _this.pageColumn.goType = '2'
            _this.pageColumn.outSidePath = data.path
          }
          _this.dialogPage = true
        }else if(row.menuType=='menu'){
          _this.dialogColumnText = '编辑'
          _this.iconClass = data.icon ? data.icon :'icon-tianjia'
          _this.column.menuType = data.menuType
          _this.column.name = data.name
          _this.column.isBlank = data.isBlank
          // _this.column.path = data.path
          _this.column.status = data.status

          if(data.path_type=='0'){
            _this.column.goType = '0'
            _this.column.path = data.path

          }else if(data.path_type=='1'){
            _this.column.goType = '1'
            _this.column.selectSrcPath = data.path

          }else if(data.path_type=='2'){
            _this.column.goType = '2'
            _this.column.outSidePath = data.path
          }

          _this.disableColumn = true //需要还原
          _this.dialogColumn = true
        }else if(row.menuType=='menuLabel'){
          _this.dialogColumnGroupText = '编辑'
          _this.disableColumn = true //需要还原
          _this.ColumnGroup.menuType = data.menuType        
          _this.ColumnGroup.name = data.name        
          _this.ColumnGroup.status = data.status        
          _this.dialogColumnGroup = true
        }
      }
    })
  },
  submitEditPage(formName){
    let _this = this,
        params = {},
        url = '';
    _this.$refs[formName].validate((valid)=>{
      if(!valid){
        return false
      }

      params = {
        token:_this.$utils.getToken(),
        name:_this.pageColumn.pageName,
        // path:_this.pageColumn.path,
        path_type:_this.pageColumn.goType,
        isBlank:_this.pageColumn.isBlank,
        status:_this.pageColumn.status
      }

      //判断页面类型
      if(_this.pageColumn.goType=='0'){
        params.path = _this.pageColumn.path
      }else if(_this.pageColumn.goType=='1'){
        params.path = _this.pageColumn.selectSrcId
      }else if(_this.pageColumn.goType=='2'){
        params.path = _this.pageColumn.outSidePath
      }

      if(_this.dialogPageText=='编辑'){
        url = _this.baseUrl + _this.url.Menu.EditById
        params.id=_this.rowId
      }else if(_this.dialogPageText=='新增'){
        url = _this.baseUrl + _this.url.Menu.AddMenu
        params.group_id = _this.$route.query.id
        params.parent_id = _this.rowId
        params.menuType = 'menuPage'
      }

      _this.$http.post(url,params).then((res)=>{
        if(res.data.ret==200){
          _this.$message({
            type: 'success',
            message: '修改成功!'
          })
          _this.getList()
          _this.dialogPage = false

        }
      })

    })
  },

  changeStatus(status,id){
    let _this = this
    if(status==0){
      status=1
    }else{
      status=0
    }
    _this.$http.post(_this.baseUrl + _this.url.Menu.ChangeStatusByIds,{
      token:_this.$utils.getToken(),
      ids:id,
      status:status
    }).then((res)=>{
      if(res.data.ret==200){
        _this.$message({
          type: 'success',
          message: '修改成功!'
        })
        _this.getList()
        // _this.$forceUpdate()
        // window.location.reload()
      }
    })
  },
  umDisplayOrder(id,type){
    let _this = this
    _this.$http.post(_this.baseUrl + _this.url.Menu.UpdateMenuDisplayOrder,{
      token:_this.$utils.getToken(),
      menu_id:id,
      type:type
    }).then((res)=>{
      if(res.data.ret==200){
        _this.$message({
          type: 'success',
          message: '修改成功!'
        })
        _this.getList()
      }
    })
  },

  selectionChange(selection){
    this.selection = selection
  },

  delBatch(){
    let _this = this,
        idsArr = [],
        ids = '';
    if(_this.selection.length==0){
      _this.$message({
        type: 'warning',
        message: '请选择需要删除的数据!'
      })
      return false
    }
    _this.selection.map((item,index)=>{
      idsArr.push(item.id)
    })
    ids = idsArr.toString()

    _this.$confirm('此操作将永久删除该信息, 是否继续?', '提示',{
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(()=>{
      _this.$http.post(_this.baseUrl + _this.url.Menu.DelMenuByIds,{
        token:_this.$utils.getToken(),
        ids:ids
      }).then((res)=>{
        if(res.data.ret=200){
          _this.$message({
            type: 'success',
            message: '删除成功!'
          })
          _this.getList()
        }
      })
    }).catch(()=>{
      _this.$message({
        type: 'info',
        message: '已取消删除'
      })
    })
  },

  changeGoType(value){
    
  },

  changePageGoType(value){

  },

  clickSrc(){
    let _this = this
    _this.dialogSelectPage = true
  },

  tabColumn(value){
    this.$refs['column'].clearValidate()
  },
  tabColumnGroup(){
    this.$refs['ColumnGroup'].clearValidate()
  },

  clickIcon(){
    let _this = this
    _this.dialogIcon = true
  },
  selIcon(iconFont){
    this.iconClass = iconFont
    this.dialogIcon = false
  },

  recursion(data){
    let _this = this
    data.map((item,index)=>{
      if(item.is_leaf){
        item.hasChildren = false
      }else{
        item.hasChildren = true
      }
      if(item.children){
        _this.recursion(item.children)
      }
    })
  },
  selSrc(row){
    // console.log(row)
    this.selectSrcName = row.name
    this.column.selectSrcPath = row.path
    this.column.selectSrcId = row.id

    this.pageColumn.selectSrcPath = row.path
    this.pageColumn.selectSrcId = row.id

    this.ColumnGroup.selectSrcPath = row.path
    this.ColumnGroup.selectSrcId = row.id
    this.dialogSelectPage = false
  }

}
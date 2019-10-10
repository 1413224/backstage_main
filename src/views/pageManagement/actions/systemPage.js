export default {
  changeSel(value){
    // console.log(value)
    // this.getList(value)
    this.getPageCates(value)
  },
  GetRoleType(){
    return new Promise((resolve,reject)=>{
      let _this = this
      _this.$http.post(_this.baseUrl + _this.url.common.GetRoleType,{
        role_type:_this.url.role_type,
        token:_this.$utils.getToken()
      }).then((res)=>{
        if(res.data.ret==200){
          // console.log(res.data.data)
          let data = res.data.data
          let arr = []
          _this.options = data.map((item)=>{
            return {
              label:item.name,
              value:Number(item.role_type)
            }
          })
          
          _this.roleTypeList = data.map((item)=>{
            return {
              label:item.name,
              value:Number(item.role_type)
            }
          })

          _this.pageRoleTypeOptions = data.map((item)=>{
            return {
              label:item.name,
              value:Number(item.role_type)
            }
          })
         _this.options.unshift({label:'全部适用',value:-1})
         _this.pageRoleTypeOptions.unshift({label:'全部',value:-1})
         _this.options.unshift({label:'全部分类信息',value:-2})
          resolve()
        }
      })
    })
  },
  changePageSel(value){
    // this.searchForm.pageType = value
    // this.getList()
  },
  getList(roleType){
    //注意roletype为0
    let _this = this
    _this.$http.post(_this.baseUrl + _this.url.System.GetList,{
      token:_this.$utils.getToken(),
      role_type:roleType || roleType == 0 ? roleType : _this.searchForm.roleType,
      cate_id:_this.searchForm.pageType,
      status:_this.searchForm.status,
      keyword:_this.searchForm.keyword,
      page_size:_this.pageSize,
      page_num:_this.curPage
    }).then((res)=>{
      if(res.data.ret==200){
        let data = res.data.data
        _this.tableData = data.list
        _this.totalNums = Number(data.total_nums)
        _this.totalPages = data.total_pages || 1
      }
    })
  },
  submitEditPage(formName){
    let _this = this,
        url = '',
        params = {};
    _this.$refs[formName].validate((valid)=>{
      if(!valid){
        return false
      }
      params = {
        token:_this.$utils.getToken(),
        name:_this.pageForm.name,
        path:_this.pageForm.path,
        status:_this.pageForm.status
      }

      if(_this.dialogPageText=='新增'){
        if(_this.pageForm.pageCate==null || _this.pageForm.pageCate==''){
          _this.$message({
            type: 'warning',
            message: '请选择页面分类!'
          })
          return false
        }
        params.cate_id = _this.pageForm.pageCate,
        url = _this.baseUrl + _this.url.System.Add
      }else if(_this.dialogPageText=='编辑'){
        url = _this.baseUrl + _this.url.System.EditById
        params.id = _this.pageId
        // params.cate_id = _this.cateId
        params.cate_id = _this.pageForm.pageCate
      }

      _this.$http.post(url,params).then((res)=>{
        if(res.data.ret==200){
          _this.$message({
            type: 'success',
            message: '更改成功!'
          })
          _this.dialogPage = false
          _this.getList()
        }
      })
      
    })
  },
  changePageCateSel(value){
    let _this = this
    _this.getPageCates(value).then(()=>{
      _this.pageForm.pageCate = null
    })
  },
  getPageCates(roleType){
    return new Promise((resolve,reject)=>{
      let _this = this 
      if(roleType==-2){
        _this.pageTypeOptions = []
        return false
      }
      _this.$http.post(_this.baseUrl + _this.url.System.GetAllValidCateList,{
        token:_this.$utils.getToken(),
        role_type:roleType || roleType == 0 ? roleType : -1
      }).then((res)=>{
        if(res.data.ret==200){
          let data = res.data.data
          _this.pageOptions = data.list.map((item,index)=>{
            return {
              label:item.name,
              value:Number(item.id)
            }
          })
          _this.pageTypeOptions = data.list.map((item,index)=>{
            return {
              label:item.name,
              value:Number(item.id)
            }
          })
          resolve(_this.pageOptions)
        }
      })
    })
  },
  selectionChange(selection){
    this.selection = selection
  },
  addPage(){
    let _this = this
    _this.getPageCates().then(()=>{
      _this.showEdit = false
      _this.editBtn = false
      _this.dialogPageText=='新增'
      _this.pageForm.name = ''
      _this.pageForm.path = ''
      _this.pageForm.pageCate = null
      _this.dialogPage = true
    })
  },
  changeStatus(status,id){
    let _this = this
    if(status==0){
      status = 1
    }else{
      status = 0
    }
    _this.$http.post(_this.baseUrl + _this.url.System.ChangeStatusByIds,{
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
      }
    })
  },
  editManage(id,row){
    let _this = this
    _this.pageForm.pageCate = null
    _this.getPageCates().then(()=>{
      // console.log(row)
      _this.pageId = id
      _this.cateId = row.cate_id
      
      _this.dialogPageText = '编辑'
      _this.showEditBtnCate = false
      _this.showEdit = true
      _this.editBtn = true
      _this.showEditPageText = row.cate_name

      _this.pageForm.name = row.name
      _this.pageForm.path = row.path
      _this.pageForm.status = row.status

      // _this.pageForm.roleType = -1
      // _this.pageForm.pageCate 
      // _this.pageForm.roleType = row.cate_id
      _this.dialogPage = true
    })
  },
  delManage(id){
    let _this = this
    _this.$confirm('此操作将永久删除该信息, 是否继续?','提示',{
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(()=>{
      _this.$http.post(_this.baseUrl + _this.url.System.DelByIds,{
        token:_this.$utils.getToken(),
        ids:id
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
  editBtnCate(edit){
    if(edit){
      this.showEdit = false
      this.showEditBtnCate = true
    }else{
      this.showEdit = true
      this.showEditBtnCate = false
    }
    this.editBtn = true
  },
  delPage(){
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
      _this.$http.post(_this.baseUrl + _this.url.System.DelByIds,{
        token:_this.$utils.getToken(),
        ids:ids
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
  changeCate(value){
    console.log(value)
    this.pageForm.pageCate = value
  },
  closeDialogPage(done){
    this.$refs['pageForm'].resetFields()
    this.showEdit = false
    done()
  },
  handleSize(sizeVal){
    this.pageSize = sizeVal
    this.curPage = 1
    this.getList()
  },
  handleCurrent(currentVal){
    this.curPage = currentVal
    this.getList()
  }
}
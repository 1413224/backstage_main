export default{
  selectionChange(selection){
    this.selection = selection
  },
  sortChange(column){
    let _this = this
    if(column.order=='descending'){
      _this.getList(2)
    }
    if(column.order=='ascending'){
      _this.getList(1)
    }
  },
  getList(sort){
    let _this = this
    _this.$http.post(_this.baseUrl + _this.url.pageGroup.GetList,{
      token:_this.$utils.getToken(),
      page_group_id:_this.parentInfo.id,
      sort:sort ? sort : 2,
      keyword:_this.searchForm.keyword,
      status:_this.searchForm.status,
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
  getPageList(){
    let _this = this
    _this.$http.post(_this.baseUrl + _this.url.pageGroup.GetGroupPageList,{
      token:_this.$utils.getToken(),
      keyword:_this.pageForm.keyWork,
      page_size:_this.pagePageSize,
      page_num:_this.pageCurPage
    }).then((res)=>{
      if(res.data.ret==200){
        _this.pageData = res.data.data.list
      }
    })
  },
  submitPage(){
    let _this = this
    // console.log(_this.selectionPage)
    if(_this.selectionPage.length==0){
      _this.$message({
        type: 'warning',
        message: '请选择页面!'
      })
      return false
    }

    let pathArr = []
    _this.selectionPage.map((item,index)=>{
      pathArr.push(item.path)
    })

    _this.$http.post(_this.baseUrl + _this.url.pageGroup.Add,{
      token:_this.$utils.getToken(),
      page_group_id:_this.parentInfo.id,
      path:pathArr.toString(),
      status:1
    }).then((res)=>{
      if(res.data.ret==200){
        _this.$message({
          type: 'success',
          message: '新增成功!'
        })
        _this.dialogPage = false
        _this.getList()
      }
    })
  },
  delPagepl(){
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
    
    _this.$confirm('此操作将永久删除该页面, 请确认操作！','提示',{
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(()=>{
      _this.$http.post(_this.baseUrl + _this.url.pageGroup.DelByIds,{
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
    })
  },
  delPage(id){
    let _this = this
    _this.$confirm('此操作将永久删除该页面, 请确认操作！','提示',{
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(()=>{
      _this.$http.post(_this.baseUrl + _this.url.pageGroup.DelByIds,{
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
}
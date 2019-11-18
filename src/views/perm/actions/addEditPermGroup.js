export default {
  addPage(){
    this.dialogPage = true
  },
  getPageList(){
    let _this = this
    _this.$http.post(_this.baseUrl + _this.url.Perm.GetPageList,{
      token:_this.$utils.getToken(),
      role_type:_this.roleType,
      keyword:_this.pageForm.keyWork,
      page_size:_this.pageSize,
      page_num:_this.curPage
    }).then((res)=>{
      if(res.data.ret==200){
        let data = res.data.data
        _this.pageData = data.list
        _this.totalNums = Number(data.total_nums)
        _this.totalPages = data.total_pages || 1
      }
    })
  },
  submitPermGroup(formName){
    let _this = this,
        params = '',
        url = '';
    _this.$refs[formName].validate((valid)=>{
      if(!valid){
        return false
      }
      params = {
        token:_this.$utils.getToken(),
        role_type:_this.roleType,
        type:_this.rulesForm.type,
        attribute:_this.rulesForm.attribute,
        name:_this.rulesForm.groupName,
        code:_this.rulesForm.code,
        status:_this.rulesForm.status
      }

      //编辑
      if(_this.isEdit){
        params.id = _this.$route.query.id
        if(_this.rulesForm.type==1){
          if(_this.tableData.length==0){
            params.page_path = []
          }else{
            params.page_path = _this.selPathArr()
          }
        }
        url = _this.baseUrl + _this.url.Perm.EditById
      }else{
        //新增
        if(_this.$route.query.name){
          params.parent_id = _this.$route.query.id
        }
        if(_this.rulesForm.type==1){
          if(_this.tableData.length==0){
            params.page_path = []
          }else{
            params.page_path = _this.selPathArr()
          }
        }
        url = _this.baseUrl + _this.url.Perm.Add
      }

      _this.$http.post(url,params).then((res)=>{
        if(res.data.ret==200){
          if(!_this.isEdit){
            _this.$message({
              type: 'success',
              message: '新增成功!'
            })
          }else{
            _this.$message({
              type: 'success',
              message: '修改成功!'
            })
          }
          _this.$router.push({
            path:'/perm/permGroup',
            query:{
              roleType:_this.roleType
            }
          })
        }
      })
    })
  },
  getInfo(){
    let _this = this
    _this.$http.post(_this.baseUrl + _this.url.Perm.GetInfoById,{
      token:_this.$utils.getToken(),
      id:_this.$route.query.id
    }).then((res)=>{
      if(res.data.ret==200){
        
        _this.Info = res.data.data
        // if(_this.$route.query.editName){
        //   _this.Info.parent_name = unescape(_this.$route.query.editName)
        // }
        _this.rulesForm.groupName = _this.Info.name
        _this.rulesForm.code = _this.Info.code
        _this.rulesForm.type = _this.Info.type
        _this.rulesForm.attribute = _this.Info.attribute
        _this.rulesForm.status = _this.Info.status
        //等待完善页面
        _this.tableData = _this.Info.page_list
      }
    })
  },
  calcelPage(){
    let _this = this
    _this.pageSelection = []
    _this.dialogPage = false
  },
  selectionChange(val){
    this.selection = val
  },
  submitEditPage(){
    let _this = this
    _this.pageSelection = _this.selection

    _this.pageSelection.map((item,index)=>{
      let i = false
      _this.tableData.map((itm,idx)=>{
        if(item.id==itm.id){
          i = true
        }
      })
      if(i){
        _this.pageSelection.splice(index,1)
      }
    })
    // console.log(_this.pageSelection)
    _this.pageSelection.map((item,index)=>{
      _this.tableData.push(item)
    })
    
    _this.dialogPage = false
  },
  unBind(row){
    let _this = this
    _this.$confirm('此操作将永久从页面组解除该页面, 请确认操作！', '提示',{
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(()=>{
      for(let i=0;i<_this.tableData.length;i++){
        if(_this.tableData[i].id==row.id){
          _this.tableData.splice(i,1)
        }
      }
    }).catch(()=>{
      _this.$message({
        type: 'info',
        message: '已取消删除'
      })
    })
    // console.log(_this.tableData)
  },
  selPathArr(){
    let _this = this
    let pathArr = []
    _this.tableData.map((item,index)=>{
      pathArr.push(item.path)
    })
    return pathArr.toString()
  }
}
export default {
  getList(){
    let _this = this
    _this.$http.post(_this.baseUrl + _this.url.Perm.GetAllList,{
      token:_this.$utils.getToken(),
      role_type:_this.roleType,
      status:_this.searchForm.status
    }).then((res)=>{
      if(res.data.ret==200){
        let data = res.data.data
        _this.tableData = data.list
      }
    })
  },
  changeStatus(status,id){
    let _this = this
    if(status==0){
      status=1
    }else{
      status=0
    }
    _this.$http.post(_this.baseUrl + _this.url.Perm.ChangeStatusByIds,{
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
  umDisplayOrder(id,type){
    let _this = this
    _this.$http.post(_this.baseUrl + _this.url.Perm.UpdateDisplayOrder,{
      token:_this.$utils.getToken(),
      id:id,
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
  handleDel(row){
    let _this = this

    _this.$confirm('此操作将永久删除该权限组, 请确认操作！', '提示',{
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(()=>{
      _this.$http.post(_this.baseUrl + _this.url.Perm.DelByIds,{
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
  delPerm(){
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

    _this.$confirm('此操作将永久删除该权限组, 请确认操作！', '提示',{
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(()=>{
      _this.$http.post(_this.baseUrl + _this.url.Perm.DelByIds,{
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
  handleAdd(row){
    this.$router.push({
      path:'/perm/addEditPermGroup',
      query:{
        id:row.id,
        roleType:this.roleType,
        name:escape(row.name)
      }
    })
  },
  handleEdit(row){
    console.log(row)
    // return
    let _this = this
    if(row.parent_id!=0){
      _this.$router.push({
        path:'/perm/addEditPermGroup',
        query:{
          roleType:this.roleType,
          id:row.id,
          editName:escape(row.name)
        }
      })
    }else{
      _this.$router.push({
        path:'/perm/addEditPermGroup',
        query:{
          roleType:this.roleType,
          id:row.id,
        }
      })
    }
    
  },
  addPerm(){
    this.$router.push({
      path:'/perm/addEditPermGroup',
      query:{
        roleType:this.roleType
      }
    })
  }
}
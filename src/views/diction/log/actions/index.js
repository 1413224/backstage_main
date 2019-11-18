export default {
  GetRoleType(){
    return new Promise((resolve,reject)=>{
      let _this = this
      _this.$http.post(_this.baseUrl + _this.url.common.GetRoleType,{
        role_type:_this.url.role_type,
        token:_this.$utils.getToken()
      }).then((res)=>{
        if(res.data.ret==200){
          let data = res.data.data
          _this.roleTypeOptions = data.map((item)=>{
            return {
              label:item.name,
              value:Number(item.role_type)
            }
          })
          _this.roleList = data
          _this.roleTypeOptions.unshift({label:'全部适用',value:-1})
          _this.roleTypeOptions.unshift({label:'选择适用场景',value:-2})
          resolve()
        }
      })
    })
  },
  getList(){
    let _this = this
    _this.$http.post(_this.baseUrl + _this.url.LogType.GetAllList,{
      token:_this.$utils.getToken(),
      role_type:_this.searchForm.roleType,
      status:-1
    }).then((res)=>{
      if(res.data.ret==200){
        let data = res.data.data
        _this.tableData = data.list
      }
    })
  },
  addType(){
    let _this = this
    _this.dialogText = '新增'
    _this.rulesForm.cjin = []
    _this.rulesForm.name = ''
    _this.rulesForm.code = ''
    _this.rulesForm.status = '1'
    _this.dialog = true
    _this.isEdit = false
  },
  submitEdit(formName){
    let _this = this,
        url = '',
        params = {};
    _this.$refs[formName].validate((valid)=>{
      if(!valid){
        return false
      }
      params = {
        token:_this.$utils.getToken(),
        role_type:_this.rulesForm.cjin.toString(),
        name:_this.rulesForm.name,
        code:_this.rulesForm.code,
        status:_this.rulesForm.status
      }

      if(_this.logId){
        params.parent_id = _this.logId
      }

      if(!_this.isEdit){
        url = _this.baseUrl + _this.url.LogType.Add
      }else{
        url = _this.baseUrl + _this.url.LogType.EditById
        params.id = _this.logId
      }

      _this.$http.post(url,params).then((res)=>{
        if(res.data.ret == 200){
          if(!_this.isEdit){
            _this.$message({
              type: 'success',
              message: '添加成功!'
            })
          }else{
            _this.$message({
              type: 'success',
              message: '修改成功!'
            })
          }
          _this.logId = ''
          _this.getList()
          _this.dialog = false
        }
      })

    })
  },
  changeStatus(status,id){
    let _this = this
    if(status==0){
      status = 1
    }else{
      status = 0
    }
    _this.$http.post(_this.baseUrl + _this.url.LogType.ChangeStatusByIds,{
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
    _this.$http.post(_this.baseUrl + _this.url.LogType.UpdateDisplayOrder,{
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
    _this.$confirm('此操作将永久删除该信息, 是否继续?','提示',{
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(()=>{
      _this.$http.post(_this.baseUrl + _this.url.LogType.DelByIds,{
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
  delTypepl(){
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
      _this.$http.post(_this.baseUrl + _this.url.LogType.DelByIds,{
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
  handleEdit(row){
    let _this = this
    // console.log(row)
    _this.rulesForm.name = row.name
    _this.rulesForm.code = row.code
    _this.rulesForm.status = row.status

    if(row.role_type_list.length!=0){
      row.role_type_list.map((item,index)=>{
        _this.rulesForm.cjin.push(item.role_type)
      })
    }else{
      _this.rulesForm.cjin = []
    }
    _this.logId = row.id
    _this.isEdit = true
    _this.dialog = true
  },
  handleAdd(row){
    let _this = this
    _this.logId = row.id
    _this.rulesForm.cjin = []
    _this.rulesForm.name = ''
    _this.rulesForm.code = ''
    _this.rulesForm.status = '1'
    _this.dialog = true
  }
}
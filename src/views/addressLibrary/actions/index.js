export default {
  getValidList(id){
    let _this = this
    let params
       params={
        token:_this.$utils.getToken(),
        parent_id:id,
        status:-1
      }

    return new Promise((resolve,reject)=>{
      _this.$http.post(_this.baseUrl + _this.url.control.GetAreaList,params).then((res)=>{
        if(res.data.ret==200){
          // _this.firstData = res.data.data.list
          resolve(res.data.data.list)
        }
      })
    }) 
  },

  getTreeDataList(id){
    let _this = this
    let params
      params={
      token:_this.$utils.getToken(),
      parent_id:id,
      status:-1
    }
    _this.$http.post(_this.baseUrl + _this.url.control.GetAreaList,params).then((res)=>{
      if(res.data.ret==200){
        _this.treeData = res.data.data.list
        // resolve(res.data.data.list)
      }
    })
  },
  
  loadNode(node,resolve){
    let _this = this
    if(node.level == 0){
      _this.getValidList(0).then(function(data){
        resolve(data)
      })
    }else{
      _this.getValidList(node.data.id).then(function(data){
        // console.log(data)
        return resolve(data)
      })
    }
  },

  handleNodeClick(data){
    // console.log(data)
  },

  showAddArea(data,formName){
    event.stopPropagation()
    // console.log(data)
    let _this = this
    // _this.transferDataByAdd = data
    // _this.$refs[formName].resetFields()
    _this.showAddEdit = true
    _this.dialogTitle = '添加子分类'
    _this.dialogForm.parentName = data.name
    _this.dialogForm.parentId = data.id
    _this.dialogVisible = true
  },
  showEditArea(data){
    event.stopPropagation()
    // console.log(data)
    let _this = this
    _this.dialogTitle = '编辑子分类'
    _this.showAddEdit = false
    _this.GetAreaInfoById(data.id).then((dataInfo)=>{
      // console.log(dataInfo)
      if(dataInfo.level==1){
        _this.dialogForm.parentName = '顶级分类'
      }else{
        _this.dialogForm.parentName = dataInfo.parent_info[dataInfo.parent_info.length-1].name
      }
      _this.dialogForm.id = dataInfo.id
      _this.dialogForm.parentId = dataInfo.parent_id
      _this.dialogForm.name = dataInfo.name
      _this.dialogForm.name_en = dataInfo.name_en
      _this.dialogForm.abbreviation = dataInfo.abbreviation
      _this.dialogForm.number = dataInfo.number
      _this.dialogForm.population = dataInfo.population
      _this.dialogForm.thumb = dataInfo.thumb
      _this.dialogForm.status = Number(dataInfo.status)
      _this.dialogVisible = true
    })
  },
  //新增分类
  addAreaSubmit(formName){
    let _this = this
    _this.$refs[formName].validate((valid)=>{
      if(!valid){
        return false
      }
      let params = {
        token:_this.$utils.getToken(),
        parent_id:_this.dialogForm.parentId,
        name:_this.dialogForm.name,
        thumb:_this.dialogForm.thumb,
        number:_this.dialogForm.number,
        abbreviation:_this.dialogForm.abbreviation,
        name_en:_this.dialogForm.name_en,
        population:_this.dialogForm.population,
        status:_this.dialogForm.status
      }
      _this.$http.post(_this.baseUrl + _this.url.control.AddAres,params).then((res)=>{
        if(res.data.ret == 200){
          _this.getTreeDataList(0)//新增后直接刷新
          _this.dialogVisible = false
          // let {id} = res.data.data
          // _this.GetAreaInfoById(id).then(function(value){
          //   _this.getTreeDataList(0)//新增后直接刷新
          //   _this.dialogVisible = false
          // })
        }
      })
    })
  },
  //编辑分类
  editAreaSubmit(formName){
    let _this = this
    _this.$refs[formName].validate((valid)=>{
      if(!valid){
        return false
      }
      let params = {
        token:_this.$utils.getToken(),
        id:_this.dialogForm.id,
        parent_id:_this.dialogForm.parentId,
        name:_this.dialogForm.name,
        thumb:_this.dialogForm.thumb,
        number:_this.dialogForm.number,
        abbreviation:_this.dialogForm.abbreviation,
        name_en:_this.dialogForm.name_en,
        population:_this.dialogForm.population,
        status:_this.dialogForm.status
      }
      _this.$http.post(_this.baseUrl + _this.url.control.EditAreaById,params).then((res)=>{
        if(res.data.ret==200){
          _this.getTreeDataList(0)//编辑后直接刷新
          _this.dialogVisible = false
        }
      })
    })
  },
  GetAreaInfoById(id){
    let _this = this
    return new Promise((resolve,reject)=>{
      _this.$http.post(_this.baseUrl + _this.url.control.GetAreaInfoById,{
        token:_this.$utils.getToken(),
        id:id
      }).then((res)=>{
        if(res.data.ret==200){
          resolve(res.data.data)
        }
      })
    })
  },
  //删除子分类
  remove(node,data){
    event.stopPropagation()
    let _this = this
    _this.$confirm('此操作将永久删除该分类, 是否继续?','提示',{
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(()=>{
      let params = {
        token:_this.$utils.getToken(),
        ids:data.id
      }
      _this.$http.post(_this.baseUrl + _this.url.control.DelAreaByIds,params).then((res)=>{
        if(res.data.ret==200){
          _this.$message({
            type: 'success',
            message: '删除成功!'
          })
          _this.getTreeDataList(0)
        }
      })
    }).catch(()=>{
      _this.$message({
        type:'info',
        message:'已取消删除'
      })
    })
  },
  openConfirm(data,text,value,callback){
    event.stopPropagation()
    let _this = this
    // console.log(data)
    // return
    _this.$confirm(text,'提示',{
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(()=>{
      callback(data,value)
    }).catch(()=>{
      this.$message({
        type: 'info',
        message: '已取消操作'
      });
    })
  },
  changeStatusById(item,value){
    let _this = this
    _this.$http.post(_this.baseUrl + _this.url.control.ChangeStatusByIds,{
      token:_this.$utils.getToken(),
      ids:item.id,
      status:value
    }).then((res)=>{
      if(res.data.ret==200){
        item.status = res.data.data.status
        _this.$message({
          type: 'success',
          message: '操作成功!'
        })
      }
    })
  },
  beforeUpload(){

  },
  deleteImg(){

  },
  onRemove(){

  },
  imgRequest(){

  },
  resetForm(formName) {
    //也要判断是新增还是编辑
    if(this.showAddEdit){
      // alert(9)
      this.dialogTitle = '添加子分类'
    }
    this.$refs[formName].resetFields()
  }
}
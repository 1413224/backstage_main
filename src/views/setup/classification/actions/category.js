export default {
  clickCategory(contentIndex,index,item){
    let _this = this
    if(_this.idxArray[contentIndex].disable){//拖动时不可点击
      return false
    }
    _this.idxArray[contentIndex].idx = index //控制选中样式
    _this.idxArray[contentIndex+1].disable = false //重置下一级的拖动状态
    
    _this.getList(item)
  },
  getList(item){
    let _this = this 
    let params = {
      token:_this.$utils.getToken(),
      type:1,
      status:-1
    }
    if(item){
      params.parent_id = item.id
    }
    _this.$http.get(_this.url.control.GetCommonCategoryList,{
      params
    }).then((res)=>{
      if(res.data.ret==200){
        let data = res.data.data
        if(!item){
          _this.dimenArray.push(data.list)
        }else{
          _this.dimenArray[item.level] = data.list
          _this.$forceUpdate()
          if(Number(_this.dimenArray.length) > (Number(item.level)+1)){//只显示下一级
            _this.dimenArray.pop()
          }
        }
      }
    })
  },
  onEnd(evt,contentIndex){
    let _this = this
    this.idxArray[contentIndex].disable = true
    // console.log(evt)
    if(evt.item.classList.length == 2){
      _this.idxArray[contentIndex].idx = evt.newIndex
    }
    // console.log(_this.dimenArray[contentIndex])
    // console.log(contentIndex)
    // console.log(evt)

  },
  completeSort(contentIndex){
    let _this = this
    // console.log(_this.dimenArray[contentIndex])
    let ids = []
    _this.dimenArray[contentIndex].map((item)=>{
      // console.log(item)
      ids.push(item.id)
    })
    let params = {
      token:_this.$utils.getToken(),
      status:1,
      ids:ids.toString()
    }
    return
    _this.$http.get(_this.url.control.ChangeCommonCategoryStatusByIds,{
      params
    }).then((res)=>{
      if(res.data.ret==200){
        _this.$message({
          type: 'success',
          message:'排序成功'
        })
        _this.idxArray[contentIndex].disable = false
      }
    })
  },
  delCategory(id){
    let _this = this
    _this.$http.get(_this.url.control.DelCommonCategoryByIds,{
      params:{
        token:_this.$utils.getToken(),
        ids:id
      }
    }).then((res)=>{
      if(res.data.ret==200){
        _this.$message('删除成功')
      }
    })
  },
  addCategory(contentIndex){//contentIndex -1 
    let _this = this
    _this.dialogText = '新增分类'
    _this.editId = ''//重置编辑id
    _this.categoryForm.display_order = ''
    _this.categoryForm.type = 1
    _this.categoryForm.status = 1
    _this.categoryForm.name = ''
    _this.categoryForm.code = ''
    _this.categoryForm.thumb = ''
    _this.categoryForm.description = ''
    _this.dialogVisible = true
    this.getParentId(contentIndex)
  },
  getParentId(contentIndex){
    let _this = this
    if(contentIndex<0){
      _this.parentId = 0
    }else{//获取到上一级的ref
      // console.log(_this.$refs['category'+contentIndex])
      let liArr =  _this.$refs['category'+contentIndex][0].children[0].children
      for(let i=0; i<liArr.length;i++){
        if(liArr[i].classList.length>1){
          _this.parentId = liArr[i].dataset.id
          return false
        }
      }
    }
  },
  closeForm(formName){
    let _this = this
    _this.$refs[formName].resetFields()
    _this.dialogVisible = false
  },
  submitForm(formName){
    let _this = this
    this.$refs[formName].validate((valid)=>{
      if(!valid){
        return false
      }
      let params = {
        token:_this.$utils.getToken(),
        display_order:_this.categoryForm.display_order,
        parent_id:_this.parentId,
        type:_this.categoryForm.type,
        name:_this.categoryForm.name,
        thumb:_this.categoryForm.thumb,
        code:_this.categoryForm.code,
        status:_this.categoryForm.status,
        description:_this.categoryForm.description
      }
      let url
      if(_this.editId){
        params.id = _this.editId
        url = _this.url.control.EditCommonCategoryById
      }else{
        url = _this.url.control.AddCommonCategory
      }
      _this.$http.get(url,{
        params
      }).then((res)=>{
        if(res.data.ret==200){
          _this.$message({
            type: 'success',
            message:'添加成功'
          })
          _this.editId = ''
          _this.dialogVisible = false
        }
      })
    })
  },
  editCategory(item,contentIndex){
    let _this = this
    _this.editId = item.id
    // console.log(item.id)
    // console.log(contentIndex)
    _this.dialogText = '编辑分类'
    // console.log(_this.editId)
    _this.categoryForm.display_order = item.display_order
    _this.categoryForm.type = Number(item.type)
    _this.categoryForm.status = Number(item.status)
    _this.categoryForm.name = item.name
    _this.categoryForm.code = item.code
    _this.categoryForm.thumb = item.thumb
    _this.categoryForm.description = item.description
    _this.dialogVisible = true
    this.getParentId(contentIndex)

  },
  delCategory(id){
    let _this = this
    
    _this.$confirm('此操作将删除该分类, 是否继续?','提示',{
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(()=>{
      _this.$http.get(_this.url.control.DelCommonCategoryByIds,{
        params:{
          token:_this.$utils.getToken(),
          ids:id
        }
      }).then((res)=>{
        if(res.data.ret==200){
          _this.$message({
            type: 'success',
            message: '删除成功'
          }) 
        }
      })
    }).catch(()=>{
      _this.$message({
        type: 'info',
        message: '已取消删除'
      })         
    })
  },
  handleAvatarSuccess(){

  },
  beforeAvatarUpload(){

  }
}
import { resolve } from "_uri-js@4.2.2@uri-js"
import { rejects } from "assert"

export default {
  addConfig(){
    let _this = this
    _this.dialogPageText = '新增'
    _this.dialogForm.status = '1'
    _this.dialogForm.name = ''
    _this.dialogForm.accessKey = ''
    _this.dialogForm.secretKey = ''
    _this.dialogForm.spaceBucket = ''
    _this.dialogForm.spaceHost = ''
    _this.configId = null
    _this.dialogPage = true
  },
  GetAttachmentTypeLabels(){
    let _this = this
    return new Promise((resolve,rejects)=>{
      _this.$http.post(_this.baseUrl + _this.url.Attachment.GetSettingLabels,{
        token:_this.$utils.getToken(),
        role_type:_this.url.role_type
      }).then((res)=>{
        if(res.data.ret==200){
          // console.log(res.data.data)
          _this.attachmentTypeLabels = res.data.data.attachment_type
          resolve()
        }
      })
    })
  },
  GetRoleCommonSettingInfo(){
    let _this = this
    return new Promise((resolve,rejects)=>{
      _this.$http.post(_this.baseUrl + _this.url.Attachment.GetInfo,{
        token:_this.$utils.getToken(),
        role_type:_this.url.role_type
      }).then((res)=>{
        if(res.data.ret==200){
          // console.log(res.data.data)
          _this.platformRadio = res.data.data.attachment_type
          resolve()
        }
      })
    })
  },
  changeRoleInfo(){
    let _this = this
    _this.$http.post(_this.baseUrl + _this.url.Attachment.ChangeInfo,{
      token:_this.$utils.getToken(),
      role_type:_this.url.role_type,
      attachment_type:_this.platformRadio
    }).then((res)=>{
      if(res.data.ret==200){
        _this.$message({
          type: 'success',
          message: '保存成功!'
        })
        _this.getList()
      }
    })
  },
  getList(){
    let _this = this
    _this.$http.post(_this.baseUrl + _this.url.Config.GetList,{
      token:_this.$utils.getToken(),
      role_type:_this.url.role_type,
      attachment_type:_this.platformRadio,
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
  submitForm(formName){
    let _this = this,
        url = '',
        params = {};
    _this.$refs[formName].validate((valid)=>{
      if(!valid){
        return false
      }
      params = {
        token:_this.$utils.getToken(),
        role_type:_this.url.role_type,
        attachment_type:_this.platformRadio,
        status:_this.dialogForm.status,
        name:_this.dialogForm.name,
        access_key:_this.dialogForm.accessKey,
        secret_key:_this.dialogForm.secretKey,
        space_bucket:_this.dialogForm.spaceBucket,
        space_host:_this.dialogForm.spaceHost
      }

      if(_this.dialogPageText == '新增'){
        url = _this.baseUrl + _this.url.Config.Add
      }else{
        url = _this.baseUrl + _this.url.Config.ChangeInfoById
        params.id = _this.configId
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
  editManage(id,row){
    // console.log(row)
    let _this = this
    _this.configId = id
    _this.dialogPageText = '编辑'
    _this.dialogForm.name = row.name
    _this.dialogForm.status = row.status
    _this.dialogForm.accessKey = row.access_key
    _this.dialogForm.secretKey = row.secret_key
    _this.dialogForm.spaceBucket = row.space_bucket
    _this.dialogForm.spaceHost = row.space_host
    _this.dialogPage = true
  },
  delManage(id){
    let _this = this
    _this.$confirm('此操作将永久删除该信息, 是否继续?','提示',{
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(()=>{
      _this.$http.post(_this.baseUrl + _this.url.Config.DelInfoById,{
        token:_this.$utils.getToken(),
        role_type:_this.url.role_type,
        id:id
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
  changeStatus(status,id){
    let _this = this
    if(status==0){
      status = 1
    }else{
      status = 0
    }
    _this.$http.post(_this.baseUrl + _this.url.Config.ChangeStatusById,{
      token:_this.$utils.getToken(),
      role_type:_this.url.role_type,
      id:id,
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
  handleSize(sizeVal){
    this.pageSize = sizeVal
    this.curPage = 1
    this.getList()
  },
  handleCurrent(currentVal){
    this.curPage = currentVal
    this.getList()
  },
  closeDialogPage(done){
    this.$refs['dialogForm'].resetFields()
    // this.showEdit = false
    done()
  }
}
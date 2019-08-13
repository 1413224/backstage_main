export default{
  resetForm(formName){
    this.$refs[formName].resetFields()
  },
  searchSubmit(formName){
    let _this = this
    _this.$refs[formName].validate((valid)=>{
      if(!valid){
        return false
      }
      //业务逻辑操作
      alert(9)
    })
  }
}
export default {
  addEditSubmit(formName){
    let _this = this
    _this.$refs[formName].validate((valid)=>{
      if(!valid){
        return false
      }
    })
  }
}
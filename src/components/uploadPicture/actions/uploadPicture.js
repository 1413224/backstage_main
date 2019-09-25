export default {
  changeTab(e,item, index) {
    let _this = this
    _this.ptGroupIdx = index
    console.log(e)
  },
  addGroup(){
    let _this = this
  },
  settingGroup(item,index){
    // console.log(item)
    let _this = this
    _this.ptGroupIdx = index
    item.editShow = item.editShow ? false : true
    
  },
  editBtn(item,index){
    let _this = this
    item.submitShow = true
  },
  cancelBtn(item,index){
    let _this = this
    item.editShow = false
    item.submitShow = false
  }
}
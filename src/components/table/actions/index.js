export default {
  handleCheckItemChange(checked,item){
    let _this = this
    if(checked==true){
      _this.checkedList.push(item)
      if(_this.checkedList.length == _this.list.length){
        _this.checkAll = true
        _this.isIndeterminate = false
      }else{
        _this.checkAll = false
        _this.isIndeterminate = true
      }
    }else{
      _this.checkAll = false
      _this.isIndeterminate = true
    }
      console.log(_this.getIds())
    
  },
  handleCheckAllChange(val){
    let _this = this
    _this.list.map((item,index)=>{
      item.checkModel = val
    })
      // console.log(_this.getIds())
      // console.log(_this.list)

  },
  getIds(){
    let _this = this
    let idsArray=[]
    let ids = ''
    _this.list.map((item)=>{
      if(item.checkModel==true){
        idsArray.push(item.id)
      }
    })
    ids = idsArray.toString()
    return ids
  },
  getCompoment(){
    let _this = this
    // _this.lineConfig[0].column.map((item,index)=>{
    //   console.log(item)
    // })
    _this.list.map((item,index)=>{
      console.log(item)
    })

  },
  onEnd(){
    console.log(this.list)
  }
}
import { _ } from "core-js";

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
      // console.log(_this.getIds())
    _this.$store.commit('setIds',_this.getIds())
    
    
  },
  handleCheckAllChange(val){
    let _this = this
    _this.list.map((item,index)=>{
      item.checkModel = val
    })
    if(val){
      _this.checkAll = true
      _this.isIndeterminate = false
    }else{
      _this.checkAll = false
    }

    _this.$store.commit('setIds',_this.getIds())
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
  onEnd(){
    let _this = this,
        idsArray = [],
        ids = '';
    let configs = _this.configs;

    _this.list.map((item)=>{
      idsArray.push(item.id)
    })
    ids = idsArray.toString()
    if(configs.needPagebean==false && configs.sortApiService){
      _this.$http.post(configs.sortApiService,{
        token:_this.$utils.getToken(),
        ids:ids
      }).then((res)=>{
        if(res.data.ret==200){
          _this.$store.commit('changeList',1)
        }
      })
    }
  }
}
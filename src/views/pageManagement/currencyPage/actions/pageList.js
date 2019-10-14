export default {
  addPage(){
    this.$router.push({
      path:'/pageManagement/currencyPage/addPageList'
    })
  },
  delPage(){

  },
  selectionChange(selection){
    this.selection = selection
  },
}
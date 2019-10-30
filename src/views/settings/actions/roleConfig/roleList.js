export default {
  getList(){
    let _this = this
    _this.$http.post(_this.baseUrl + _this.url.PermGroup.GetList,{
      token:_this.$utils.getToken(),
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
  selectionChange(selection){
    this.selection = selection
  },
}
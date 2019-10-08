export default {
  testPhone(phone){
    if(!(/^1[3456789]\d{9}$/.test(phone))){ 
      // alert("手机号码有误，请重填");  
      return true; 
    } 
  },
  testPassword(value){//8-16位，必须包含字母和数字
    if(!(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/.test(value))){
      return true
    }
  },
  getToken(){
    if(localStorage.getItem('info')){
      let info = JSON.parse(localStorage.getItem("info"))
      return info.token
    }
  },
  getTimestamp(){
    return new Date().getTime()
  },
  computeTime(year,month){
    if(year!=-1 && month!=-1){
      return [
        new Date(year,month - 1).getTime() / 1000,
        new Date(year,month).getTime() / 1000,
      ]
    }else if(year!=-1 && month==-1){
      return [
        new Date(year,0).getTime() / 1000,
        new Date(year,12,0).getTime() / 1000,
      ]
    }
    else if(year==-1){
      return [
        '',''
      ]
    }
    
  },
  getYearList(){
    let thisYear,
        yearList = [];
    thisYear = new Date().getFullYear()
    // console.log(thisYear) 2019
    ++thisYear
    for(let i=10;i>0;i--){
      thisYear --
      yearList.push(thisYear)
    }
    return yearList
  }
}
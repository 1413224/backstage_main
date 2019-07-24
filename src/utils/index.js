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
  }
}
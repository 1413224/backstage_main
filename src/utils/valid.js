import Vue from 'vue'

export function getValid(rules){
  for(let i in rules){
    switch(i){
      case 'keyword':
        rules[i].push({validator:function(rule, value, callback){
          if(Vue.prototype.$utils.testPhone(value)){
            callback(new Error('手机号不正确'))
          }else{
            callback()
          }
        }})
        break
    }

  }
}
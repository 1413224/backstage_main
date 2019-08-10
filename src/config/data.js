export default {
    "head":[
      {
        "type": "radio",
        "name": "用户来源",
        "field": "sourceType",
        "value": [
          {value:0,label:'全部'},
          {value:1,label:'微信'},
          {value:2,label:'支付宝'},
          {value:3,label:'h5'}
        ],
        "defaultValue": 0,
        "width": 8,
        "require": true,
        "message": "请选择用户来源",
        "validate": "" 
      },
      {
        "type": "diyAreaList",
        "name": "所属区域",
        "field": "areaIds",
        "defaultValue": "",
        "width": 8,
        "require": true,
        "message": "请选择用户所属区域",
        "validate": ""
      },
      {
        "type": "select",
        "name": "用户性别",
        "field": "sex",
        "value": [
          {value:'1',label:'黄金糕',},
          {value:2,label:'双皮奶',}
        ],  
        "defaultValue": '1',
        "width": 8,
        "require": true,
        "message": "请选择用户性别",
        "validate": "sex"
      },
      {
        "type": "input",
        "name": "关键字",
        "field": "keyword",
        "placeholder": "请输入用户的姓名/手机号",
        "defaultValue": "",
        "width": 8,
        "require": true,
        "message": "请输入手机号",
        "validate": ""
      },
      {
        "type": "diyDate",
        "name": "用户注册时间",
        "field": "createtime",
        "needMinute":true,
        "defaultValue": "",
        "width": 8,
        "require": true,
        "message": "请选择用户注册时间",
        "validate": ""
      },
      {
        "type": "diyDateTime",
        "name": "用户注册时间",
        "field": "createDatetime",
        "needMinute":true,
        "defaultValue": "",
        "width": 8,
        "require": true,
        "message": "请选择用户注册时间",
        "validate": ""
      }
    ]
}
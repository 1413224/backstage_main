export default {
    "head":[
      {
        "type": "radio",
        "name": "用户来源",
        "field": "sourceType",
        "value": {
          "0": "全部",
          "1": "微信",
          "2": "支付宝",
          "3": "h5"
        },
        "defaultValue": "0",
        "width": 8,
        "require": true,
        "message": "请选择用户来源",
        "validate": "" 
      },
      {
        "type": "diyAreaList",
        "name": "所属区域",
        "field": "areaIds",
        "defaultValue": "0",
        "width": 8,
        "require": true,
        "message": "请选择用户所属区域",
        "validate": ""
      },
      {
        "type": "select",
        "name": "用户性别",
        "field": "sex",
        "value": {
          "0": "全部",
          "1": "男性",
          "2": "女性",
          "3": "保密",
        },
        "defaultValue": "0",
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
      }
    ]
}
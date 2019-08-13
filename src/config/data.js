export default {
    "head":[
      {
        "type": "radio",
        "name": "用户来源",
        "field": "sourceType",
        "options": [
          {value:0,label:'全部'},
          {value:1,label:'微信'},
          {value:2,label:'支付宝'},
          {value:3,label:'h5'}
        ],
        "defaultValue": 0,
        "minWidth":"300",
        "width": 8,
        "require": true,
        "message": "请选择用户来源",
        "validate": "" ,
        // "showStyle":"baisc"
      },
      {
        "type": "text",
        "value": "文本组件",
        "color":"#f00",
        "url":'//www.baidu.com',
        "isBlank":true
      },
      {
        "type":"checkbox",
        "name":"复选框",
        // "showStyle":"button",
        "indeterminate":false,
        "options":[
          {value:1,label:'双皮奶'},
          {value:2,label:'黄金糕'},
          {value:3,label:'黄金糕'},
          {value:4,label:'双皮奶'},
        ],
        "defaultValue":[1,2],
        // "max":3,
        // "min":2
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
        "type": "switch",
        "name": "开关",
        "field": "switch",
        "defaultValue":false,
        "activeText":"选中文字",
        "inactiveText":"左边"
      },
      {
        "type": "inputNumber",
        "name": "计数器",
        "field": "stepqi",
        "defaultValue": 16,
        "min":1,
        "max":20,
        "step":0.01,
        "stepStrictly":true,
        "precision":2
      },
      {
        "type": "select",
        "name": "用户性别",
        "field": "sex",
        "options": [
          {value:'1',label:'黄金糕',},
          {value:2,label:'双皮奶',}
        ],  
        "defaultValue": '1',
        "width": 8,
        "require": true,
        "message": "请选择用户性别",
        "validate": "sex",
        // "clearable":true,
        // "filterable":true

        // "minWidth":"300",

      },
      {
        "type": "input",
        "name": "关键字",
        "field": "keyword",
        "placeholder": "请输入用户的姓名/手机号",
        "defaultValue": "",
        // "width": 8,
        "require": true,
        "message": "请输入手机号",
        "validate": "",
        "minWidth":"300",
        "suffixIcon":"el-icon-search"
        // "maxlength":30
        // "maxRows":5,
        // "minRows":3
        // "clearable":true,
        // "showPassword":true
        // "float":"right"
      },
      {
        "type": "timePicker",
        "name": "时间",
        "placeholder":"提示文字",
        "field": "ctime",
        "defaultValue": '22:20:23',
        "start":"00:15",
        "step":"00:10",
        "end":"20:00",
        "optionsStatus":true
      },
      {
        "type":"timePickerRange",
        "name": "时间",
        "field": "rangtime",
        "endPlaceholder":"结束时间1",
        "startPlaceholde":"起始时间1",
        "defaultValue":["09:15","10:30"],//optionsStatus = 0
        // "defaultValue":["09:15:20","10:30:20"],//optionsStatus = 1
        "optionsStatus":0,
        "startStart":"08:15",
        "startStep":"00:15",
        "startEnd":"10:45",
        "endStart":"08:30",
        "endStep":"00:15",
        "yEndEnd":"11:00"
      },
      // {
      //   "type":"timeFixedPickerRange",
      //   "name": "时间",
      //   "field": "fixedRangtime",
      //   "defaultValue":"",
      // },
      {
        "type": "datePicker",
        "name": "用户注册时间",
        "field": "createtime",
        "placeholder":"请选择日期1",
        "needMinute":true,
        "defaultValue": "",
        "width": 8,
        "require": false,
        "message": "请选择用户注册时间",
        "validate": "",
        "showType":"month",
        "shortcuts":1
      },
      {
        "type": "datePickerRange",
        "name": "注册时间",
        "field": "createrangetime",
        // "minWidth":"500",
        "showType":"year",
        "defaultValue":[],
        "shortcuts":1,
        "startPlaceholder":"请选择",
        "endPlaceholder":"请选择2"
      },
      // {
      //   "type": "diyDateTime",
      //   "name": "用户注册时间",
      //   "field": "createDatetime",
      //   "needMinute":true,
      //   "defaultValue": "",
      //   "width": 8,
      //   "require": true,
      //   "message": "请选择用户注册时间",
      //   "validate": ""

      // }
      {
        "type":"ueditor",
        "name":"备注信息",
        "field":"ueditor",
        "defaultValue":"<div>测试富文本</div>"
      }
    ]
}
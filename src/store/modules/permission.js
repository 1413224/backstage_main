


const state = {
  memuList:[
    {
      name:'概况',
      icon:'clipboard',
      subItems:[],
      path:'/dashboard/index'
    },
    {
      name:'店铺',
      icon:'dashboard',
      subtitle:'店铺管理tit',
      url:'',
      children:[
        {
          id:1,
          type:'item',
          lable:'首页2',
          index:'home',
          path:'/test1'
        },
        {
          id:1,
          type:'submenu',
          lable: '新闻',
          index: 'news',
          children:[
            {
              id: 0,
              type: 'item',
              index: 'addNews',
              lable: '发布新闻',
              path:'/test2',
            },
            {
              id: 1,
              type: 'item',
              index: 'newsList',
              lable: '新闻列表',
              path:'/test3',
            }
          ]
        }
      ]
    },
  ],
}

const mutations = {

}

const actions = {

}

export default {
  state,
  mutations,
  actions
}
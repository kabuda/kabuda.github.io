module.exports = {
    title: 'wuquan的博客',
    base:"/blog/",
    description: '一个学不好吉他的资深前端Jay迷',
    head: [
    ],
    dest: './blog',
    ga: '',
    evergreen: true,
    themeConfig: {
        nav: [
          { text: '首页', link: '/' },
          { text: '博客', link: '/guide/' },
          { text:'归档', link:'/artichve'},
          { text: 'github', link: 'https://github.com/kabuda/kabuda.github.io' },
        ],
        sidebarDepth: 2,
        sidebar: [
          {
          title: 'JavaScript基础知识',
          collapsable: true,
          children: ['/guide/'] 
         }          
        ]
    },
        
  }
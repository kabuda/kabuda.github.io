module.exports = {
  title: 'wuquan的博客',
  base: "/blog/",
  description: '一个资深前端Jay迷',
  head: [
  ],
  dest: './blog',
  ga: '',
  evergreen: true,
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '博客', link: '/guide/' },
      { text: 'github', link: 'https://github.com/kabuda/kabuda.github.io' },
    ],
    sidebar: 'auto',
    sidebarDepth: 2,
    sidebar: {
        '/Vue源码系列/': [
          '双向数据绑定',
          '依赖收集与更新',
          'computed与watch',
          'Vue-router原理'
        ],
  
        '/bar/': [
          '',      /* /bar/ */
          'three', /* /bar/three.html */
          'four'   /* /bar/four.html */
        ]
      }
  },

}
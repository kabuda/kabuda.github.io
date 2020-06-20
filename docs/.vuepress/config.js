module.exports = {
  title: 'wuquan的博客',
  base: "/blog/",
  description: '一个成长中的小前端',
  dest: './blog',
  ga: '',
  evergreen: true,
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '博客', link: '/Vue源码系列/双向数据绑定/' },
      { text: 'github', link: 'https://github.com/kabuda/kabuda.github.io' },
    ],
    sidebar: false
    // sidebarDepth: 2,
    // sidebar: {
    //   '/Vue源码系列/': [
    //     {
    //       title: "Vue源码系列",
    //       collapsable: false,
    //       children: [
    //         { title: "双向数据绑定", path: "/双向数据绑定/" },
    //         { title: "依赖收集", path: "/依赖收集/" }
    //         // { title: "computed与watch", path: "/computed与watch/" },
    //         // { title: "Vue-router原理", path: "/Vue-router原理/" }

    //       ]
    //     }
    //   ]
    // }
  },
  plugins:['autobar']

}
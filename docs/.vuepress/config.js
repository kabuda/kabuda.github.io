module.exports = {
    title: 'wuquan的博客',
    base:"/blog/",
    description: '一个学不好吉他的资深前端Jay迷',
    head: [
        [
        'link', {
            rel: 'icon',
            href: `../docs/public/index.jpg`
        }]
    ],
    dest: './blog',
    ga: '',
    evergreen: true,
    themeConfig: {
        nav: [
          { text: '首页', link: '/' },
          { text: '博客', link: '/guide/' },
          { text: 'github', link: 'https://github.com/kabuda/blog' },
        ],
        sidebarDepth: 2,
        sidebar: [
          {
          title: 'Guide',
          collapsable: false,
          children: ['/guide/']
         }          
        ]
    },
        
  }
#  电商SKU排列组合算法
## 前言
这一篇主要参考了掘金晨曦大佬的文章，按照自己的理解方式写的笔记。这道SKU全排列组合算法题很有代表性，也很接近业务。

## 需求

输入

 ```javascript
let names = ["iPhone X", "iPhone XS"]
let colors = ["黑色", "白色"]
let storages = ["64g", "256g"]
 ```

输出

```javascript
[
  ["iPhone X", "黑色", "64g"],
  ["iPhone X", "黑色", "256g"],
  ["iPhone X", "白色", "64g"],
  ["iPhone X", "白色", "256g"],
  ["iPhone XS", "黑色", "64g"],
  ["iPhone XS", "黑色", "256g"],
  ["iPhone XS", "白色", "64g"],
  ["iPhone XS", "白色", "256g"],
]
```

可以看出需求上，在`names`，`colors`，`storage`各自取一个，要求的是全排列组合。但从扩展的角度上来说，不能单纯做三重循环，因为还有可能有更多属性，不止这三个数组的拼接。



## 核心思路

核心思路就是：若各自给予这三个属性数组一个索引值，称其为**属性索引值**，`names`的索引值是0，`colors`的索引值是1，`storages`的索引值是2。

记录上当前拼接的结果为`prev`，未到达最后一个索引值时持续做拼接。当到达最后一个索引值时，取下这个结果，塞入目标数组中。



算法实现：从`names`属性数组的索引值0开始，对其做递归拼接，实际上可以理解为深度优先算法。依据我们如上的核心思路，则需要的递归函数参数为(属性索引值index，当前拼接的结果`prev`)。为了扩展性着想，使用展开运算符接受这三个属性数组。则有以下的实现函数框架。



```javascript
var combine = function(...args){
 var res = [];    // 目标数组
 var helper = function(index,prev){
     
 }
 helper(0,[]);
}
combine(names,colors,storages);
```



接着只要判断是否到达了最后一个属性索引值，若到达，则直接塞进目标数组。若未到达，持续做拼接。

```javascript
var combine = function (...args) {
    let res = [];
    var helper = function (index, prev) {
        var data = args[index];
        var isLast = index == args.length - 1;
        for (let val of data) {
            let cur = prev.concat(val);     // 此处如果使用prev = prev.concat则会出现到后面拼接成三个元素，四个元素，五个元素的情况
            if (isLast) {
                res.push(cur);
            } else {
                helper(index + 1, cur);
            }
        }
    }
    helper(0, []);
    console.log(res);
}
let names = ["iPhone X", "iPhone XS"], colors = ["黑色", "白色"], storages = ["64g", "256g"];
combine(names, colors, storages);

```


## 类似题目

[leetcode77题组合](https://leetcode-cn.com/problems/combinations/)：

给定两个整数 *n* 和 *k*，返回 1 ... *n* 中所有可能的 *k* 个数的组合

```javascript
输入: n = 4, k = 2
输出:
[
  [2,4],
  [3,4],
  [2,3],
  [1,2],
  [1,3],
  [1,4],
]
```

基本跟上面的`sku算法`是一样的实现思路，但多了一步`剪枝`的优化操作。即当剩余还有rest个位置没补上时，若剩余的元素个数都不足以填上了，那就无须继续下去了，直接跳过到下一个元素。


```javascript
let combine = function (n, k) {
  let ret = []

  let helper = (start, prev) => {
    let len = prev.length
    if (len === k) {
      ret.push(prev)
      return
    }

    // 还有 rest 个位置待填补
    let rest = k - prev.length
    for (let i = start; i <= n; i++) {
      if (n - i + 1 < rest) {    // 剪枝操作
        continue
      }
      helper(i + 1, prev.concat(i))
    }
  }
  
  helper(1, [])
  return ret
}

```

> 链接：[前端电商 sku 的全排列算法很难吗？学会这个套路，彻底掌握排列组合](https://juejin.im/post/5ee6d9026fb9a047e60815f1)


# 理解执行栈与This指向

## 概括
>  哪里调用`this`就指向哪里。`this`指向依赖于调用时的位置和调用方法，而非创建时的位置。

## 全局上下文
默认情况下，全局上下文环境的`this`指向于`window`对象。

```javascript
 var a = 1;
 console.log(this.a);     // 1 
 console.log(this == window);   // true
```

值得注意的是，在`ES6`中`let`关键字声明定义的全局变量，不挂在顶层对象`window`中

```javascript
 let a = 1;
 console.log(this.a);   // undefined
 console.log(this == window);  // true
```

## 函数上下文
在分析函数上下文之前，我们先来了解下调用位置。`JavaScript`引擎在执行代码时按照顺序执行，则全局上下文(global text)应当首先进入调用栈。之后才是函数上下文进栈，当函数被调用时则进行出栈。

举个例子
``` javascript
  function foo(){
    foo2();
  }
  function foo2(){
    foo3();
  }
  function foo3(){
    console.log("i am foo3");
  }
  foo();
```

  如上这段代码，最开始是全局上下文首先入栈，而后`foo`入栈，看到`foo`中还调用`foo2`则继续进栈，同理入栈`foo3`。根据栈后进先出的原则，则`foo3`首先被弹出栈，而后`foo2`、`foo`依次出栈。**该函数上下文所在栈元素的前一个元素，则为调用位置**。而实际上，需要结合调用方式来判定。
  
  ```javascript
  var a  = 1;
  function foo(){
    var a = 2;
    foo2();
  }
  function foo2(){
    var a = 3;  
    console.log(this.a);    // 1
    foo3();
  }
  function foo3(){
    console.log(this.a);  // 1
    console.log("i am foo3");
  }
  foo();
  ```
 此处为函数独立调用，所以`this`实际指向于`window`
 
### 普通函数调用
   在非严格模式下，普通函数的`this`指向于`window`

  ```javascript
    var a = 1;
    function foo(){
     console.log(this.a);
    }
  ```
  
  而在严格模式下，普通函数的`this`是`undefined`
  ```javascript
  'use strict'
   var a  = 1;
   function foo(){
    console.log(this);  // undefined
    console.log(this.a);  // 报错
   }
   foo();
   ```

 嵌套函数调用

```javascript
  var a  = 1;
  function foo(){
   return function(){
    var a = 2;
    console.log(this.a);
   }
  }
  foo()();   // 1
  
  var f = foo(); 
  f();   // 1
```

### 对象中的函数调用
  在一个函数上下文中，`this`由调用者提供，由调用函数的方式来决定。**如果调用者函数，被某一个对象所拥有，那么该函数在调用时，内部的this指向该对象。**

 ```javascript
   var a = 1;
   function getA(){
     return this.a;
   }
   var obj = {
     a:2,
     foo:getA  
   }
   console.log(obj.foo());  // 2
 
 ```
 **如果函数独立调用，那么该函数内部的this，则指向undefined。但是在非严格模式中，当this指向undefined时，它会被自动指向全局对象。**
 
 ```javascript
  var a  = 1;
  function getA(){
   return this.a;
  }
  var obj  = {
    a:2,
    foo:getA
  };
  var f = obj.foo;
  console.log(f());   // 1
 ```
 需要注意的是，这仅是针对函数上下文而言。

 ```javascript
  var a  = 1;
  function getA(){
   return this.a;
  }
  var obj = {
   a:2,
   b:this.a,
   foo:function(){
     return this.a;
   }
  };
  console.log(obj.b);  // 1
  console.log(obj.foo());  // 2
 ```
 
##  call/apply调用
 
  使用`call`/`apply`调用时，`this`作用域指向`call`/`apply`的第一个参数对象。`call`/`apply`本身差别不大，主要差别就是`call`传递的形参是一个一个的，而`apply`是一整个数组传。
  
 ```javascript
  var song = 'hello';
  function sing(){
    console.log(this.song);
  }
  var obj  = {
    song:'let it go'
  };
  sing.call(obj);  // let it go
 ```
 

### 构造函数调用
 `this`指向被创建的对象
 
 ```javascript
  var age = 13;
  function Animal(age){
    this.age = age;
  }  
  var dog = new Animal(12);
  console.log(dog.age);   //12

 ```

### DOM事件处理函数调用
 `this`指向于触发事件的DOM元素 

 ```javascript
 var ele = document.getElementById("id");
 ele.addEventListener("click",function(e){
  console.log(this);
  console.log(this === e.target); // true
 })
 ```

### 箭头函数调用 
  箭头函数调用应当是`this`指向在函数调用里面的特例了，在箭头函数中，会捕获其所在上下文的this值，作为自己的`this`值。简单来说，就是包裹箭头函数的第一个普通函数中的`this`。
  
 ```javascript
  function foo() {  
   setTimeout(()=>{
    console.log(this.a);
   },100)
 }
  var obj = {
  a: 2
 }
  foo.call(obj);   // 2
  ```
  
##  总结
确定This指向时，首先找到函数调用位置及调用方式
1.  由`new`调用：绑定到新创建的对象
2.  由`call`或`apply`、`bind`调用：绑定到指定的对象
3.  由上下文对象调用：绑定到上下文对象
4.  默认：全局对象

> 参考文章：https://github.com/axuebin/articles/issues/6

# babel-demos

```
$ babel -V
6.16.0 (babel-core 6.17.0)

$ babel index.js --out-file a.js

$ babel src --out-dir build
src/index.js -> build/index.js
也可以将命令配置到package.json>scripts里面,如下：
 "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build":"babel src -d build"
  },
-d:是对--out-dir的缩写;
-w:watch 监听意思即原文件有所改动自动执行。可以连写-wd;
运行：
npm run build

由于babel6.0默认是es6语法，所以想用es5语法需要在安装一个预设(预设是一系列plugin的集合)。
安装：
npm install --save-dev babel-preset-es2015

touch .babelrc
配置.babelrc:
{
	"presets":["es2015"]
}
再次编译es6文件后会得到转化es5的语法js文件

实验:
$ npm install react react-dom --save
在src/下新建jsx.js
import React, {Compopent} from 'react';

class DemoCompopent extends Compopent{
    render(){
        return <h1>hello world</h1>
    }
}

npm run build 编译会出现错误
SyntaxError: src/jsx.js: Unexpected token (5:15)
  3 | class DemoCompopent extends Compopent{
  4 |     render(){
> 5 |         return <h1>hello world</h1>
    |                ^
  6 |     }
  7 | }
解决方法：
需要在.babelrc中加入新的配置，否则babel不知道
{
	"presets":["es2015","react"]
}
需要添加react的预设
$ npm install --save-dev babel-preset-react
$ npm run build

plugin:
在babeljs.io/docs/plugins查看

babel-runtime:
为了实现 ECMAScript 规范的细节，Babel 会使用“助手”方法来保持生成代码的整洁。

由于这些助手方法可能会特别长并且会被添加到每一个文件的顶部，因此你可以把它们统一移动到一个单一的“运行时（runtime）”中去。

通过安装 babel-plugin-transform-runtime 和 babel-runtime 来开始。

$ npm install --save-dev babel-plugin-transform-runtime
$ npm install --save babel-runtime
然后更新 .babelrc：

  {
    "plugins": [
	     "transform-runtime"
    ]
  }
现在，Babel 会把这样的代码：

class Foo {
  method() {}
}
编译成：

import _classCallCheck from "babel-runtime/helpers/classCallCheck";
import _createClass from "babel-runtime/helpers/createClass";

let Foo = function () {
  function Foo() {
    _classCallCheck(this, Foo);
  }

  _createClass(Foo, [{
    key: "method",
    value: function method() {}
  }]);

  return Foo;
}();
这样就不需要把 _classCallCheck 和 _createClass 这两个助手方法放进每一个需要的文件里去了。

polyfill:
Babel默认只转换新的JavaScript句法（syntax），而不转换新的API，比如Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise等全局对象，以及一些定义在全局对象上的方法（比如Object.assign）都不会转码。Babel默认不转码的API非常多，详细清单可以查看definitions.js文件。

$ npm install babel-polyfill --save

比方说，我们需要编译以下代码：

function addAll() {
  return Array.from(arguments).reduce((a, b) => a + b);
}
最终会变成这样：

function addAll() {
  return Array.from(arguments).reduce(function(a, b) {
    return a + b;
  });
}
然而，它依然无法随处可用因为不是所有的 JavaScript 环境都支持 Array.from。
Uncaught TypeError: Array.from is not a function

为了解决这个问题，我们使用一种叫做 Polyfill（代码填充，也可译作兼容性补丁） 的技术。 简单地说，polyfill 即是在当前运行环境中用来复制（意指模拟性的复制，而不是拷贝）尚不存在的原生 api 的代码。 能让你提前使用还不可用的 APIs，Array.from 就是一个例子。

babel 用了优秀的 core-js 用作 polyfill，并且还有定制化的 regenerator 来让 generators（生成器）和 async functions（异步函数）正常工作。

要使用 Babel polyfill，首先用 npm 安装它：
$ npm install --save babel-polyfill
然后只需要在文件顶部导入 polyfill 就可以了：

import "babel-polyfill";

babel-preset-stage-x:
JavaScript 还有一些提案，正在积极通过 TC39（ECMAScript 标准背后的技术委员会）的流程成为标准的一部分。

这个流程分为 5（0－4）个阶段。 随着提案得到越多的关注就越有可能被标准采纳，于是他们就继续通过各个阶段，最终在阶段 4 被标准正式采纳。

以下是4 个不同阶段的（打包的）预设：

babel-preset-stage-0
babel-preset-stage-1
babel-preset-stage-2
babel-preset-stage-3
注意 stage-4 预设是不存在的因为它就是上面的 es2015 预设。
以上每种预设都依赖于紧随的后期阶段预设。例如，babel-preset-stage-1 依赖 babel-preset-stage-2，后者又依赖 babel-preset-stage-3。.

Stage 0：

Function Bind Syntax：函数的绑定运算符
String.prototype.at：字符串的静态方法at
Stage 1：

Class and Property Decorators：Class的修饰器
Class Property Declarations：Class的属性声明
Additional export-from Statements：export的写法改进
String.prototype.{trimLeft,trimRight}：字符串删除头尾空格的方法
Stage 2：

Rest/Spread Properties：对象的Rest参数和扩展运算符
Stage 3

SIMD API：“单指令，多数据”命令集
Async Functions：async函数
Object.values/Object.entries：Object的静态方法values()和entries()
String padding：字符串长度补全
Trailing commas in function parameter lists and calls：函数参数的尾逗号
Object.getOwnPropertyDescriptors：Object的静态方法getOwnPropertyDescriptors
Stage 4：

Array.prototype.includes：数组实例的includes方法
Exponentiation Operator：指数运算符
使用的时候只需要安装你想要的阶段就可以了：

$ npm install --save-dev babel-preset-stage-0
然后添加进你的 .babelrc 配置文件。

  {
    "presets": [
      "es2015",
      "react",
+     "stage-0"
    ],
    "plugins": []
  }
```
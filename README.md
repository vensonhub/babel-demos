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

$ npm install --save-dev babel-plugin-transform-runtime
$ npm install --save babel-runtime

```
# wxts-cli

## 说明

* 专为用typescrpit开发微信小程序的同学定制的开发工具,要求小程序基础库2.2.1以上版本.
* 推荐使用vscode 开发而小程序开发工具紧作为调试工具
* 支持2中类型的npm包：
  * 1 专为微信小程序开发的包package.json 中需指定"miniprogram": "miniprogram_dist"，miniprogram_dist 目录下的文件会被打包到运行环境中
  * 2 一般npm包，但是需要将所有js代码打包到 入口js文件。不支持入口文件再依赖加载其他js文件
* 支持promise await async 等几乎所有ts 特性
* 如果出现编译之后 开发者工具文件显示异常，请重启开发者工具。建议开发者工具保持最新

## 使用步骤

```shell
wxts new myproject
cd myproject
npm start
```

* 使用微信开发工具打开 myproject/build目录 即可开始调试。

* 创建一个新项目: `wxts new [options] <dir>`
* 查看使用帮助 : `wxts new -h`
* 编译当前目录的项目 `wxts build [options]`
* 查看使用帮助： `wxts build -h`

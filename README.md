## 配置简单的webpack
1. ### 环境安装
    * 确保全局环境下安装了webpack、webpack-cli
    ~~~ 
    //查看方式
    webpack --version 
    webpack-cli --version
    ~~~
    * 安装全局环境
    ~~~
    npm install webpack webpack-cli -g
    ~~~
2. ### 配置项目环境
    **在文件webpack.config.js**
3. ### 运行webpack打包命令
~~~
webpack 
~~~
4. ### 配置热更新
    * 安装webpack-dev-server 
    * **注意：webpack-dev-server必须也要在全局下安装一下**不然运行命令执行会报  **webpack-dev-server : 无法将“webpack-dev-server”项识别为 cmdlet、函数、脚本文件或可
运行程序的名称。请检查名称的拼写，如果包括路径，请确保路径正确，然后再试一次。 的错误**
    * 启动指令
    ~~~
    //热更新启动时时刷新
    webpack-dev-server
    ~~~
    * 相关设置
    ~~~
   // webpack.config.js
    const Webpack =require("webpack")

    plugin:[
        new Webpack.HotModuleReplacementPlugin() //热更新
    ],
    devServer:{
         hot: true
    }

    //index.js 入口函数js更新
    
    //监听热更新
    if(module.hot){
        module.hot.accept()
    }
    ~~~
    * 注意：css单独抽离出来 不支持热更新


**注意:**npm install 下载安装模块后可能会缺少
~~~
npm install imagemin imagemin-mozjpeg imagemin-pngquant
~~~
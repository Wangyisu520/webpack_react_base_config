const path = require("path")
const glob = require('glob-all')
const HtmlWebpackPlugin = require("html-webpack-plugin") //html文件打包出来
const WebpackDeepScopePlugin = require("webpack-deep-scope-plugin").default //去除多余没有用到的js函数
const MiniCssExtractPlugin = require("mini-css-extract-plugin") //单独抽离css
const PurgecssPlugin = require('purgecss-webpack-plugin') //去除掉css中没有被使用的样式
const Webpack = require("webpack")

const {
    CleanWebpackPlugin
} = require("clean-webpack-plugin") //只存在最新的打包文件

module.exports = {
    entry: {
        index: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "js/[name][hash:5].js",
        // chunkFilename:"[name][hash:5].js"
    },
    //多入口提取公共js配置
    // optimization:{
    //     splitChunks:{
    //         cacheGroups:{
    //             common:{
    //                 name:"common",
    //                 chunks:"all",
    //                 minSize: 1,
    //                 minChunks:2,
    //                 priority:1
    //             },
    //             vendor:{
    //                 name:"vender",
    //                 test:/[\\]node_modules[\\/]/,
    //                 priority:10,
    //                 chunks:'all'
    //             }
    //         }
    //     }
    // },
    //打包环境 开发&生产
    mode: "development",
    module: {
        rules: [{
                test: /\.js$/,
                use: [{
                    loader:"babel-loader",
                }],
                exclude: "/node_modules/"
            }, {
                test: /\.css$/,
                use: [{
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            ident: "postcss",
                            plugins: [
                                //代码块压缩跟兼容处理
                                require("postcss-cssnext")(),
                                // require('autoprefixer')(),
                                require("cssnano")()
                            ]
                        }
                    },
                ]
            }, {
                test: /\.(jpe?g|png|jpeg|gif)$/,
                use: [{
                        loader: 'url-loader',
                        options: {
                            name: "[name][hash:5].[ext]",
                            limit: 10000,
                            outputPath: "img"
                        }
                    },
                    // {
                    //     loader: "img-loader",
                    //     options: {
                    //         plugins: [
                    //             require("imagemin-mozjpeg")({
                    //                 quality: '80'
                    //             }),
                    //             require("imagemin-pngquant")({
                    //                 quality: '80'
                    //             }),
                    //         ]
                    //     }
                    // }
                ]
            },
            {
                test: /\.html$/,
                use: [{
                    loader: "html-loader",
                    options: {
                        attributes: {
                            list: [{
                                tag: 'img',
                                attribute: 'src',
                                type: 'src'
                            }]
                        }
                    }
                }]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            //打包后名字
            filename: 'index.html',
            //以那个为模板
            template: './index.html',
            minify: {
                //清除注释
                removeComments: true,
                //清除空格
                collapseWhitespace: true,
            }
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "css/[name][hash:5].css"
        }),
        new PurgecssPlugin({
            paths: glob.sync([path.join(__dirname, `./*html`), path.join(__dirname, `./src/*js`)])
        }),
        new WebpackDeepScopePlugin(),
        new Webpack.HotModuleReplacementPlugin() //热更新
    ],
    devServer: {
        // port: '8080',
        contentBase: 'dist',
        hot: true,
        //错误提示显示在页面上
        overlay: true,
    }
}
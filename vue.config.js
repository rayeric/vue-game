'use strict'
const path = require('path')

function resolve(dir) {
    return path.join(__dirname, dir)
}

const port = process.env.port || process.env.npm_config_port || 9527 // dev port

// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
    // 部署应用包时的基本 URL
    publicPath: process.env.NODE_ENV === 'production' ? '/vue-game/dist/' : '/',
    // 输出文件目录
    outputDir: 'dist',
    // 静态资源目录
    assetsDir: 'static',
    // 指定生成的 index.html 的输出路径 (相对于 outputDir)
    indexPath: 'index.html',
    // 文件名哈希，默认为true
    filenameHashing: true,
    // 用于多页配置，一个指定了 entry, template, filename, title 和 chunks 的对象 (除了 entry 之外都是可选的)
    // Type: Object, Default: undefind
    // pages: {},
    // 是否在保存的时候使用 `eslint-loader` 进行检查。 有效的值：`ture` | `false` | `"error"`  当设置为 `"error"` 时，检查出的错误会触发编译失败。 
    // Type: boolean | 'error', Default: true
    lintOnSave: process.env.NODE_ENV === 'development',
    // 是否使用包含运行时编译器的 Vue 构建版本。设置为 true 后你就可以在 Vue 组件中使用 template 选项了，但是这会让你的应用额外增加 10kb 左右。 
    // Type: boolean, Default: false
    runtimeCompiler: false,
    // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
    // Type: boolean, Default: true
    productionSourceMap: false,
    // 默认情况下 babel-loader 会忽略所有 node_modules 中的文件。如果你想要通过 Babel 显式转译一个依赖，可以在这个选项中列出来。
    // Type: Array<string | RegExp>, Default: []
    transpileDependencies: [],
    // 设置生成的 HTML 中 <link rel="stylesheet"> 和 <script> 标签的 crossorigin 属性
    // Type: string, Default: undefined
    // crossorigin: undefined,
    devServer: {
        port: port,
        open: true,
        overlay: {
            warnings: false,
            errors: true
        },
        proxy: {
            [process.env.VUE_APP_BASE_API]: {
                target: `http://127.0.0.1:${port}/mock`,
                changeOrigin: true,
                pathRewrite: {
                    ['^' + process.env.VUE_APP_BASE_API]: ''
                }
            }
        }
    },
    configureWebpack: {
        resolve: {
            alias: {
                '@': resolve('src')
            }
        }
    }
}
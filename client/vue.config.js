'use strict'
const path = require('path')
const defaultSettings = require('./src/settings.js')
const CompressionPlugin = require('compression-webpack-plugin')

const { getColorList } = require('theme-color-trans')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const name = defaultSettings.title
const themeColorList = defaultSettings.themeColorList

const port = process.env.port || process.env.npm_config_port || 8080 // dev port

// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
  publicPath: './',
  outputDir: 'standard',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  transpileDependencies: ['flatted', 'theme-color-trans', 'vuex-persist', 'nprogress', 'fuse.js'],
  devServer: {
    compress: true,
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      '/api': {
        target: 'http://10.253.2.93:8000',
        ws: true,
        changeOrigin: true,
        pathRewrite: { // pathRewrite表示路径重写，key表示一个正则，value表示别名
          '^/api': '/' // 即用 '/api'表示'http://localhost:3000/api'
        }
      },
      '/test': {
        target: 'http://127.0.0.1:4124',
        ws: true,
        changeOrigin: true,
        pathRewrite: { // pathRewrite表示路径重写，key表示一个正则，value表示别名
          '^/test': '/' // 即用 '/api'表示'http://localhost:3000/api'
        }
      },
    }
  },
  configureWebpack: {
    name: name,
    devtool: 'source-map',
    plugins: process.env.NODE_ENV === 'production'
      ? [new CompressionPlugin({
        test: /\.js$|\.html$|.\css/, // 匹配文件名
        threshold: 10240, // 对超过10k的数据压缩
        deleteOriginalAssets: false // 不删除源文件
      })] : [],
    resolve: {
      alias: {
        '@': resolve('src'),
        '@assets': resolve('src/assets'),
        '@utils': resolve('src/utils'),
        '@theme': resolve('src/themeLayout')
      }
    }
  },
  chainWebpack(config) {
    // it can improve the speed of the first screen, it is recommended to turn on preload
    // it can improve the speed of the first screen, it is recommended to turn on preload
    config.plugin('preload').tap(() => [
      {
        rel: 'preload',
        // to ignore runtime.js
        // https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/config/app.js#L171
        fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
        include: 'initial'
      }
    ])

    config.plugin('ThemeColorReplacer')
      .use('webpack-theme-color-replacer', [{
        fileName: 'static/css/theme-colors.css',
        matchColors: [...getColorList(themeColorList)]
      }])

    // when there are many pages, it will cause too many meaningless requests
    config.plugins.delete('prefetch')

    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    config
      .when(process.env.NODE_ENV !== 'development',
        config => {
          config
            .plugin('ScriptExtHtmlWebpackPlugin')
            .after('html')
            .use('script-ext-html-webpack-plugin', [{
              // `runtime` must same as runtimeChunk name. default is `runtime`
              inline: /runtime\..*\.js$/
            }])
            .end()
          config
            .optimization.splitChunks({
              chunks: 'all',
              cacheGroups: {
                libs: {
                  name: 'chunk-libs',
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  chunks: 'initial' // only package third parties that are initially dependent
                },
                kingstarUi: {
                  name: 'chunk-kingstarUi', // split kingstarUi into a single package
                  priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                  test: /[\\/]node_modules[\\/]_?kingstar-ui(.*)/ // in order to adapt to cnpm
                },
                commons: {
                  name: 'chunk-commons',
                  test: resolve('src/components'), // can customize your rules
                  minChunks: 3, //  minimum common number
                  priority: 5,
                  reuseExistingChunk: true
                }
              }
            })
          // https:// webpack.js.org/configuration/optimization/#optimizationruntimechunk
          config.optimization.runtimeChunk('single')
        }
      )
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "@/assets/styles/common/variables.scss";'
      }
    }
  }
}


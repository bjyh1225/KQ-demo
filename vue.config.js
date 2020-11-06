const path = require('path');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const productionGzipExtensions = ['js', 'css'];
function resolve(dir){
  return path.join(__dirname,dir);
}
let reactiveConfig =[];
if(process.env.VUE_APP_REACTIVE=="true"){
  reactiveConfig=require("./reactiveRemConfig.js");
}

if(process.env.VUE_APP_SRC=="src/project/portal"){
  require('./createThumbnailConfig.js');
}

module.exports={
  pages:{
    index:{
      entry:process.env.VUE_APP_ENTRY,
      template:process.env.VUE_APP_TEMPLATE||'public/index.html',
      chunks: ['chunk-libs','index','chunk-elementUI','chunk','runtime']
    }
  },
  publicPath:process.env.VUE_APP_PACKAGE?process.env.VUE_APP_PACKAGE:'/',
  transpileDependencies:['element-ui','axios'],
  productionSourceMap:false,
  devServer: {
    port: 8801, // 端口
    proxy:{
      '/api': {
        target: process.env.VUE_APP_BASE_URL?process.env.VUE_APP_BASE_URL:'',
        ws: false,
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/'
        }
      },
      '/fileapi': {
        target: process.env.VUE_APP_FILE_URL?process.env.VUE_APP_FILE_URL:'',
        ws: false,
        changeOrigin: true,
        pathRewrite: {
          '^/fileapi': '/'
        }
      },
      '/filedownloadapi': {
        target: process.env.VUE_APP_FILE_DOWNLOAD_URL?process.env.VUE_APP_FILE_DOWNLOAD_URL:'',
        ws: false,
        changeOrigin: true,
        pathRewrite: {
          '^/filedownloadapi': '/'
        }
      },
      '/serverManager': {
        target: process.env.VUE_APP_SERVERMANAGER_URL?process.env.VUE_APP_SERVERMANAGER_URL:'',
        ws: false,
        changeOrigin: true,
        pathRewrite: {
          '^/serverManager': '/'
        }
      }
    }
  },
  css: {
    sourceMap:false,
    loaderOptions:{
      sass: {
        data: `
          @import "@/style/mixin.scss";
        `
      },
      postcss: {
        plugins:reactiveConfig
      }
    }
  },
  parallel: require('os').cpus().length > 1, 
  chainWebpack:config=>{
    config.plugins.delete('preload')
    config.plugins.delete('prefetch-index')
    config.resolve.alias
      .set('@',resolve('src'))
      .set('entry',resolve(process.env.VUE_APP_SRC))
      .set('components',resolve('src/project/portal/components'))
      .set('pages',resolve('src/project/portal/pages'))
      .set('common',resolve('src/common'))
      .set('img',resolve('src/assets/images'))
      .set('portal',resolve('src/project/portal'))
      .set('app',resolve('src/project/independentModules'))
    if (process.env.VUE_APP_ANALYZE){
      config.plugin('webpack-bundle-analyzer')
      .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin);
    }
    
    config
    .when(process.env.NODE_ENV === 'development',
      config => config.devtool('cheap-source-map')
    )

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
              elementUI: {
                name: 'chunk-elementUI', // split elementUI into a single package
                priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
              },
              // commons: {
              //   name: 'chunk-commons',
              //   test: resolve(process.env.VUE_APP_SRC+'/components'), // can customize your rules
              //   minChunks: 3, //  minimum common number
              //   priority: 5,
              //   reuseExistingChunk: true
              // }
            }
          })
        config.optimization.runtimeChunk('single')
      }
    )
    // config.module
    // .rule('images')
    // .use('url-loader')
    //   .loader('url-loader')
    //   .tap(options => {
    //     options.fallback.options.name='img/[name].[ext]';
    //     return options;
    //   }
    // )
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production'){
      // 生产环境
      config.plugins.push(
        new CompressionWebpackPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
          threshold: 10240,
          minRatio: 0.8
        })
      );
    }
  }
}
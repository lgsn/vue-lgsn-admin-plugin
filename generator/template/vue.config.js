const path = require('path');

const templatePath = 'public/index.html';
const CompressionWebpackPlugin = require('compression-webpack-plugin');

const productionGzipExtensions = ['js', 'css'];
module.exports = {
    productionSourceMap: false,
    lintOnSave: false,
    publicPath: '/h5',
    pages: {
        index: {
            entry: 'src/main.js',
            template: templatePath,
            title: ''
        }
    },
    configureWebpack: {
        resolve: {
            extensions: ['.js', '.vue'],
            alias: {
                '@': path.join(__dirname, 'src'),
                vue$: 'vue/dist/vue.esm.js'
            }
        },
        performance: {
            hints: 'warning', // enum
            maxAssetSize: 10048576, // int (in bytes),
            maxEntrypointSize: 10048576 // int (in bytes)
        },
        plugins: [
            new CompressionWebpackPlugin({
                algorithm: 'gzip',
                test: new RegExp(`\\.(${productionGzipExtensions.join('|')})$`),
                threshold: 10240,
                minRatio: 0.8
            })
        ]
    },
    chainWebpack: (config) => {
        if (process.env.NODE_ENV === 'production') {
            if (process.env.npm_config_report) {
                config
                    .plugin('webpack-bundle-analyzer')
                    .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
                    .end();
                config.plugins.delete('prefetch');
            }
        }
    },
    devServer: {
        proxy: {
            '/api': {
                // target: 'http://tapi.loanunion.in',
                // target: 'http://192.168.6.160:8001', // 家具
                // target: 'http://192.168.6.179:8001', // 关于
                target: 'http://tapi.perfso.mx/', // 关于
                changeOrigin: true
            },
            '/channel': {
                target: 'http://192.168.6.122:8001', // 家具
                // target: 'http://192.168.6.160:8001', // 关于
                changeOrigin: true
            }
        }
    }
};

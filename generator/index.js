/**
 * @Description: 
 * @author Guan LinTao
 * @date 4:34 下午 
*/
const customizeConfig = require('./customizeConfig')

module.exports = (api, options) => {

  if (!options.init) return

  // 配置文件
  customizeConfig()

  // 添加配置文件
  api.extendPackage({
    dependencies: {
      'vue-wechat-title': '^2.0.5',
      "vue-router": "^3.0.1",
      "vue-i18n": "8.21.1",
      "js-md5": "^0.7.3",
      "vant": "^2.10.2",
      "axios": "^0.19.0"
    },
    devDependencies: {
      "node-sass": "^4.9.2",
      "sass": "^1.18.0",
      "sass-loader": "^7.1.0",
      "babel-plugin-import": "^1.12.0",
      "compression-webpack-plugin": "^3.1.0",
      "style-loader": "^0.23.1"
    }
  })

  // 插件安装成功后 输出一些提示 可以忽略
  api.render('./template')
};

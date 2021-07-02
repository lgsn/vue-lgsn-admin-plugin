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
      "ant-design-vue": "^1.7.3",
      "axios": "^0.21.1",
      "core-js": "^3.6.5",
      "crypto-js": "^4.0.0",
      "element-ui": "^2.15.1",
      "js-cookie": "^2.2.1",
      "vue": "^2.6.11",
      "vue-router": "^3.5.1",
      "vuex": "^3.6.2"
    },
    devDependencies: {
      "@vue/cli-plugin-babel": "^4.5.0",
      "@vue/cli-plugin-eslint": "^4.5.0",
      "@vue/cli-service": "^4.5.0",
      "babel-eslint": "7.2.3",
      "crypto-js": "^4.0.0",
      "eslint": "^6.7.2",
      "eslint-plugin-vue": "^6.2.2",
      "sass": "1.32.8",
      "sass-loader": "8.0.0",
      "vue-template-compiler": "^2.6.11"
    }
  })

  // 插件安装成功后 输出一些提示 可以忽略
  api.render('./template')
};

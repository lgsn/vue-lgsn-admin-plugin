/**
 * @Description:
 * @author Guan LinTao
 * @date 4:34 下午
*/
const fs = require('fs')
const path = require('path')
/**
 * 自定义配置文件
 **/
module.exports = function () {
  // 项目路径
  const projectPath = process.cwd()
  // 插件路径
  const pluginPath = __dirname
  // 配置文件
  const configPath = path.normalize(`${pluginPath}/config`)

  const file = fs.readdirSync(configPath)

  file.forEach(v => {
    const url = path.relative(`${projectPath}`, `${configPath}/${v}`)
    fs.copyFile(url, v, function (err) {
      if (err) {
        console.error(`文件写入失败 -> ${v}`)
        console.log(err)
      }
    })
  })

  console.log('🚁 vue-cli-plugin-h5 项目目录初始化完成')
}

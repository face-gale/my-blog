
// 侧边栏生成通用工具类
const utils = {
  /**
   * 多个标题侧边栏
   * @param {侧边栏标题: 类型Array} titles 
   * @param {文件名： 类型Array} children 
   * @param {展开状态: 默认true} collapsable 
   * @param {标题深度: 默认1最大2禁用0} sidebarDepth 
   */
  genSidebar: function (titles, children, collapsable = true, sidebarDepth = 1) {
    const sidebarArray = []
    titles.forEach((el, index) => {
      const option = {
        title: el,
        collapsable: collapsable,
        sidebarDepth: sidebarDepth,
        children: children[index]
      }
      sidebarArray.push(option)
    })
    return sidebarArray
  },
}

// 暴露工具
module.exports = utils
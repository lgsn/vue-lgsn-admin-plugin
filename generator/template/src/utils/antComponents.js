/**
 * @Description:
 * @author Guan LinTao
 * @date 7:38 下午
 * Element-ui 常用组件
 */
import Vue from 'vue'
// 图标
import GIcon from '@/components/GIcon'

import {
  Button,
  Input,
  FormModel,
  Icon,
  message,
  Spin,
  Menu,
  Modal
} from 'ant-design-vue'

Vue.use(Button)
Vue.use(Input)
Vue.use(FormModel)
Vue.use(Icon)
Vue.use(Spin)
Vue.use(Menu)
Vue.use(Input)
Vue.component(GIcon.name, GIcon)
Vue.prototype.$message = message
Vue.prototype.$confirm = Modal.confirm

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
  InputNumber,
  Checkbox,
  Form,
  FormModel,
  Icon,
  message,
  Spin,
  Steps,
  Row,
  Col,
  Menu,
  Table,
  Modal,
  Select
} from 'ant-design-vue'

Vue.use(Button)
Vue.use(Input)
Vue.use(InputNumber)
Vue.use(Checkbox)
Vue.use(Form)
Vue.use(FormModel)
Vue.use(Icon)
Vue.use(Spin)
Vue.use(Steps)
Vue.use(Row)
Vue.use(Col)
Vue.use(Menu)
Vue.use(Table)
Vue.use(Input)
Vue.use(Select)
Vue.component(GIcon.name, GIcon)
Vue.prototype.$message = message
Vue.prototype.$confirm = Modal.confirm


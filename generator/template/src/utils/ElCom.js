/**
 * @Description:
 * @author Guan LinTao
 * @date 7:38 下午
 * Element-ui 常用组件
 */
import Vue from 'vue'
import GIcon from '@/components/GIcon'

import {
  Button,
  Input,
  Icon,
  Message,
  Select,
  Option,
  Loading,
  Form,
  FormItem,
  Link,
  Dialog,
  Switch,
  Table,
  TableColumn,
  MessageBox,
  DatePicker,
  Pagination,
  InputNumber,
  Tag,
  Radio,
  RadioGroup,
  RadioButton
} from 'element-ui'

Vue.use(Select)
Vue.use(Option)
Vue.use(Button)
Vue.use(Input)
Vue.use(Icon)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Link)
Vue.use(Loading)
Vue.use(Dialog)
Vue.use(Switch)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(DatePicker)
Vue.use(Pagination)
Vue.use(InputNumber)
Vue.use(Tag)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(RadioButton)
Vue.component(GIcon.name, GIcon)
Vue.prototype.$ELEMENT = { size: 'small' }
Vue.prototype.$message = Message
Vue.prototype.$messageBox = MessageBox

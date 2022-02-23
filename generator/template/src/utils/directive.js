/**
 * @Description:
 * @author Guan LinTao
 * @date 3:40 下午
 * 指令
 */
import Vue from 'vue'
import store from '@/store'

/**
 * 复制
 */
Vue.directive('copy', {
  bind: function(el, binding, vnode) {
    const copyValue = el.innerText
    el.innerHTML = `
      <div class="g-copy" id="GCopy">
        <span title=${copyValue} class='overflow-text'>${copyValue}</span>
        <svg class="icon" aria-hidden="true">
          <title>单击复制</title>
          <use xlink:href="#icon-fuzhiyemian" />
        </svg>
      </div>
    `
    el.addEventListener('click', function(el) {
      if (el.target.tagName === 'svg') {
        const input = document.createElement('input')
        document.body.appendChild(input)
        input.setAttribute('value', copyValue)
        input.select()
        if (document.execCommand('copy')) {
          document.execCommand('copy')
        }
        Vue.prototype.$message.success('复制成功')
        document.body.removeChild(input)
      }
    })
  },
  unbind: function(el) {
    document.removeEventListener('click', el.__vueClickOutside__)
    delete el.__vueClickOutside__
  }
})

/**
 * 权限按钮
 * <div v-rights='1995'>编辑</>
 */
Vue.directive('rights', {
  inserted: function(el, binding, vnode) {
    const userRights = store.getters.userRights
    if (!userRights.get(binding.value)) {
      el.parentNode.removeChild(el)
    }
  }
})

<!--修改密码-->
<template>
  <Modal
    :visible="value"
    title="修改密码"
    :confirm-loading="confirmLoading"
    ok-text="确认"
    cancel-text="取消"
    destroy-on-close
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <a-form-model ref="editorPwd" class="editor-pwd-form" :label-col="{span: 4}" :wrapper-col="{span: 14}" :model="pwdConfig" :rules="rules">

      <a-form-model-item label="旧密码" prop="oldPwd">

        <a-input
          v-model="pwdConfig.oldPwd"
          size="large"
          class="login-input"
          placeholder="旧密码"
          type="password"
        />

      </a-form-model-item>

      <a-form-model-item label="新密码" prop="newPwd">

        <a-input
          v-model="pwdConfig.newPwd"
          size="large"
          class="login-input"
          placeholder="新密码"
          type="password"
        />

      </a-form-model-item>

      <a-form-model-item label="确认密码" prop="newPwd">

        <a-input
          v-model="pwdConfig.confirmPwd"
          size="large"
          class="login-input"
          placeholder="再次输入新密码"
          type="password"
        />

      </a-form-model-item>

    </a-form-model>

  </Modal>
</template>

<script>
import { Modal } from 'ant-design-vue'
import { updatePwd, logout } from '@/api/public'
export default {
  name: 'EditorPwd',
  components: {
    Modal
  },
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      confirmLoading: false,
      pwdConfig: {
        oldPwd: '',
        newPwd: '',
        confirmPwd: ''
      },
      rules: {
        oldPwd: [
          { required: true, message: '请输入旧密码' }
        ],
        newPwd: [
          { required: true, message: '请输入新密码' }
        ],
        confirmPwd: [
          { required: true, message: '请再次输入新密码' },
          { validator: this.isPwdConsistent, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleOk() {
      this.$refs.editorPwd.validate(valid => {
        if (valid) {
          this.confirmLoading = true
          updatePwd(this.pwdConfig).then(() => {
            this.confirmLoading = false
            this.$message.success('密码修改成功, 请重新登录')
            logout()
          }).catch(() => (this.confirmLoading = false))
        }
      })
    },
    handleCancel() {
      this.$emit('input', false)
    },
    // 校验密码是否一致
    isPwdConsistent(rule, value, callback) {
      if (!value) callback()
      if (value !== this.forgetForm.newPwd) {
        callback('两次输入新密码不一样')
      }
      callback()
    }
  }
}
</script>

<style lang="scss" scoped>
.editor-pwd-form{
  ::v-deep .ant-form-item-required {
    color: var(--titleColor);
    font-weight: 600;
  }
  input{
    font-size: 14px;
  }
}
</style>

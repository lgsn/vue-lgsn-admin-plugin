<!--修改密码-->
<template>
  <Dialog
    title="修改密码"
    width="500px"
    :visible.sync="value"
    append-to-body
    center
    @closed="handleCancel"
  >
    <el-form ref="editorPwd" class="editor-pwd-form" :model="pwdConfig" :rules="rules" label-width="auto" label-suffix=":">

      <el-form-item label="旧密码" prop="oldPwd">

        <el-input
          v-model="pwdConfig.oldPwd"
          class="login-input"
          placeholder="旧密码"
          type="password"
        />

      </el-form-item>

      <el-form-item label="新密码" prop="newPwd">

        <el-input
          v-model="pwdConfig.newPwd"
          class="login-input"
          placeholder="新密码"
          type="password"
        />

      </el-form-item>

      <el-form-item label="确认密码" prop="newPwd">

        <el-input
          v-model="pwdConfig.confirmPwd"
          class="login-input"
          placeholder="再次输入新密码"
          type="password"
        />

      </el-form-item>

    </el-form>

    <span slot="footer">
      <el-button @click="handleCancel">取 消</el-button>
      <el-button type="primary" v-loading="confirmLoading" @click="handleOk">保 存</el-button>
    </span>

  </Dialog>
</template>

<script>
import { Dialog } from 'element-ui'
export default {
  name: 'EditorPwd',
  components: {
    Dialog
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
          this.confirmLoading = false
          this.$message.success('密码修改成功, 请重新登录')
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

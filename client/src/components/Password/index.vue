<!--
 * @Author: xin.chen
 * @Date: 2020-12-01 13:39:51
 * @LastEditors: shengchao.yuan
 * @LastEditTime: 2020-12-25 19:21:18
 * @Description: 修改密码对话框
-->
<template>
  <div class="dialog-code-container">
    <ks-dialog
      title="修改密码"
      :visible.sync="dialogVisible"
      :width="width"
      :before-close="closeDialog"
    >
      <ks-form
        ref="codeForm"
        :model="formValue"
        :label-position="labelPosition"
        :rules="ruleForm"
        label-width="100px"
      >
        <ks-form-item label="用户名" prop="userName">
          <ks-input v-model="formValue.userName" disabled />
        </ks-form-item>
        <ks-form-item label="现用密码" prop="oldCode">
          <ks-input v-model="formValue.oldCode" />
        </ks-form-item>
        <ks-form-item label="新密码" prop="newCode">
          <ks-input v-model="formValue.newCode" />
        </ks-form-item>
        <ks-form-item label="确认新密码" prop="reconfirmCode">
          <ks-input v-model="formValue.reconfirmCode" />
        </ks-form-item>
      </ks-form>
      <span slot="footer" class="dialog-footer">
        <ks-button @click="closeDialog('codeForm')">取 消</ks-button>
        <ks-button
          type="primary"
          @click="modifySure('codeForm')"
        >确 定</ks-button>
      </span>
    </ks-dialog>
  </div>
</template>

<script>
export default {
  props: {
    width: {
      type: String,
      default: '70%'
    },
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    var validateOldCode = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入现用密码'))
      } else {
        callback()
      }
    }
    var validateNewCode = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入新密码'))
      } else {
        callback()
      }
    }
    var validateReCode = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请确认新密码'))
      } else if (value !== this.formValue.newCode) {
        callback(new Error('与新密码不符，请重新输入'))
      } else {
        callback()
      }
    }
    return {
      formValue: {
        userName: '',
        oldCode: '',
        newCode: '',
        reconfirmCode: ''
      },
      ruleForm: {
        oldCode: [{ validator: validateOldCode, trigger: 'blur' }],
        newCode: [{ validator: validateNewCode, trigger: 'blur' }],
        reconfirmCode: [{ validator: validateReCode, trigger: 'blur' }]
      },
      labelPosition: 'right'
    }
  },
  methods: {
    // 关闭对话框
    closeDialog() {
      this.$emit('closeDialog')
    },
    // 确定修改，功能未完善
    modifySure(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$emit('closeDialog')
        } else {
          return false
        }
      })
    }
  }
}
</script>
<style scoped></style>

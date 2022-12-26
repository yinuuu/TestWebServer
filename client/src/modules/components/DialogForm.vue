<!--
 * @Author: sihan.gong
 * @Date: 2021-01-20 15:52:54
 * @LastEditors: xin.chen
 * @LastEditTime: 2022-01-10 09:41:39
 * @Description: 编辑表单
-->
<template>
  <ks-dialog :visible="visible" :append-to-body="true" :title="title" @close="closeDialog">
    <ks-form ref="formData" :rules="validateRules" :model="formData">
      <ks-form-item v-for="item in formItems" :key="item.valueKey" :label="item.label" :prop="item.valueKey">
        <formItem :item-config="item" :form-data="formData" />
      </ks-form-item>
    </ks-form>
    <span slot="footer" class="dialog-footer">
      <ks-button @click="closeDialog">取 消</ks-button>
      <ks-button type="primary" @click="handleClick">确 定</ks-button>
    </span>
  </ks-dialog>
</template>

<script>
import formItem from './formItem'
import request from '@utils/axios/request'
export default {
  components: { formItem },
  props: {
    formItems: {
      required: true,
      type: Array,
      default: () => { return [] }
    },
    validateRules: {
      required: false,
      type: Object,
      default: () => { return {} }
    },
    visible: {
      required: true,
      type: Boolean
    },
    title: {
      required: true,
      type: String,
      default: '新增'
    },
    url: {
      required: true,
      type: Object,
      default: () => { return {} }
    }
  },
  data() {
    return {
      formData: {}
    }
  },
  watch: {
    visible(newVal) {
      newVal && this.initData()
    }
  },
  methods: {
    initData() {
      const formData = {}
      this.formItems.reduce((obj, item) => {
        obj[ item.valueKey] = item.value || ''
        return obj
      }, formData)
      this.formData = JSON.parse(JSON.stringify(formData))
    },
    closeDialog() {
      this.$emit('update:visible', false)
    },
    handleClick() {
      this.$refs.formData.validate((valid) => {
        if (valid) {
          request({
            ...this.url,
            data: JSON.stringify(this.formData)
          })
          this.$emit('update:visible', false)
          this.$emit('handleQuery')
        } else {
          return false
        }
      })
    }

  }
}
</script>

<style lang="scss" scoped>
</style>

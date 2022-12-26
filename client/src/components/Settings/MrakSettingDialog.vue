<!--
 * @Author: yiwen.wu
 * @Date: 2021-10-18 19:09:01
 * @LastEditTime: 2021-11-11 15:31:37
 * @LastEditors: xin.chen
 * @Description: 全局水印配置
 * @FilePath: /ks-vue-template/src/components/Settings/MrakSettingDialog.vue
-->
<template>
  <ks-dialog
    title="全局水印配置"
    :visible.sync="markSettingDialogVisible"
    top="10vh"
    width="50%"
    append-to-body
    :close-on-click-modal="false"
    :before-close="handleClose"
  >
    <div class="config-form__container">
      <div class="form-main">
        <ks-form :model="watermarkConfigClone" label-position="left" label-width="90px">
          <ks-form-item label="宽度">
            <ks-input v-model="watermarkConfigClone.width" class="item-input" />
          </ks-form-item>
          <ks-form-item label="高度">
            <ks-input v-model="watermarkConfigClone.height" class="item-input" />
          </ks-form-item>
          <ks-form-item label="文本位置">
            <ks-radio-group v-model="watermarkConfigClone.textAlign">
              <ks-radio label="left">居左</ks-radio>
              <ks-radio label="right">居右</ks-radio>
            </ks-radio-group>
          </ks-form-item>
          <ks-form-item label="字体大小">
            <ks-input-number v-model="watermarkConfigClone.font" />
          </ks-form-item>
          <ks-form-item label="旋转角度">
            <ks-input-number v-model="watermarkConfigClone.rotate" />
          </ks-form-item>
          <ks-form-item label="动态文本">
            <div class="item-input">
              <ks-select v-model="watermarkConfigClone.dynamicContent" multiple collapse-tags placeholder="请选择">
                <ks-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
              </ks-select>
            </div>
          </ks-form-item>
          <ks-form-item label="静态文本">
            <ks-input v-model="watermarkConfigClone.staticContent" class="item-input" />
          </ks-form-item>
          <ks-form-item label="文字连接符">
            <ks-input v-model="watermarkConfigClone.connectSymbol" class="item-input" />
          </ks-form-item>
          <ks-form-item label="水印层级">
            <ks-input-number v-model="watermarkConfigClone.zIndex" />
          </ks-form-item>
        </ks-form>
      </div>
      <div class="form-preview__container">
        <div class="form-preview-title">
          水印预览
        </div>
        <div class="form-preview__wrapper" :style="{width: `${watermarkConfigClone.width}px`, height: `${watermarkConfigClone.height}px`}">
          <WaterMark :watermark-config="watermarkConfigClone" />
        </div>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <ks-button @click="handleClose">取 消</ks-button>
      <ks-button type="primary" @click="submit">保 存</ks-button>
    </span>
  </ks-dialog>
</template>

<script>
import _ from 'lodash'
import { mapGetters } from 'vuex'

import WaterMark from '@/components/WaterMark'

export default {
  name: 'MrakSettingDialog',
  components: {
    WaterMark
  },
  props: {
    markSettingDialogVisible: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  data() {
    return {
      watermarkConfigClone: {},
      // 动态字段配置，需要自行配置
      options: [{
        label: '用户名',
        value: '管理员'
      }]
    }
  },
  computed: {
    ...mapGetters([
      'watermarkConfig'
    ])
  },
  created() {
    this.watermarkConfigClone = _.cloneDeep(this.watermarkConfig)
  },
  methods: {
    submit() {
      this.$store.dispatch('settings/changeSetting', {
        key: 'watermarkConfig',
        value: this.watermarkConfigClone
      })
      this.$emit('update:markSettingDialogVisible', false)
    },
    handleClose() {
      this.watermarkConfigClone = _.cloneDeep(this.watermarkConfig)
      this.$emit('update:markSettingDialogVisible', false)
    }
  }
}
</script>

<style lang="scss" scoped>
.form-preview__container {
  padding: 15px;
  .form-preview-title {
    text-align: center;
  }
  .form-preview__wrapper {
    position: relative;
    border: solid 1px $--color-000;
    margin: 0 auto;
  }
}

.item-input {
  width: 80%;
}
</style>

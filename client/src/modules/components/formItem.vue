<!--
 * @Author: shasha.qiang
 * @Date: 2021-01-22 14:22:30
 * @LastEditors: shasha.qiang
 * @LastEditTime: 2021-01-28 16:16:44
 * @Description: file content
-->
<template>
  <div>
    <ks-input
      v-if="itemConfig.component==='input'"
      v-model="formData[itemConfig.valueKey]"
      clearable
      :readonly="itemConfig.readonly"
      :required="itemConfig.required"
      :type="itemConfig.type"
      :show-password="itemConfig.showPassword||false"
    />
    <ks-date-picker
      v-else-if="itemConfig.component==='datepicker'"
      v-model="formData[itemConfig.valueKey]"
      clearable
      :readonly="itemConfig.readonly"
      :required="itemConfig.required"
      :type="itemConfig.type||'date'"
      :format="itemConfig.format"
      :value-format="itemConfig.valueFormat"
    />
    <ks-select
      v-else-if="itemConfig.component==='select'"
      v-model="formData[itemConfig.valueKey]"
      clearable
      :readonly="itemConfig.readonly"
      :required="itemConfig.required"
    >
      <ks-option v-for="item in itemConfig.data" :key="item.value" :label="item[itemConfig.displayField]" :value="item[itemConfig.valueField]" />
    </ks-select>
    <ks-dropdown-tree
      v-else
      v-model="formData[itemConfig.valueKey]"
      filterable
      clearable
      collapse-tags
      :multiple="itemConfig.multiple"
      :data="itemConfig.data"
      :readonly="itemConfig.readonly"
      :required="itemConfig.required"
      :label="itemConfig.displayField"
      :node-key="itemConfig.valueField"
    />
  </div>
</template>
<script>
import request from '@utils/axios/request'
export default {
  name: 'FormItem',
  props: {
    itemConfig: {
      required: true,
      type: Object
    },
    formData: {
      required: true,
      type: Object
    }
  },
  created() {
    if (!this.itemConfig.url && this.itemConfig.data) {
      const { url, method, params } = this.this.itemConfig.url
      this.itemConfig.data = request(
        { url,
          method,
          data: JSON.stringify(params)
        }
      )
    }
  }
}
</script>

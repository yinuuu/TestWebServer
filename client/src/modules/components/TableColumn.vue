<!--
 * @Author: shasha.qiang
 * @Date: 2021-01-21 14:44:48
 * @LastEditors: shasha.qiang
 * @LastEditTime: 2021-01-21 17:14:45
 * @Description: file content
-->
<template>
  <ks-table-column :label="columnConfig.label" :width="columnConfig.width" :prop="columnConfig.prop||''">
    <template v-if="columnConfig.columns">
      <table-column v-for="item in columnConfig.columns" :key="item.label" :column-config="item" />
    </template>
  </ks-table-column>
</template>

<script>

export default {
  name: 'TableColumn',
  props: {
    columnConfig: {
      required: true,
      type: Object
    }
  }
}
</script>

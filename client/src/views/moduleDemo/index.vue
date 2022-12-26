<!--
 * @Author: shasha.qiang
 * @Date: 2021-01-21 09:25:32
 * @LastEditors: xin.chen
 * @LastEditTime: 2022-01-06 19:18:49
 * @Description: file content
-->
<template>
  <div class="demo-container">
    <!-- 页面 -->
    <modules :config="configs" @getRecord="getRecord" />
  </div>
</template>

<script>
import configs from './config'
import modules from '@/modules/index'
export default {
  name: 'ModuleDemo',
  components: { modules },
  data() {
    return {
      configs: configs
    }
  },
  computed: {},
  watch: {},
  methods: {
    getRecord(index, row) {
      console.log(index)
      console.log(row)
    }
  },
  selectionChange(index, row) {
    console.log(index)
    console.log(row)
  },
  rowClick(index, row) {
    console.log(index)
    console.log(row)
  },
  rowDblclick(index, row) {
    console.log(index)
    console.log(row)
  }
}
</script>

<style scoped lang="scss">
.demo-container{
    width: 100%;
    height: 100%;

}
</style>

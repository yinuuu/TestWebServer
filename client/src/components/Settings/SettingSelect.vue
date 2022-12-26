<!--
 * @Author: yiwen.wu
 * @Date: 2021-09-26 18:00:41
 * @LastEditTime: 2021-09-28 09:15:21
 * @LastEditors: yiwen.wu
 * @Description: 设置选择比较重复，抽离成一个组件
 * @FilePath: /ks-vue-template/src/components/Settings/SettingSelect.vue
-->

<template>
  <div class="select__items-container">
    <div v-for="item in items" :key="item.value" class="select__item" @click="setValue(item.value)">
      <div class="item-title" :class="{'title--selected': item.value === selectData}">{{ item.label }}</div>
      <div class="item__img">
        <img :src="item.img" alt="img">
        <ks-button v-if="item.value === selectData" class="icon--selected" type="primary" size="small" show-type="circle" icon="ks-icon-status-success3" @click.stop />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SettingSelect',
  model: {
    prop: 'selectData',
    event: 'change'
  },
  props: {
    items: {
      type: Array,
      required: true,
      default() {
        return []
      }
    },
    selectData: {
      type: String,
      default: ''
    }
  },
  methods: {
    setValue(val) {
      this.$emit('change', val)
    }
  }
}
</script>

<style lang="scss" scoped>
.select__items-container {
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  .select__item {
    padding: 0 5px;
    text-align: center;
    position: relative;
  }
  .item-title {
    font-size: $--font-14;
    font-weight: 400;
    margin-bottom: 15px;
    color: $--color-333;
  }
  .title--selected {
    color: $--color-1c65dd;
  }
  .item__img {
    cursor: pointer;
    position: relative;
    width: 100%;
    img {
      width: 100%;
      height: auto;
    }
  }
  .icon--selected {
    position: absolute;
    z-index: 999;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>

<!--
 * @Author: sihan.gong
 * @Date: 2021-01-20 15:53:48
 * @LastEditors: yiwen.wu
 * @LastEditTime: 2021-09-22 15:15:03
 * @Description:
-->
<template>
  <div class="module-query-form">
    <div class="form__header">
      <span class="form__title">搜索条件</span>
      <template v-if="formItems.length > 5">
        <span v-if="isExpand" class="form__status" @click="switchExpand(false)">
          收起<i class="ks-icon-direction-up2" />
        </span>
        <span v-else class="form__status" @click="switchExpand(true)">
          展开<i class="ks-icon-direction-down2" />
        </span>
      </template>
    </div>
    <div class="form-container">
      <ks-form ref="formData" class="form-main" :class="{'is-collapse': !isExpand}" :style="calMaxHeight" inline :rules="validateRules" :model="formData">
        <ks-form-item v-for="item in formItems" :key="item.valueKey" :label="item.label" class="form-item" :prop="item.valueKey">
          <formItem :item-config="item" :form-data="formData" />
        </ks-form-item>
      </ks-form>
      <div class="form-button">
        <ks-button type="primary" @click="handleQuery">查询</ks-button>
      </div>
    </div>
  </div>
</template>

<script>
import formItem from './formItem'
// import validate from '@utils/tools/validate'
export default {
  components: { formItem },
  props: {
    formItems: {
      required: true,
      type: Array
    },
    urls: {
      required: true,
      type: Object
    },
    validateRules: {
      required: false,
      type: Object,
      default: () => { return {} }
    }
  },
  data() {
    return {
      formData: {},
      isExpand: true // 当前搜索条件是否展开，默认展开
    }
  },
  computed: {
    // 计算form最高高度
    calMaxHeight() {
      const maxHeight = (parseInt(this.formItems.length / 5) + 1) * 45 + 'px'
      console.log('cal', maxHeight)
      return {
        maxHeight: maxHeight
      }
    }
  },
  created() {
    this.initData()
  },
  methods: {
    initData() {
      const formData = {}
      this.formItems.reduce((obj, item) => {
        obj[item.valueKey] = item.value || ''
        return obj
      }, formData)
      this.formData = JSON.parse(JSON.stringify(formData))
    },
    switchExpand(val) {
      this.isExpand = val
    },
    chaneValue(key = '', value = '') {
      this.formData[key] = value
    },
    // 查询表格数据
    handleQuery() {
      this.$refs.formData.validate((valid) => {
        if (valid) {
          this.$emit('handleQuery', this.formData)
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.module-query-form {
  width: 100%;
}
.form-item {
  margin-right: 30px;
}
.ks-form-item {
  margin-bottom: 0!important;
}
.form__header {
  padding: 0 0 20px 0;
  .form__title {
    font-weight: bold;
  }
  .form__status {
    float: right;
    user-select: none;
    cursor: pointer;
  }
}

.form-container {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  .form-main {
    flex: 1;
    overflow: hidden;
    -webkit-transition: max-height 0.3s linear;
    transition: max-height 0.3s linear;
  }
  .ks-form-item {
    padding: {
      bottom: 20px;
    };
  }
}

.is-collapse {
  max-height: 45px!important;
}
</style>

<!--
 * @Author: shasha.qiang
 * @Date: 2021-03-04 14:51:18
 * @LastEditors: xin.chen
 * @LastEditTime: 2022-01-05 17:13:26
 * @Description: 编辑模块
-->
<template>
  <div class="dialog-container">
    <ks-dialog :title="title" :visible="show" append-to-body @close="changeVisible(false)">
      <ks-form :model="form" label-width="50px" label-position="left" class="dialog-form">
        <ks-form-item label="模块" class="form-item" prop="component">
          <ks-select v-model="form.component">
            <ks-option
              v-for="item in pages"
              :key="item.component"
              :label="item.title"
              :value="item.component"
            />
          </ks-select>
        </ks-form-item>
        <ks-form-item label="名称" class="form-item" prop="title">
          <ks-input v-model="form.title" />
        </ks-form-item>
        <ks-form-item label="高度" class="form-item" prop="height">
          <ks-input v-model="form.height" />
        </ks-form-item>
        <ks-form-item label="宽度" class="form-item" prop="width">
          <ks-input v-model="form.width" />
        </ks-form-item>
      </ks-form>
      <div class="component-container">
        <component :is="form.component" class="component-item" />
      </div>
      <span slot="footer" class="dialog-footer">
        <ks-button @click="changeVisible(false)">取 消</ks-button>
        <ks-button type="primary" @click="saveConfig">确 认</ks-button>
      </span>
    </ks-dialog>
  </div>
</template>

<script>
import homePages from '@/api/homePages'

import Visitor from './components/Visitor'
import Warning from './components/Warning'
import Timing from './components/Timing'
import Income from './components/Income'
import Spending from './components/Spending'
import Profit from './components/Profit'
import Order from './components/Order'
export default {
  components: { Visitor, Warning, Timing, Income, Spending, Profit, Order },
  props: {
    show: {
      required: true,
      type: Boolean
    },
    title: {
      require: false,
      type: String,
      default: '添加模块'
    },
    activeItem: { require: false,
      type: Object,
      default: () => {
        return {}
      }
    }

  },
  data() {
    return {
      pages: [],
      form: {
        title: '',
        component: '',
        width: 540,
        height: 238
      }
    }
  },
  watch: {
    activeItem(newVal) {
      if (newVal.id) {
        this.form = JSON.parse(JSON.stringify(newVal))
      }
    },
    'form.component': {
      handler(val) {
        try {
          this.pages.forEach((item) => {
            if (item.component == val) {
              this.form.title = item.title
              throw Error()
            }
          })
        } catch (e) {
          // console.log(1)
        }
        // 重置高度和宽度
        // this.form.height = 238
        // this.form.width = 540
      }
    }
  },
  created() {
    this.getcomponentList()
  },
  methods: {
    // 获取可作为首页模板的列表,定义为方法，开发者可从接口或其他地方获取此列表
    getcomponentList() {
      this.pages = homePages
      this.form = {
        ...this.form,
        component: homePages[0].component,
        title: homePages[0].title
      }
    },
    changeVisible(state) {
      this.$emit('update:show', state)
    },
    saveConfig() {
      this.changeVisible(false)
      this.$emit('editPortalList', JSON.parse(JSON.stringify(this.form)))
    }
  }
}
</script>

<style lang="scss" scoped>
.dialog-container {
  .dialog-form {
    display: flex;
    flex-direction: row;
    .form-item {
      width: 30%;
    }
    .form-item:nth-child(3), .form-item:last-child{
      width: 20%;
    }
  }
  .component-container {
    height: 280Px;
    overflow: auto;
    border:1Px solid $--color-efefef;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .component-item{
    width:100%;
    max-height:320px;
    overflow: auto;
  }
}
</style>

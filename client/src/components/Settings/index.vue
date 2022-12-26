<!--
 * @Author: xin.chen
 * @Date: 2020-12-08 13:25:39
 * @LastEditors: xin.chen
 * @LastEditTime: 2022-01-06 15:13:54
 * @Description:
-->
<template>
  <ks-drawer
    title="系统设置"
    :visible.sync="drawer"
    :size="size"
    append-to-body
    class="setting-container"
    @close="close"
  >
    <div class="setting-content">
      <div class="setting-item setting-block">
        <span>版本号</span><span>{{ settings.version }}</span>
      </div>
      <div class="login-style_container setting-block">
        <span class="setting-title">登录风格设置</span>
        <div class="style-select">
          <SettingSelect v-model="loginStyle" :items="loginLayoutItems" />
        </div>
      </div>
      <div class="setting-block">
        <span class="setting-title">整体风格设置</span>
        <div class="style_container">
          <SettingSelect v-model="themeStyle" :items="themeLayoutItems" />
        </div>
      </div>
      <div class="setting-item">
        <span class="setting-title">主体颜色</span>
        <theme-picker />
      </div>
      <!-- <div class="setting-item">
        <span class="setting-title">夜间模式</span>
        <ks-switch v-model="darkModel" />
      </div> -->
      <div class="setting-item setting-block">
        <span class="setting-title">面包屑</span>
        <ks-switch
          v-model="showBreadcrum"
        />
      </div>
      <div class="setting-item">
        <span class="setting-title">全局水印</span>
        <ks-switch
          v-model="showGlobalWatermark"
        />
      </div>
      <div v-if="showGlobalWatermark" class="setting-item">
        <!-- <span class="can-click" @click="markSettingDialogVisible = true">配置水印参数</span> -->
        <span>水印参数</span>
        <ks-button type="primary" @click="markSettingDialogVisible = true">配置</ks-button>
        <MrakSettingDialog v-if="markSettingDialogVisible" :mark-setting-dialog-visible.sync="markSettingDialogVisible" />
      </div>
      <div class="setting-item">
        <span class="setting-title">页面缓存</span>
        <ks-switch
          v-model="showCached"
        />
      </div>
    </div>
  </ks-drawer>
</template>

<script>
import settings from '@/settings'
import SettingSelect from './SettingSelect.vue'
import ThemePicker from '@/components/ThemePicker'
import MrakSettingDialog from './MrakSettingDialog.vue'
// import { ThemeColorTrans } from 'theme-color-trans'
export default {
  components: {
    ThemePicker,
    SettingSelect,
    MrakSettingDialog
  },
  props: {
    size: {
      type: Number,
      default: () => 360
    },
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      settings,
      ifDbStyle: false,
      theme: '',
      drawer: false,
      predefineColors: ['#2B90FF', '#18345C', '#DB1C25', '#0078E2', '#373737'],
      loginLayoutItems: [{
        label: '左侧',
        img: require('@assets/image/view/login_layout_left.png'),
        value: 'left'
      }, {
        label: '居中',
        img: require('@assets/image/view/login_layout_middle.png'),
        value: 'middle'
      }, {
        label: '右侧',
        img: require('@assets/image/view/login_layout_right.png'),
        value: 'right'
      }],
      themeLayoutItems: [{
        label: '标准',
        img: require('@assets/image/view/standard.png'),
        value: 'standard'
      }, {
        label: '简约',
        img: require('@assets/image/view/simple.png'),
        value: 'simple'
      }, {
        label: '圆角',
        img: require('@assets/image/view/fruity.png'),
        value: 'fruity'
      }],
      markSettingDialogVisible: false
    }
  },
  computed: {
    loginStyle: {
      get() {
        return this.$store.state.settings.loginStyle
      },
      set(val) {
        this.$store.dispatch('settings/changeSetting', {
          key: 'loginStyle',
          value: val
        })
      }
    },
    showBreadcrum: {
      get() {
        return this.$store.state.settings.showBreadcrum
      },
      set(val) {
        this.$store.dispatch('settings/changeSetting', {
          key: 'showBreadcrum',
          value: val
        })
      }
    },
    showGlobalWatermark: {
      get() {
        return this.$store.state.settings.watermarkSwitch
      },
      set(val) {
        this.$store.dispatch('settings/changeSetting', {
          key: 'watermarkSwitch',
          value: val
        })
      }
    },
    themeStyle: {
      get() {
        return this.$store.state.settings.themeStyle
      },
      set(val) {
        this.$store.dispatch('settings/changeSetting', {
          key: 'themeStyle',
          value: val
        })
        // 将changethemeStyle 逻辑先迁移到这里，改版完后可能要改store这里的逻辑
        this.$store.dispatch('settings/changeSetting', {
          key: 'style',
          value: true
        })
      }
    },
    darkModel: {
      get() {
        return this.$store.state.settings.darkModel
      },
      set(val) {
        this.$store.dispatch('settings/changeSetting', {
          key: 'darkModel',
          value: val
        })
      }
    },
    showCached: {
      get() {
        return this.$store.state.settings.showCached
      },
      set(val) {
        this.$store.dispatch('settings/changeSetting', {
          key: 'showCached',
          value: val
        })
      }
    }
  },
  watch: {
    show: {
      handler() {
        this.drawer = this.show
      },
      immediate: true
    }
    // #TODO：未开发完成
    // showDark: {
    //   handler(val, oldVal) {
    //     // debugger
    //     const oldColorList = val ? ['#ffffff'] : ['#000000']
    //     const newColotList = val ? ['#000000'] : ['#ffffff']
    //     if (process.env.NODE_ENV === 'development') {
    //       this.$nextTick(() => {
    //         ThemeColorTrans(
    //           oldColorList,
    //           newColotList,
    //           './static/css/theme-colors.css',
    //           process.env.NODE_ENV,
    //           'no-relate'
    //         )
    //       })
    //     } else {
    //       ThemeColorTrans(
    //         oldColorList,
    //         newColotList,
    //         './static/css/theme-colors.css',
    //         process.env.NODE_ENV,
    //         'no-relate'
    //       )
    //     }
    //   },
    //   immediate: true
    // }
  },
  methods: {
    close() {
      this.$emit('update:show', false)
    }
  }
}
</script>
<style scoped lang="scss">
::v-deep .ks-drawer .ks-drawer__header {
  font-size: $--font-18;
  color: $--color-primary;
  font-weight: bold;
  padding: 30px 30px 0 30px;
}
.setting-title {
  color: $--color-333;
  font-size: $--font-18;
  font-weight: bold;
}

.can-click {
  cursor: pointer;
  &:hover {
    color: $--color-primary;
  }
}

.setting-block{
  margin-bottom: 20px;
  border-bottom: 1px solid $--color-f2f2f2;
}

.setting-container {
  .setting-content {
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 0 10px;
    .style-select {
      padding: 20px 0;
    }
    .setting-item {
      display: flex;
      padding:20px 0;
      justify-content: space-between;
      align-items: center;
    }
    .style_container {
      position: relative;
      display: flex;
      padding:20px 0;
      .view_img {
        width: 50%;
        position: relative;
        img{
          width:42px;
          display: block;
          margin: 8px 0 0 15px;
        }
        .icon-theme {
          color: $--color-primary;
          font-weight: 900;
          position: absolute;
          z-index: 100 !important;
          top:25%;
          left:35%;
        }
      }
    }
    .view_container {
      position: relative;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      padding:20px 0;
      .view_img {
        width: 150px;
        position: relative;
        img{
          width:132px;
        }
        .icon-theme {
          color: $--color-primary;
          font-size: 30px;
          font-weight: 900;
          position: absolute;
          z-index: 100 !important;
          top:50%;
          left:50%;
          margin-top:-20px;
        }
      }
    }
  }
}
</style>

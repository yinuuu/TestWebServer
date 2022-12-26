/*
 * @description: 描述说明
 * @author: shengchao.yuan
 * @Date: 2020-12-01 15:25:41
 * @LastEditTime: 2021-11-16 16:32:35
 * @LastEditors: xin.chen
 */

import variables from '@assets/styles/common/variables.scss'
import defaultSettings from '@/settings'

import { ThemeColorTrans } from 'theme-color-trans'

export default {
  data() {
    return {
      theme: variables.theme,
      originTheme: variables.theme
    }
  },
  computed: {
    defaultTheme() {
      return this.$store.state.settings.theme
    },
    colorList() {
      return defaultSettings.themeColorList.map(color => `#${color}`)
    }
  },
  watch: {
    defaultTheme: {
      handler: function(val, oldVal) {
        // 如果没有更新主题 则不需要编译主题
        if (this.defaultTheme != this.originTheme) {
          this.theme = val
        }
      },
      immediate: true
    },
    theme: {
      handler: function(val) {
        if (typeof val !== 'string' || this.originTheme == val) return
        // 更新颜色
        if (process.env.NODE_ENV === 'development') {
          this.$nextTick(() => {
            ThemeColorTrans(
              [this.originTheme, '#cccccc'],
              [val, '#666666'],
              './static/css/theme-colors.css',
              process.env.NODE_ENV
            )
            // 更新默认
            this.originTheme = val
          })
        } else {
          ThemeColorTrans(
            [this.originTheme],
            [val],
            './static/css/theme-colors.css',
            process.env.NODE_ENV
          )
          // 更新默认
          this.originTheme = val
        }
      },
      immediate: true
    }
  }
}

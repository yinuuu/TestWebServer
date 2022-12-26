<!--
 * @Author: shasha.qiang
 * @Date: 2021-01-08 10:57:09
 * @LastEditors: xin.chen
 * @LastEditTime: 2022-01-20 10:01:49
 * @Description: 标题，用户信息，退出登录
-->
<template>
  <div class="usertools_container">
    <div class="head-info" :class="{'is-fruity': isFruity}">
      <div class="head-user info-item">
        <ks-tooltip effect="dark" content="搜索菜单" placement="bottom">
          <header-search id="headerSearch" class="right-menu-item hover-effect" />
        </ks-tooltip>
      </div>
      <div>|</div>
      <div class="head-user info-item">
        <ks-tooltip effect="dark" content="全屏" placement="bottom">
          <screen-full id="screenfull" class="right-menu-item hover-effect" />
        </ks-tooltip>
      </div>
      <div>|</div>
      <div class="head-user info-item">
        <ks-tooltip effect="dark" content="系统设置" placement="bottom">
          <i class="ks-icon-status-setting" @click="handleClick('setting')" />
        </ks-tooltip>
      </div>
      <div>|</div>
      <div class="head-user info-item">
        <ks-tooltip effect="dark" content="系统初始化" placement="bottom">
          <i class="ks-icon-status-reset" @click="handleClick('reset')" />
        </ks-tooltip>
      </div>
      <div>|</div>
      <ks-dropdown
        trigger="click"
        placement="bottom"
        class="info-item head-admin"
        @command="handleClick"
      >
        <i alt="user" class="ks-icon-person-user user-icon" />
        <span class="item-name">
          管理员
        </span>
        <ks-dropdown-menu slot="dropdown">
          <ks-dropdown-item command="code">修改密码</ks-dropdown-item>
        </ks-dropdown-menu>
      </ks-dropdown>
      <div>|</div>
      <div class="head-login info-item" @click="logOut">
        <ks-tooltip
          class="item"
          effect="dark"
          content="退出"
          placement="bottom"
        >
          <i class="ks-icon-status-out" />
        </ks-tooltip>
      </div>
    </div>
    <password
      v-if="isCode"
      :dialog-visible="isCode"
      :width="dialogWith"
      @closeDialog="closeCode"
    />
    <!-- 系统设置 -->
    <settings :show.sync="show" />
  </div>
</template>
<script>
import { hasClass, addClass, removeClass } from '@utils/tools/dom'
import HeaderSearch from '@/components/HeaderSearch'
import ScreenFull from '@/components/ScreenFull'
import Password from '@/components/Password'
import Settings from '@/components/Settings'
import { mapGetters } from 'vuex'
export default {
  name: 'LayoutHead',
  components: { HeaderSearch, ScreenFull, Password, Settings },
  props: {
    styleType: {
      type: String,
      default: 'normal'
    }
  },
  data() {
    return {
      isCode: false,
      show: false,
      dialogWith: '30%'
    }
  },
  computed: {
    ...mapGetters(['sidebar']),
    // 侧边栏伸缩与否
    isCollapse() {
      return !this.sidebar.opened
    },
    themeStyle() {
      return this.$store.state.settings.themeStyle
    },
    isFruity() {
      return this.styleType === 'fruity'
    }
  },
  watch: {
    themeStyle: {
      handler() {
        if (this.$store.state.settings.style) {
          this.handleClick('setting')
        }
        this.$store.dispatch('settings/changeSetting', {
          key: 'style',
          value: false
        })
        this.addClsToBody()
      },
      immediate: true
    }
  },
  mounted() {
    this.$hotkey.bind('ctrl+q,command+q', this.logOut)
    this.$hotkey.bind('f5', this.systemReset)
  },
  beforeDestroy() {
    this.$hotkey.unbind('ctrl+q,command+q', this.logOut)
    this.$hotkey.bind('f5', this.systemReset)
  },
  methods: {
    handleClick(command) {
      // 点击系统设置
      if (command === 'setting') {
        this.show = true
      }
      // 点击修改密码
      if (command === 'code') {
        this.isCode = true
      }
      if (command === 'reset') {
        this.systemReset()
      }
    },
    // 系统初始化
    systemReset() {
      window.localStorage.removeItem('ksp-cli')
      location.reload()
    },
    // 关闭修改密码对话框
    closeCode() {
      this.isCode = false
    },
    // 退出
    logOut() {
      this.$confirm('是否确认退出', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('user/logout')
        this.$router.push(`/login?redirect=${this.$route.fullPath}`)
        this.$message({
          type: 'success',
          message: '成功退出!'
        })
      })
    },
    addClsToBody() {
      const body = document.querySelector('body')
      if (this.themeStyle === 'fruity') {
        !hasClass(body, 'body-fruity') && addClass(body, 'body-fruity')
      } else {
        hasClass(body, 'body-fruity') && removeClass(body, 'body-fruity')
      }
    }
  }
}
</script>
<style lang="scss" src="@assets/styles/layout/usertools.scss" scoped></style>


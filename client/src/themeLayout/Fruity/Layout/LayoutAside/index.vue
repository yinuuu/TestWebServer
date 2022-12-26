<!--
 * @Author: sihan.gong
 * @Date: 2021-01-22 09:32:43
 * @LastEditors: xin.chen
 * @LastEditTime: 2022-01-25 10:57:57
 * @Description: 侧边栏
-->
<template>
  <div class="menu-wrapper" :class="{'is-collapse': isCollapse}">
    <div class="menu-img">
      <svg-icon v-if="isCollapse" icon-class="path" class="path" />
      <svg-icon v-else icon-class="kingstar_logo" class="logo" />
    </div>
    <ks-menu class="menu-list" :default-active="activeMenu" :collapse="isCollapse">
      <menu-item
        v-for="route in permission_routes"
        :key="route.path"
        :menu="route"
        :base-path="route.parent"
      />
    </ks-menu>
  </div>
</template>

<script>
import MenuItem from './MenuItem'
import { mapGetters } from 'vuex'
export default {
  name: 'LayoutAside',
  components: {
    MenuItem
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['sidebar']),
    // 从路由表中过滤菜单项目
    permission_routes() {
      const permission = this.$store.getters.permission_routes || []
      const f = permission.filter((p) => !p.hidden && (p.alwaysShow || typeof p.alwaysShow == 'undefined'))
      permission.forEach((p) => {
        if (p.showFirstChild > 0) {
          p.children[0].parent = p.path
          f.splice(p.showFirstChild - 1, 0, p.children[0])
        }
      })
      return f
    },
    // 侧边栏伸缩与否
    isCollapse() {
      return !this.sidebar.opened
    },
    activeMenu() {
      return this.$route.path
    }
  }
}
</script>

<style lang="scss" scoped>
 ::v-deep .ks-menu--collapse{
  width:120px;
}

@import '@assets/styles/common/mixin.scss';
.menu-wrapper {
  width: 260px;
  height: 100%;
  float: left;
  transition: all 0.3s;
  display:flex;
  flex-flow:column nowrap;
  height: 90%;
  &.is-collapse {
    width: 120px;
    transition-delay: -0.3s;
  }
  .menu-list{
    // height: 80%;
    flex: 1;
    overflow: auto;
    &::-webkit-scrollbar { display: none !important }
  }
  .menu-img {
    height: 90px;
    padding: 0 10px;
    @include flex-center;
    box-sizing: border-box;
    margin-bottom: 20px;
    cursor: pointer;

    .path {
      width: 40px;
      height: 100%;
    }

    .logo {
      width: 180px;
      height: 100%;
      color: $--color-fff;
    }
    .path {
      color: $--color-fff;
    }
  }
  ::v-deep .ks-menu {
    border: none;
    background:transparent;
    transition-delay: -0.3s;
  }
}
</style>

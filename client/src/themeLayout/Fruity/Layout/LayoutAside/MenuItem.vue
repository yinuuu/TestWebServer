<!--
 * @Author: sihan.gong
 * @Date: 2021-01-22 14:50:20
 * @LastEditors: xin.chen
 * @LastEditTime: 2022-01-06 13:33:51
 * @Description: 菜单列表
-->
<template>
  <div>
    <template v-if="menu.children && menu.children.length">
      <ks-submenu
        :key="menu.path"
        :class="['submenu-item']"
        :index="resolvePath(menu.path)"
      >
        <template slot="title">
          <item
            :icon="menu.meta.icon"
            :title="menu.meta.title"
          />
        </template>
        <menu-item
          v-for="child in menu.children"
          :key="child.path"
          :menu="child"
          :base-path="resolvePath(menu.path)"
        />
      </ks-submenu>
    </template>

    <app-link v-else :to="resolvePath(menu.path)">
      <ks-menu-item
        v-if="!menu.meta.hidden"
        :key="menu.path"
        :class="[
          'menu-item',
          { 'submenu--active': getCurrRoute() === resolvePath(menu.path) },
          { 'is-item-collapse': isCollapse}
        ]"
        :style="{color: getCurrRoute() === resolvePath(menu.path) ? themeColor : '#ffffff'}"
        :index="resolvePath(menu.path)"
      >
        <item :icon="menu.meta.icon" :title="menu.meta.title" />
      </ks-menu-item>
    </app-link>
  </div>
</template>

<script>
import path from 'path'
import { mapGetters } from 'vuex'
import Item from './Item'
import AppLink from './Link'

export default {
  name: 'MenuItem',
  components: { Item, AppLink },
  props: {
    // eslint-disable-next-line vue/require-default-prop
    menu: {
      type: Object,
      require: true
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapGetters(['sidebar']),
    themeColor() {
      return this.$store.state.settings.theme || '#595EC6'
    },
    // 侧边栏伸缩与否
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  methods: {
    // 路径解析
    resolvePath(routePath) {
      return path.resolve(this.basePath, routePath)
    },
    getCurrRoute() {
      return this.$route.path
    }
  }
}
</script>

<style lang="scss" scoped>
.submenu-item {
  ::v-deep .ks-submenu__title {
    color: $--color-fff;
    &:hover {
      color: $--color-fff;
    }
  }
}
.menu-item {
  color: $--color-fff ;
  height: 46px;
  line-height: 46px;
  margin-left: 20px;
  border-radius: 30px 0 0 30px;
  &:not(.submenu--active):hover {
    background: rgba($--color-fff, 0.5);
    color:$--color-primary!important;
  }
}
.submenu-item {
  margin-left: 20px;
}

.submenu--active {
  background: $--color-fff;
  &::before{
    content: "";
    width: 30px;
    height: 30px;
    background-size: 100%;
    background-image: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTlweCIgaGVpZ2h0PSIyMHB4IiB2aWV3Qm94PSIwIDAgMTkgMjAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDYzICg5MjQ0NSkgLSBodHRwczovL3NrZXRjaC5jb20gLS0+CiAgICA8dGl0bGU+cjE8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZyBpZD0icjEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxwYXRoIGQ9Ik0xOSwwIEwxOSwyMCBDMTguMTc1MjM1NCw3Ljc4OTQzNDY4IDExLjg0MTkwMjEsMS4xMjI3NjgwMSAwLDAgTDE5LDAgWiIgaWQ9Iui3r+W+hC0xM+Wkh+S7vSIgZmlsbD0iI0ZGRkZGRiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoOS41MDAwMDAsIDEwLjAwMDAwMCkgc2NhbGUoMSwgLTEpIHRyYW5zbGF0ZSgtOS41MDAwMDAsIC0xMC4wMDAwMDApICI+PC9wYXRoPgogICAgPC9nPgo8L3N2Zz4=');
    position: absolute;
    box-sizing: border-box;
    z-index: 1000;
    top: -30px;
    right: -1px;
  }
  &::after{
    content: "";
    width: 30px;
    height: 30px;
    background-size: 100%;
    transform: rotateX(180deg);
    background-image: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTlweCIgaGVpZ2h0PSIyMHB4IiB2aWV3Qm94PSIwIDAgMTkgMjAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDYzICg5MjQ0NSkgLSBodHRwczovL3NrZXRjaC5jb20gLS0+CiAgICA8dGl0bGU+cjE8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZyBpZD0icjEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxwYXRoIGQ9Ik0xOSwwIEwxOSwyMCBDMTguMTc1MjM1NCw3Ljc4OTQzNDY4IDExLjg0MTkwMjEsMS4xMjI3NjgwMSAwLDAgTDE5LDAgWiIgaWQ9Iui3r+W+hC0xM+Wkh+S7vSIgZmlsbD0iI0ZGRkZGRiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoOS41MDAwMDAsIDEwLjAwMDAwMCkgc2NhbGUoMSwgLTEpIHRyYW5zbGF0ZSgtOS41MDAwMDAsIC0xMC4wMDAwMDApICI+PC9wYXRoPgogICAgPC9nPgo8L3N2Zz4=');
    position: absolute;
    box-sizing: border-box;
    top: 45px;
    right: -1px;
    z-index: 1000;

  }
}
</style>

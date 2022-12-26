<!--
 * @Author: yiwen.wu
 * @Date: 2021-09-28 16:55:21
 * @LastEditTime: 2022-01-05 16:49:58
 * @LastEditors: xin.chen
 * @Description: menu菜单栏
 * @FilePath: /ks-vue-template/src/themeLayout/Simple/Layout/LayoutHead/HeadMenu.vue
-->
<template>
  <div ref="headMenuContainer" class="menu-container">
    <!-- 一级菜单 dom 渲染 -->
    <div ref="headMenu" class="menu--first-level">
      <div
        v-for="item in tmpPermissionRoutes"
        :key="item.id"
        :ref="`menu-${item.name}`"
        class="menu-item-container"
        @click="clickMenu($event, item)"
        @mouseenter="setMenu($event, item, 'currentMenu');clearSubMenu()"
        @mouseleave="clearMenu()"
      >
        <div class="menu-item" :class="{'menu-item--active': item === currentMenu}">
          {{ item.meta.title }}
        </div>
      </div>
      <div v-if="showDropDownMenu" class="menu-drop-down" @click="showMoreHeadMenu">
        <i class="ks-icon-direction-down2" />
      </div>
    </div>
    <!-- 子级菜单 dom 渲染 -->
    <!-- 注意，这里必须用 mouseover和mouseover，不能用mouseenter和mouseleave -->
    <div
      v-show="menuGroupShow"
      class="menu-group"
      :style="menuPosition"
      @mouseenter="setMenu($event, currentMenu)"
      @mouseleave="clearMenu('currentSubMenu')"
    >
      <!-- 展示 产生多行菜单时，显示的一级菜单-->
      <div v-if="mainMenuShow" class="main-menu-group">
        <div
          v-for="item in permission_routes"
          :key="item.id"
          :ref="`menu-${item.name}`"
          class="menu-item"
          @mouseenter="setMainMenu($event, item, 'currentMenu')"
          @mouseleave="clearMainMenu"
          @click="clickMainMenu($event, item)"
        >
          <div class="item-title" :class="{'is-active': item === currentMenu && currentMenuLocked}">
            {{ item.meta.title }}
          </div>
        </div>
      </div>
      <div class="sub-menu-group-container">
        <!-- 当选中一级菜单时，显示二级菜单 -->
        <div v-show="currentMenu.children && currentMenu.children.length" class="sub-menu-group" :style="subMenuOrder">
          <div
            v-for="subItem in currentMenu.children"
            :key="subItem.name"
            class="sub-menu-item"
            :class="{'sub-menu-item--active': subItem === currentSubMenu}"
            @click="clickMenu($event, subItem)"
            @mouseenter="setMenu($event, subItem, 'currentSubMenu')"
          >
            <span class="item-title">
              {{ subItem.meta.title }}
            </span>
          </div>
        </div>
        <!-- 当选中二级菜单时，显示三级菜单 -->
        <div
          v-if="currentSubMenu.children && currentSubMenu.children.length"
          class="rest-menu-group"
        >
          <!-- <div v-for="restItem in currentSubMenu.children" :key="restItem.name" class="rest-menu-item">
            <div class="item-title" :class="{'can-switch': restItem.path}" @click="clickMenu($event, restItem)">
              {{ restItem.meta.title }}
            </div>
            <div v-if="restItem.children" class="item-children-container">
              <div v-for="restItemChild in restItem.children" :key="restItemChild.name" class="item-children-title" @click="clickMenu($event, restItemChild)">
                {{ restItemChild.meta.title }}
              </div>
            </div>
          </div> -->
          <!-- 为了实现设计的瀑布流布局，暂时这么写，以后优化 -->
          <div v-for="n in 3" :key="n" class="menu-flex">
            <template v-for="(restItem, index) in currentSubMenu.children">
              <div v-if="index % 3 == (n - 1)" :key="restItem.name" class="rest-menu-item">
                <div class="item-title" :class="{'can-switch': restItem.path}" @click="clickMenu($event, restItem)">
                  {{ restItem.meta.title }}
                </div>
                <div v-if="restItem.children" class="item-children-container">
                  <div v-for="restItemChild in restItem.children" :key="restItemChild.name" class="item-children-title" @click="clickMenu($event, restItemChild)">
                    {{ restItemChild.meta.title }}
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeadMenu',
  data() {
    return {
      showDropDownMenu: false,
      tmpPermissionRoutes: [], //
      screenConfig: {
        screenWidth: '',
        halfScreenWidth: ''
      },
      menuGroupShow: false, // 子集菜单展示
      menuGroupShowTimeout: null, // 子集菜单展示定时器
      mainMenuShow: false, // 产生多行菜单时，显示一级菜单
      currentMenu: '', // 当前选中的一级菜单
      currentMenuLocked: false, // 当前选中的一级菜单是否锁定，在main-menu-group里使用
      currentSubMenu: '' // 当前选中的二级菜单
    }
  },
  computed: {
    // 弹出菜单的位置
    menuPosition() {
      const name = this.currentMenu.name
      // 当mainMenuShow为true时，使用覆盖式的布局
      if (this.mainMenuShow) {
        const dom = this.$refs.headMenuContainer
        const left = dom.getBoundingClientRect().left
        const width = dom.clientWidth
        return { left: `${left}px`, width: `${width}px`, top: '0!important' }
      }
      if (!name) return { left: '0' }
      // 当 menu 的位置位于屏幕中间居左，则计算left，反之计算right
      const offsetLeft = this.$refs[`menu-${name}`][0].getBoundingClientRect().left
      const offsetRight = this.screenConfig.screenWidth - this.$refs[`menu-${name}`][0].getBoundingClientRect().right
      if (offsetLeft <= this.screenConfig.halfScreenWidth) {
        return { left: `calc(${offsetLeft}px - 15px)` }
      }
      return { right: `calc(${offsetRight}px - 70px)` }
    },
    // 二级菜单和子集菜单的位置
    subMenuOrder() {
      const name = this.currentMenu.name
      // 当name不存在，和有主菜单展开的状态下，锁定为左侧
      if (!name) return { order: '-1' }
      if (this.mainMenuShow) return { order: '-1' }
      const offsetLeft = this.$refs[`menu-${name}`][0].getBoundingClientRect().left
      return { order: offsetLeft <= this.screenConfig.halfScreenWidth ? '-1' : '1' }
    },
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
    }
  },
  created() {
    // 计算屏幕宽度
    this.screenConfig.screenWidth = document.body.clientWidth
    this.screenConfig.halfScreenWidth = this.screenConfig.screenWidth / 2
  },
  mounted() {
    this.tmpPermissionRoutes = this.permission_routes
    this.$nextTick().then(() => {
      this.calMenuShow()
    })
  },
  methods: {
    // 计算列表可展示条数
    calMenuShow() {
      // 获取 菜单container 的宽度
      // const menuContainerWidth = this.$refs.headMenuContainer.clientWidth
      const menuContainerWidth = this.screenConfig.halfScreenWidth
      // 获取 菜单的实际宽度
      const menuOffsetWidth = this.$refs.headMenu.clientWidth
      if (menuOffsetWidth <= menuContainerWidth) return
      const menuItems = this.$refs.headMenu.childNodes
      let countIndex = 0 // 计算元素索引
      let totalWidth = 0 // 计算累加宽度综合
      for (const item of menuItems) {
        const itemWidth = item.clientWidth
        if (itemWidth + totalWidth > menuContainerWidth) break
        totalWidth += itemWidth
        countIndex++
      }
      this.tmpPermissionRoutes = this.tmpPermissionRoutes.slice(0, countIndex)
      this.showDropDownMenu = true
    },
    // 点击菜单栏下拉按钮
    showMoreHeadMenu() {
      this.currentMenu = ''
      this.menuGroupShow = true
      this.mainMenuShow = true
    },
    // 菜单点击事件
    clickMenu(e, item) {
      if (item.children && item.children.length) return
      this.switchRoute(item.path)
      this.clearMenu()
    },
    // main-menu-group的菜单点击事件
    clickMainMenu(e, item) {
      if (item.children && item.children.length) {
        this.currentMenuLocked = true
        this.currentMenu = item
        return
      }
      this.switchRoute(item.path)
      this.clearMenu()
    },
    // 菜单hover事件
    setMenu(e, item, currentMenuName) {
      if (this.menuGroupShowTimeout) {
        clearTimeout(this.menuGroupShowTimeout)
        this.menuGroupShowTimeout = null
      }
      if (currentMenuName) {
        this[currentMenuName] = item
      }
      if (item && item.children && item.children.length) {
        this.menuGroupShow = true
      }
    },
    // main-menu-group的菜单hover事件
    setMainMenu(e, item, currentMenuName) {
      if (this.currentMenuLocked) return
      this.setMenu(e, item, currentMenuName)
    },
    // 菜单移出事件
    clearMenu(currentMenuName) {
      this.menuGroupShowTimeout = setTimeout(() => {
        if (currentMenuName) {
          this[currentMenuName] = ''
        }
        // 菜单外部开关和一级菜单开关必须关闭
        this.menuGroupShow = false
        this.mainMenuShow = false
        this.currentMenuLocked = false
      }, 700)
    },
    clearMainMenu() {
      if (this.currentMenuLocked) return
      this.currentMenu = ''
    },
    clearSubMenu() {
      this.currentSubMenu = ''
    },
    // 路由跳转
    switchRoute(path) {
      if (!path) return
      this.$router.push(path)
    }
  }
}
</script>

<style lang="scss" scoped>
.menu-container {
  position: relative;
  height: 100%;
  padding: 0 20px;
}

.menu--first-level {
  float: left;
  white-space: nowrap;
  position: relative;
  .menu-item-container {
    display: inline-block;
    user-select: none;
  }
  .menu-item {
    position: relative;
    min-width: fit-content;
    margin: 0 15px;
    padding: 0 15px;
    line-height: 54px;
    font-size: $--font-16;
    font-weight: bold;
    opacity: 0.8;
  }
  .menu-item--active{
    opacity: 1;
    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 1px;
      border-bottom: solid 3px $--color-fff;
    }
  }
}

.menu-drop-down {
  display: inline-block;
  cursor: pointer;
  font-size: $--font-16;
  font-weight: bold;
  padding: 10px;
}

.menu-group {
  position: fixed;
  z-index: 999;
  top: 54px;
  color: $--color-333;
  background: $--color-fff;
  box-shadow: 0px 2px 4px 0px rgba($--color-000,0.15), 0px 4px 8px 1px rgba($--color-000,0.10);
  display: flex;
  flex-flow: column nowrap;
  .main-menu-group {
    position: relative;
    border-bottom: 2px solid $--color-e8effb;
    max-height: 210px;
    overflow-y: auto;
    .menu-item {
      display: inline-block;
      user-select: none;
      margin: 0 15px;
      height: 54px;
      line-height: 54px;
      font-size: $--font-16;
      font-weight: bold;
      .item-title {
        padding: 0 15px;
      }
      &:hover {
        color: $--color-primary;
      }
    }
    .is-active {
      display: inline-block;
      vertical-align: middle;
      line-height: 40px;
      height: 40px;
      color: $--color-fff;
      background: $--color-primary;
      &:hover {
        color: $--color-fff!important;
      }
    }
  }
  // sub-menu-group 和 rest-menu-group 的flex布局样式
  .sub-menu-group-container {
    display: flex;
    flex: 1;
    width: 100%;
    flex-flow: row nowrap;
    overflow-y: hidden;
    .sub-menu-group {
      width: 10vw;
    }
    .rest-menu-group {
      min-width: 40vw;
      flex: 1;
    }
  }
  .sub-menu-group {
    user-select: none;
    overflow-y: auto;
    .sub-menu-item {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      padding-left: 30px;
      height: 44px;
      line-height: 44px;
      font-size: $--font-18;
      font-weight: 500;
      .item-title {
        padding: 2px;
      }
    }
    .sub-menu-item--active {
      background: rgba($--color-primary, 0.2);
      color: $--color-primary;
    }
  }
  .rest-menu-group {
    border: {
      left: 2px solid $--color-e8effb;
      right: 2px solid $--color-e8effb;
    };
    padding: 40px 30px 40px 30px;
    user-select: none;
    width: 40vw;
    height: 540px;
    overflow-y: auto;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    .menu-flex {
      width: 27%;
      position: relative;
      display: flex;
      flex-flow: column nowrap;
    }
    .rest-menu-item {
      width: 100%;
      margin: 0 auto;
      margin-bottom: 40px;
      .item-title {
        font-size: $--font-16;
        color: $--color-555;
        font-weight: 500;
        line-height: 20px;
        padding-bottom: 10px;
        border-bottom: solid 1px $--color-d9d9d9;
      }
      .can-switch {
        &:hover {
          color: $--color-primary;
        }
      }
      .item-children-container {
        .item-children-title {
          height: 20px;
          line-height: 20px;
          padding: 20px 0;
          color: $--color-666;
          font-size: $--font-14;
          font-weight: 400;
          &:hover {
            color: $--color-primary;
          }
        }
      }
    }
  }
}
</style>

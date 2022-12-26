<!--
 * @Author: xin.chen
 * @Date: 2022-01-18 11:09:53
 * @LastEditors: xin.chen
 * @LastEditTime: 2022-01-18 13:46:41
 * @Description:
-->
<template>
  <div class="main-header">
    <div>
      <i
        :class="[
          'collapse-icon',
          isCollapse
            ? 'ks-icon-direction-navmenuexpansion'
            : 'ks-icon-direction-navmenushrink'
        ]"
        @click="collapseState"
      />
    </div>
    <div>
      <i
        class="dash-icon ks-icon-other-home2"
        :class="{ 'is-active': $route.path === '/dashboard' }"
        @click="goDashboard"
      />
    </div>
    <ks-tabs
      v-model="defaultActive"
      class="header-tabs"
      type="card"
      @tab-click="switchTabs"
      @tab-remove="delTabs"
      @right-click="onRightClick"
    >
      <ks-tab-pane
        v-for="item of othTabs"
        :key="item.path"
        :menu-list="item.meta.affix ? affixMenuList : menuList"
        :label="item.meta.title"
        :closable="!item.meta.affix"
        :name="item.path"
      />
    </ks-tabs>
    <div class="clear-wrap" @click="onRightClick('', { value: '4' })">
      <span class="icon-wrap">
        <svg-icon icon-class="broom" class="broom-icon" />
      </span>
      <div class="text-wrap">
        一键清除
      </div>
    </div>
  </div>
</template>

<script>
import tabMixin from '@/mixins/tabMixin'
export default {
  name: 'NavTab',
  mixins: [tabMixin]
}
</script>
<style scoped lang="scss">
 .main-header {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    padding-bottom: 10px;
    .collapse-icon {
      font-size: $--font-16;
      font-weight: bold;
      margin-right: 20px;
      color: $--color-primary;
    }
    .dash-icon {
      font-size: $--font-16;
      width: 32px;
      height: 32px;
      margin-right: 15px;
      text-align: center;
      line-height: 32px;
      color: $--color-primary;
      background: rgba($--color-primary, 0.22);
      border-radius: 8px;
      transition: background-color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      &:not(.is-active):hover {
        color: $--color-fff;
        background: rgba($--color-primary, 0.75);
      }
      &.is-active {
        color: $--color-fff;
        background: $--color-primary;
      }
    }
    .clear-wrap {
      cursor: pointer;
      overflow: hidden;
      display: flex;
      width: 26px;
      height: 26px;
      line-height: 26px;
      font-size: $--font-14;
      color: $--color-fff;
      border-radius: 50%;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      .text-wrap {
        visibility: hidden;
        height: 26px;
        line-height: 26px;
        width: 0;
      }
      &:hover {
        background: $--color-primary;
        width: 100px;
        border-radius: 50px;
        .text-wrap {
          padding: 0 5px;
          width: auto;
          visibility: visible;
        }
      }
    }
    .icon-wrap {
      width: 26px;
      height: 26px;
      background: mix($--color-primary, $--color-fff, 20%);
      display: inline-flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      z-index: 1000;
      .broom-icon {
        color: $--color-primary;
        width: 20px;
        height: 20px;
      }
    }
    .header-tabs {
      flex: 1;
      width: 0;
      ::v-deep .ks-tabs__header {
        border: 2px;
        border-bottom: none !important;
        margin: 0;
        .ks-tabs__nav {
          border: none;
        }
        .ks-tabs__nav-prev, .ks-tabs__nav-next {
          i {
            font-size: 25px;
          }
        }
        .ks-tabs__nav-next {
          right: 10px;
        }
        .ks-tabs__nav-wrap.is-scrollable {
          padding: 0 50px 0 30px;
        }
        .ks-tabs__item {
          height: 32px;
          line-height: 32px;
          border-radius: $--font-16;
          border: none;
          margin-right: 10px;
          color: $--color-primary;
          background: rgba($--color-primary, 0.22);
          transition: background-color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
          &:not(.is-active):hover {
            color: $--color-fff;
            background: rgba($--color-primary, 0.75);
          }
          &.is-active {
            color: $--color-fff;
            background: $--color-primary;
          }
        }
      }
    }
  }
</style>

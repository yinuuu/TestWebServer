<!--
 * @description: 描述说明
 * @author: shengchao.yuan
 * @Date: 2020-12-01 09:06:37
 * @LastEditTime: 2022-01-10 09:22:21
 * @LastEditors: xin.chen
-->
<template>
  <div class="dashboard-container">
    <div class="title">
      <ks-text class="title-text">工作台</ks-text>
      <div v-if="isEdit" class="edit-tools">
        <ks-button
          type="primary"
          show-type="round"
          icon="ks-icon-status-add3"
          @click="addDialog"
        >添加模块</ks-button>
        <ks-button
          show-type="round"
          icon="ks-icon-status-save2"
          @click="savePortal"
        >保存</ks-button>
        <ks-button
          show-type="round"
          icon="ks-icon-status-delete5"
          @click="changeEdit(false)"
        >取消</ks-button>
      </div>
      <ks-text
        v-else
        class="title-edit"
        @click.native="changeEdit(true)"
      ><i class="ks-icon-status-edit" />编辑</ks-text>
    </div>
    <div
      ref="vdr_container"
      :class="[
        'container',
        isEdit ? 'grid' : ''
      ]"
    >
      <template v-if="isView">
        <vdr
          v-for="(item, index) in portalList"
          :key="item.id"
          :class="[isEditCls, expandIndex === index ? 'is-expand' : '']"
          :w="percentToNum(item.width)"
          :h="item.height"
          :parent="false"
          :x="percentToNum(item.x)"
          :y="item.y"
          :draggable="isEdit"
          :resizable="isEdit"
          :debug="false"
          :min-width="100"
          :min-height="100"
          :grid="[10, 10]"
          :snap="true"
          :snap-tolerance="10"
          @dragging="onDrag"
          @resizing="onResize"
          @dragstop="onDragstop"
          @activated="onActivated(item)"
          @refLineParams="getRefLineParams"
        >
          <div class="portal-container">
            <ks-text class="portal_title">{{ item.title }}</ks-text>
            <component :is="item.component" />
          </div>
          <div class="tools">
            <ks-text>
              <i
                class="ks-icon-status-delete3 tools_icon"
                @click="handleDelete(index)"
              />
            </ks-text>
            <ks-text v-show="isEdit">
              <i class="ks-icon-status-edit tools_icon" @click="handleEdit" />
            </ks-text>
            <ks-text v-show="!isEdit">
              <i
                :class="[
                  expandIndex === index
                    ? 'ks-icon-direction-shrink3'
                    : 'ks-icon-direction-expansion4',
                  'tools_icon'
                ]"
                @click="handleExpand(index)"
              />
            </ks-text>
          </div>
        </vdr>
        <!--辅助线-->
        <span
          v-for="(item, index) in vLine"
          v-show="item.display"
          :key="'vline' + index"
          class="ref-line v-line"
          :style="{
            left: item.position,
            top: item.origin,
            height: item.lineLength
          }"
        />
        <span
          v-for="(item, index) in hLine"
          v-show="item.display"
          :key="'hLine' + index"
          class="ref-line h-line"
          :style="{
            top: item.position,
            left: item.origin,
            width: item.lineLength
          }"
        />
        <!--辅助线END-->
      </template>
    </div>
    <edit-dialog
      :show.sync="visible"
      :title="dialogTitle"
      :active-item="copyObj(activeItem)"
      @editPortalList="editPortalList"
    />
  </div>
</template>

<script>
import vdr from 'vue-draggable-resizable-gorkys'
import 'vue-draggable-resizable-gorkys/dist/VueDraggableResizable.css'
import editDialog from './Dialog'
import Visitor from './components/Visitor'
import Warning from './components/Warning'
import Timing from './components/Timing'
import Income from './components/Income'
import Spending from './components/Spending'
import Profit from './components/Profit'
import Order from './components/Order'
export default {
  name: 'Dashboard',
  components: {
    vdr,
    Visitor,
    editDialog,
    Warning,
    Timing,
    Income,
    Spending,
    Profit,
    Order
  },
  data() {
    return {
      dialogTitle: '',
      isAdd: true, // 标记当前是做模块的添加、修改
      isView: false, // 标记页面是否渲染 完成
      isEditCls: 'notEdit',
      // 标记当前是否是模块编辑状态
      isEdit: false,
      visible: false,
      activeItem: {}, // 标记正在移动的模块
      containerOffsetWidth: 0,
      vLine: [],
      hLine: [],
      expandIndex: null
    }
  },
  computed: {
    portalList() {
      return this.$store.state.homePortals.portalList
    }
  },
  watch: {
    isEdit(newVal) {
      if (newVal) {
        this.isEditCls = ''
      } else {
        this.isEditCls = 'notEdit'
      }
    }
  },
  mounted() {
    const _this = this
    window.addEventListener('resize', function() {
      _this.containerOffsetWidth = _this.$refs['vdr_container']?.offsetWidth
    }, false)
    this.isView = true
    this.containerOffsetWidth = this.$refs['vdr_container']?.offsetWidth
  },
  activated() {
    this.containerOffsetWidth = this.$refs['vdr_container']?.offsetWidth
  },
  methods: {
    onResize: function(x, y, width, height) {
      this.activeItem.width = width
      this.activeItem.height = height
      this.activeItem.x = x
      this.activeItem.y = y
    },
    percentToNum(val) {
      const regExp = /^[0-9]+\.?[0-9]+%$/
      if (regExp.test(val)) {
        const mainWidth = document.querySelector('.app-main').offsetWidth
        const offsetWid = this.containerOffsetWidth || mainWidth
        val = val.replace('%', '')
        return (offsetWid * val) / 100
      } else {
        return val
      }
    },
    onActivated(item) {
      this.activeItem = item
    },
    //  删除
    handleDelete(index) {
      this.portalList.splice(index, 1)
    },
    //  修改
    handleEdit() {
      this.dialogTitle = '修改模块'
      this.visible = true
      this.isAdd = false
    },
    // 做对象的深拷贝
    copyObj(obj) {
      return JSON.parse(JSON.stringify(obj))
    },
    // 辅助线回调事件
    getRefLineParams(params) {
      const { vLine, hLine } = params
      this.vLine = vLine
      this.hLine = hLine
    },
    handleExpand(index) {
      if (this.expandIndex === index) {
        this.expandIndex = null
        return
      }
      this.expandIndex = index
    },
    savePortal() {
      const regExp = /^[0-9]+\.?[0-9]+%$/
      for (let i = 0; i < this.portalList.length; i++) {
        const portal = this.portalList[i]
        if (!regExp.test(portal.width)) {
          portal.width =
            (portal.width / this.$refs.vdr_container.offsetWidth) * 100 + '%'
        }
        if (!regExp.test(portal.x)) {
          portal.x =
            portal.x == 0
              ? 0
              : (portal.x / this.$refs.vdr_container.offsetWidth) * 100 + '%'
        }
      }
      this.$store.dispatch('homePortals/changePortals', this.portalList)
      this.$message.success('保存成功！')
    },
    onDrag(x, y) {
      this.activeItem.x = x
      this.activeItem.y = y
    },
    // 首页添加新的portal
    editPortalList(portalObj) {
      if (this.isAdd) {
        // 计算一个新的高度出来
        let y = 0
        this.portalList.forEach(item => {
          const temp_y = item.y + Number(item.height)
          y = temp_y > y ? temp_y + 10 : y + 10
        })
        portalObj.x = 0
        portalObj.y = y
        portalObj.id = new Date().getTime()
        this.portalList.push(portalObj)
      } else {
        this.activeItem = Object.assign(this.activeItem, portalObj)
      }
    },
    onDragstop(x, y) {
      this.activeItem.x = x > 0 ? x : 0
      this.activeItem.y = y > 0 ? y : 0
    },
    // 修改当前的编辑状态
    changeEdit(state = false) {
      this.isEdit = state
    },
    addDialog() {
      this.dialogTitle = '添加模块'
      this.visible = true
      this.isAdd = true
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  transform: translate3d(0, 0, 0);
  overflow: hidden;
  .title {
    padding: 0 0 10px 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    .title-text {
      font-size:$--font-18;
      font-weight: 600;
      margin-right: 30px;
      padding-top: 5px;
    }
    .title-edit {
      font-size: $--font-14;
      cursor: pointer;
      padding-top: 7px;
      .ks-icon-status-edit {
        margin-right: 10px;
      }
    }
  }
  .container {
    position: relative;
    height: 100%;
    overflow: auto;

    &.overflow-hidden {
      overflow: hidden;
    }
    &.grid {
      background: linear-gradient(
            -90deg,
            rgba($--color-000, 0.1) 1px,
            transparent 1px
          )
          0% 0% / 20px 20px,
        linear-gradient(rgba($--color-000, 0.1) 1px, transparent 1px) 0% 0% / 20px
          20px;
    }
    .tools {
      position: absolute;
      top: 5px;
      right: 5px;
      cursor: pointer;
      .tools_icon {
        padding-right: 10px;
        font-size: $--font-18;
        line-height: 1;
      }
    }
    .active {
      border: 1px dashed $--color-d6d6d6 !important;
      z-index: 99 !important;
      .tools {
        display: block;
      }
      &:hover {
        cursor: move;
      }
    }
    .notEdit {
      transition: all 0.5s ease-in-out;
      &:hover {
        cursor: pointer !important;
      }
    }
    .draggable:hover {
      border: 1px dashed $--color-d6d6d6
    }
    .portal-container {
      display: flex;
      flex-direction: column;
      background: $--color-fff;
      height: inherit;
      .portal_title {
        line-height: 28Px;
        font-size: 16Px;
        font-weight: 600;
      }
    }
    .vdr {
      border: none;
      &.is-expand {
        position: fixed;
        top: 0 !important;
        left: 0 !important;
        width: 100% !important;
        height: 100% !important;
        transform: translate(0, 0) !important;
      }
    }
  }
}
</style>

/*
 * @Author: xin.chen
 * @Date: 2022-01-18 11:21:13
 * @LastEditors: xin.chen
 * @LastEditTime: 2022-01-18 13:40:13
 * @Description:
 */
import path from 'path'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      defaultActive: '',
      affixTags: [],
      permissionTabs: [],
      affixMenuList: [
        {
          label: '关闭左侧',
          value: '5'
        },
        {
          label: '关闭右侧',
          value: '2'
        },
        {
          label: '关闭其他',
          value: '3'
        },
        {
          label: '关闭所有',
          value: '4'
        }
      ],
      menuList: [
        {
          label: '关闭',
          value: '1'
        },
        {
          label: '关闭左侧',
          value: '5'
        },
        {
          label: '关闭右侧',
          value: '2'
        },
        {
          label: '关闭其他',
          value: '3'
        },
        {
          label: '关闭所有',
          value: '4'
        }
      ]
    }
  },
  computed: {
    ...mapGetters({
      sidebar: 'sidebar',
      editableTabs: 'visitedViews',
      routes: 'permission_routes'
    }),
    /**
     * @description 取出用于判断的其他部分
     */
    othTabs() {
      let arr = []
      arr = this.editableTabs.filter((value, index, array) => {
        return value.path !== '/dashboard'
      })
      return arr
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  watch: {
    '$route.path'() {
      this.addTags()
      this.defaultActive = this.$route.path
    }
  },
  mounted() {
    this.initTags()
    this.addTags()
  },
  methods: {
    collapseState() {
      this.$store.dispatch('app/toggleSideBar')
    },
    goDashboard() {
      if (this.$route.path !== '/dashboard') {
        this.$router.push('/dashboard')
      }
    },
    // 初始化tabs，获取固定标签页和当前标签页
    initTags() {
      const affixTags = (this.affixTags = this.filterAffixTabs(this.routes))
      this.defaultActive = this.$route.path
      for (const tag of affixTags) {
        if (tag.name) {
          this.$store.dispatch('tagsView/addView', tag)
        }
      }
    },
    // 添加tabs
    addTags() {
      const { name } = this.$route
      const route = {
        name,
        path: this.$route.path,
        meta: this.$route.meta || {}
      }
      if (name) {
        this.$store.dispatch('tagsView/addView', route)
      }
      return false
    },
    // 保留固定的标签
    filterAffixTabs(routes, basePath = '/') {
      let tags = []
      routes.forEach(route => {
        const tagPath = path.resolve(basePath, route.path)
        if (route.meta && route.meta.affix) {
          tags.push({
            fullPath: tagPath,
            path: tagPath,
            name: route.name,
            meta: { ...route.meta }
          })
        }
        if (route.children) {
          const tempTags = this.filterAffixTabs(route.children, tagPath)
          if (tempTags.length >= 1) {
            tags = [...tags, ...tempTags]
          }
        }
      })
      return tags
    },
    // 点击tabs
    switchTabs(tab) {
      if (this.$route.path !== tab.name) {
        this.$router.push(tab.name)
      }
    },
    // 重定向tabs，关闭自己的时候可以依次显示
    async redirectTabs(delIndex = '') {
      // 如果没有任何tabs的时候 则需要默认到主页面
      const tabsLength = this.editableTabs.length
      if (tabsLength == 0) {
        return this.$router.replace('/')
      }
      // 关闭自己的时候处理
      if (delIndex) {
        const redirectInd =
          delIndex > tabsLength - 1 ? tabsLength - 1 : delIndex
        return this.$router.replace(this.editableTabs[redirectInd].path)
      }
      // 关闭其他，左边，右边和所有
      const activeInd = this.findIndexPath(this.$route.path, this.editableTabs)
      if (activeInd == -1) {
        this.$router.replace(this.editableTabs[tabsLength - 1].path)
      }
    },
    // 获取到当前选择的路由对象
    getChooseView(path) {
      return this.editableTabs.find(e => e.path == path)
    },
    // 找到当前右击的索引值
    findIndexPath(path = '', editableTabs = []) {
      return editableTabs.findIndex(f => {
        return f.path === path
      })
    },
    // 关闭自身tabs
    async delTabs(path) {
      const delIndex = this.findIndexPath(path, this.editableTabs)
      await this.$store.dispatch('tagsView/delView', this.getChooseView(path))
      this.redirectTabs(delIndex)
    },
    // 循环关闭tabs
    closeTabsList(tabs = []) {
      if (tabs && tabs.length) {
        tabs.forEach(async tab => {
          // 如果是固定的则不允许删掉
          if (tab.meta.affix) return false
          await this.$store.dispatch(
            'tagsView/delView',
            this.getChooseView(tab.path)
          )
        })
        this.redirectTabs()
      }
    },
    // 右击tabs
    onRightClick(tabName, act) {
      // 关闭自己
      if (act.value === '1') {
        this.delTabs(tabName)
      }
      // 关闭右侧
      if (act.value === '2') {
        const tabId = this.findIndexPath(tabName, this.editableTabs)
        const tabs = this.editableTabs.slice(tabId + 1)
        this.closeTabsList(tabs)
      }
      // 关闭左边
      if (act.value === '5') {
        const tabId = this.findIndexPath(tabName, this.editableTabs)
        const tabs = this.editableTabs.slice(0, tabId)
        this.closeTabsList(tabs)
      }
      // 关闭其他标签
      if (act.value === '3') {
        const tabs = this.editableTabs.filter(
          tab => tab.path !== tabName && !tab.meta.affix
        )
        this.closeTabsList(tabs)
      }
      // 关闭所有标签
      if (act.value === '4') {
        const tabs = this.editableTabs.filter(tab => !tab.meta.affix)
        this.closeTabsList(tabs)
      }
    }
  }
}

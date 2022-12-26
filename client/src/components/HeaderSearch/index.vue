<template>
  <div :class="{'show':show}" class="header-search">
    <ks-icon :class="{'show-icon':show}" name="status-search" class="search-icon" @click.native.stop="click" />
    <ks-select
      ref="headerSearchSelect"
      v-model="search"
      :remote-method="querySearch"
      filterable
      default-first-option
      remote
      placeholder="菜单搜索"
      class="header-search-select"
      @change="change"
    >

      <ks-icon slot="prefix" name="status-search" class="search-icon" />
      <div v-for="child in options" :key="child.item.path">
        <ks-option v-if="!child.children" :value="child.item" :label="child.item.title.join(' > ')" />
      </div>
    </ks-select>
  </div>
</template>

<script>
// fuse is a lightweight fuzzy-search module
// make search results more in line with expectations
import Fuse from 'fuse.js'
import path from 'path'
import { mapGetters } from 'vuex'
export default {
  name: 'HeaderSearch',
  data() {
    return {
      search: '',
      options: [],
      searchPool: [],
      show: false,
      fuse: undefined
    }
  },
  computed: {
    ...mapGetters({
      routes: 'permission_routes'
    })
  },
  watch: {
    routes() {
      this.searchPool = this.generateRoutes(this.routes)
    },
    searchPool(list) {
      this.initFuse(list)
    },
    show(value) {
      if (value) {
        document.body.addEventListener('click', this.close)
      } else {
        document.body.removeEventListener('click', this.close)
      }
    }
  },
  mounted() {
    this.searchPool = this.generateRoutes(this.routes)
    this.$hotkey.bind('ctrl+f,command+f', this.click)
  },
  beforeDestroy() {
    this.$hotkey.unbind('ctrl+f,command+f', this.click)
  },
  methods: {
    click() {
      this.show = !this.show
      if (this.show) {
        this.$refs.headerSearchSelect && this.$refs.headerSearchSelect.focus()
      }
    },
    close() {
      this.$refs.headerSearchSelect && this.$refs.headerSearchSelect.blur()
      this.options = []
      this.show = false
    },
    change(val) {
      this.$router.push(val.path)
      this.search = ''
      this.options = []
      this.$nextTick(() => {
        this.show = false
      })
    },
    initFuse(list) {
      this.fuse = new Fuse(list, {
        shouldSort: true,
        threshold: 0.4,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: [{
          name: 'title',
          weight: 0.7
        }, {
          name: 'path',
          weight: 0.3
        }]
      })
    },
    // Filter out the routes that can be displayed in the sidebar
    // And generate the internationalized title
    generateRoutes(routes, basePath = '/', prefixTitle = []) {
      let res = []

      for (const router of routes) {
        // skip hidden router
        if (router.hidden && !router.showFirstChild) { continue }

        const data = {
          path: path.resolve(basePath, router.path),
          title: [...prefixTitle]
        }

        if (router.meta && router.meta.title) {
          data.title = [...data.title, router.meta.title]

          if (router.redirect !== 'noRedirect' && !router.children) {
            // only push the routes with title
            // special case: need to exclude parent router without redirect
            res.push(data)
          }
        }

        // recursive child routes
        if (router.children) {
          const tempRoutes = this.generateRoutes(router.children, data.path, data.title)
          if (tempRoutes.length >= 1) {
            res = [...res, ...tempRoutes]
          }
        }
      }
      return res
    },
    querySearch(query) {
      if (query !== '') {
        this.options = this.fuse.search(query)
      } else {
        this.options = []
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.header-search {
  height: 100%;
  position: relative;
  .search-icon{
    font-size:$--font-18;
    vertical-align: middle;
    transition: all;
    transition-delay: 0.2s;
  }
  .header-search-select {
    position: absolute;
    z-index:1;
    right:0;
    font-size: $--font-18;
    transition: width 0.2s;
    width: 0;
    overflow: hidden;
    background: transparent;
    border-radius: 0;
    display: inline-block;
    vertical-align: middle;

    ::v-deep{
      .ks-input__inner {
        border-radius: 10px;
        vertical-align: middle;
      }
      .ks-input__prefix{
        .search-icon{
          margin-left:4px;
          font-size:$--font-16;
        }
      }
    }
  }

  &.show {
    .header-search-select {
      width: 210px;
      margin-left: 10px;
    }
  }
  .show-icon{
    display: none;
    opacity: 0 !important;
  }
}
</style>

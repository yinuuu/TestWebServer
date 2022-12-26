<template>
  <div class="app-container">
    <!-- Note that row-key is necessary to get a correct row order. -->
    <ks-table
      ref="dragTable"
      v-loading="listLoading"
      :data="list"
      row-key="id"
      stripe
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <ks-table-column align="left" label="ID" width="65">
        <template v-slot="{ row }">
          <span>{{ row.id }}</span>
        </template>
      </ks-table-column>

      <ks-table-column width="180px" align="left" label="Date">
        <template slot-scope="{ row }">
          <span>{{ row.timestamp }}</span>
        </template>
      </ks-table-column>

      <ks-table-column min-width="300px" label="Title">
        <template slot-scope="{ row }">
          <span>{{ row.title }}</span>
        </template>
      </ks-table-column>

      <ks-table-column width="110px" align="left" label="Author">
        <template slot-scope="{ row }">
          <span>{{ row.author }}</span>
        </template>
      </ks-table-column>

      <ks-table-column width="100px" label="Importance">
        <template slot-scope="{ row }">
          <svg-icon
            v-for="n in +row.importance"
            :key="n"
            icon-class="star"
            class="icon-star"
          />
        </template>
      </ks-table-column>

      <ks-table-column align="left" label="Readings" width="95">
        <template slot-scope="{ row }">
          <span>{{ row.pageviews }}</span>
        </template>
      </ks-table-column>

      <ks-table-column class-name="status-col" label="Status" width="110">
        <template slot-scope="{ row }">
          <ks-tag :type="row.status | statusFilter">
            {{ row.status }}
          </ks-tag>
        </template>
      </ks-table-column>

      <ks-table-column align="left" label="Drag" width="80">
        <template slot-scope="{}">
          <svg-icon class="drag-handler" icon-class="drag" />
        </template>
      </ks-table-column>
    </ks-table>
    <div class="show-d"><ks-tag>The default order :</ks-tag> {{ oldList }}</div>
    <div class="show-d">
      <ks-tag>The after dragging order :</ks-tag> {{ newList }}
    </div>
  </div>
</template>

<script>
import Sortable from 'sortablejs'

export default {
  name: 'DragTable',
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10
      },
      sortable: null,
      oldList: [],
      newList: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      const data = {
        total: 10,
        items: [
          {
            id: 1,
            timestamp: 1167881086945,
            author: 'Kimberly',
            reviewer: 'Carol',
            title: 'Tvwjom Ovyocnwwcr Ttdcpb Scmsjq Cktyzclbg Tcfn Svtd',
            content_short: 'mock data',
            content:
              '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>',
            forecast: 62.44,
            importance: 1,
            type: 'JP',
            status: 'published',
            display_time: '2006-01-26 19:24:50',
            comment_disabled: true,
            pageviews: 1317,
            image_uri:
              'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3',
            platforms: ['a-platform']
          },
          {
            id: 2,
            timestamp: 1490317855872,
            author: 'Donald',
            reviewer: 'Paul',
            title: 'Mgh Vnbqv Upfe Myplevuu Cyhiznykus Gssnf',
            content_short: 'mock data',
            content:
              '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>',
            forecast: 88.04,
            importance: 2,
            type: 'JP',
            status: 'draft',
            display_time: '2011-08-27 10:27:38',
            comment_disabled: true,
            pageviews: 3665,
            image_uri:
              'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3',
            platforms: ['a-platform']
          },
          {
            id: 3,
            timestamp: 496594325789,
            author: 'Melissa',
            reviewer: 'Betty',
            title: 'Ujxp Boijt Hugdsvt Ggbo Tjzvltu Spvrdx',
            content_short: 'mock data',
            content:
              '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>',
            forecast: 58.08,
            importance: 1,
            type: 'US',
            status: 'draft',
            display_time: '1994-09-01 04:24:45',
            comment_disabled: true,
            pageviews: 806,
            image_uri:
              'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3',
            platforms: ['a-platform']
          },
          {
            id: 4,
            timestamp: 1389193670431,
            author: 'Michelle',
            reviewer: 'Michael',
            title:
              'Gkbxye Rxhvcgeyd Derkacojm Rea Usqfsfgam Mbhprxm Kcrkignl Hgpfevt',
            content_short: 'mock data',
            content:
              '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>',
            forecast: 16.34,
            importance: 3,
            type: 'US',
            status: 'draft',
            display_time: '1971-01-04 19:07:39',
            comment_disabled: true,
            pageviews: 1986,
            image_uri:
              'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3',
            platforms: ['a-platform']
          },
          {
            id: 5,
            timestamp: 1498854947004,
            author: 'Sharon',
            reviewer: 'Matthew',
            title:
              'Xxns Ljeym Qrsvdtwn Ttsrqsvruh Feyapfoy Iysgpf Httbtvi Cshaf Bpnw',
            content_short: 'mock data',
            content:
              '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>',
            forecast: 70.01,
            importance: 1,
            type: 'US',
            status: 'published',
            display_time: '2000-12-08 01:01:41',
            comment_disabled: true,
            pageviews: 4021,
            image_uri:
              'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3',
            platforms: ['a-platform']
          },
          {
            id: 6,
            timestamp: 1260312868225,
            author: 'Sharon',
            reviewer: 'Paul',
            title: 'Ptrksgz Cqujfvfx Sxozufhrw Efxo Fmwh Geveswjjz Vxtp',
            content_short: 'mock data',
            content:
              '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>',
            forecast: 54.09,
            importance: 1,
            type: 'JP',
            status: 'published',
            display_time: '2002-10-25 07:40:29',
            comment_disabled: true,
            pageviews: 3569,
            image_uri:
              'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3',
            platforms: ['a-platform']
          },
          {
            id: 7,
            timestamp: 719888234298,
            author: 'Jessica',
            reviewer: 'David',
            title: 'Sbnh Smhvco Rlzn Qux Ydwg Rtvzlxw Uyfd',
            content_short: 'mock data',
            content:
              '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>',
            forecast: 68.47,
            importance: 2,
            type: 'CN',
            status: 'draft',
            display_time: '1976-04-07 10:35:36',
            comment_disabled: true,
            pageviews: 2449,
            image_uri:
              'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3',
            platforms: ['a-platform']
          },
          {
            id: 8,
            timestamp: 1487530319373,
            author: 'Kevin',
            reviewer: 'Jessica',
            title: 'Jyjy Jelvwk Kzut Cuqyxqkm Rekaek Debis Ico Eaohx Fkyjbu',
            content_short: 'mock data',
            content:
              '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>',
            forecast: 98.97,
            importance: 1,
            type: 'JP',
            status: 'draft',
            display_time: '1974-02-10 01:47:39',
            comment_disabled: true,
            pageviews: 619,
            image_uri:
              'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3',
            platforms: ['a-platform']
          },
          {
            id: 9,
            timestamp: 1140971586965,
            author: 'Ruth',
            reviewer: 'Timothy',
            title: 'Kivbg Ncq Sriz Nkyslosvas Volt Mhimvmg Mfny',
            content_short: 'mock data',
            content:
              '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>',
            forecast: 90.42,
            importance: 2,
            type: 'EU',
            status: 'draft',
            display_time: '1990-09-06 01:30:31',
            comment_disabled: true,
            pageviews: 2410,
            image_uri:
              'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3',
            platforms: ['a-platform']
          },
          {
            id: 10,
            timestamp: 268739165587,
            author: 'Elizabeth',
            reviewer: 'Margaret',
            title:
              'Tgemljepz Gzxw Dolkfno Ecndcqmr Qdcqc Yhjputlf Xtjixun Ilnr Ewuogce',
            content_short: 'mock data',
            content:
              '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>',
            forecast: 92.21,
            importance: 2,
            type: 'JP',
            status: 'draft',
            display_time: '1978-03-19 09:57:15',
            comment_disabled: true,
            pageviews: 1164,
            image_uri:
              'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3',
            platforms: ['a-platform']
          }
        ]
      }
      this.list = data.items
      this.total = data.total
      this.listLoading = false
      this.oldList = this.list.map(v => v.id)
      this.newList = this.oldList.slice()
      this.$nextTick(() => {
        this.setSort()
      })
    },
    setSort() {
      const el = this.$refs.dragTable.$el.querySelectorAll(
        '.ks-table__body-wrapper > table > tbody'
      )[0]
      this.sortable = Sortable.create(el, {
        ghostClass: 'sortable-ghost', // Class name for the drop placeholder,
        setData: function(dataTransfer) {
          // to avoid Firefox bug
          // Detail see : https://github.com/RubaXa/Sortable/issues/1012
          dataTransfer.setData('Text', '')
        },
        onEnd: evt => {
          const targetRow = this.list.splice(evt.oldIndex, 1)[0]
          this.list.splice(evt.newIndex, 0, targetRow)

          // for show the changes, you can delete in you code
          const tempIndex = this.newList.splice(evt.oldIndex, 1)[0]
          this.newList.splice(evt.newIndex, 0, tempIndex)
        }
      })
    }
  }
}
</script>

<style lang="scss">
.sortable-ghost {
  opacity: 0.8;
  color: $--color-fff !important;
  background: $--color-42b983!important;
}
</style>

<style scoped>
.icon-star {
  margin-right: 2px;
}
.drag-handler {
  width: 20px;
  height: 20px;
  cursor: pointer;
  vertical-align: middle;
}
.show-d {
  margin-top: 15px;
}
</style>

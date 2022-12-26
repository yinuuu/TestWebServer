<template>
  <div class="app-container">
    <ks-table v-loading="listLoading" :data="list" stripe border fit highlight-current-row style="width: 100%">
      <ks-table-column align="left" label="ID" width="80">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </ks-table-column>

      <ks-table-column width="180px" align="left" label="Date">
        <template slot-scope="{row}">
          <span>{{ row.timestamp }}</span>
        </template>
      </ks-table-column>

      <ks-table-column width="120px" align="left" label="Author">
        <template slot-scope="{row}">
          <span>{{ row.author }}</span>
        </template>
      </ks-table-column>

      <ks-table-column width="100px" label="Importance">
        <template slot-scope="{row}">
          <svg-icon v-for="n in + row.importance" :key="n" icon-class="star" class="meta-item__icon" />
        </template>
      </ks-table-column>

      <ks-table-column class-name="status-col" label="Status" width="110">
        <template slot-scope="{row}">
          <ks-tag :type="row.status | statusFilter">
            {{ row.status }}
          </ks-tag>
        </template>
      </ks-table-column>

      <ks-table-column min-width="300px" label="Title">
        <template slot-scope="{row}">
          <template v-if="row.edit">
            <ks-input v-model="row.title" class="edit-input" size="small" />
            <ks-button
              class="cancks-btn"
              size="small"
              icon="ks-icon-status-reset"
              type="warning"
              @click="cancelEdit(row)"
            >
              cancel
            </ks-button>
          </template>
          <span v-else>{{ row.title }}</span>
        </template>
      </ks-table-column>

      <ks-table-column align="left" label="Actions" width="120">
        <template slot-scope="{row}">
          <ks-button
            v-if="row.edit"
            show-type="text"
            type="success"
            size="small"
            icon="ks-icon-circle-check-outline"
            @click="confirmEdit(row)"
          >Ok
          </ks-button>
          <ks-button
            v-else
            type="primary"
            size="small"
            show-type="text"
            icon="ks-icon-status-edit3"
            @click="row.edit=!row.edit"
          >Edit
          </ks-button>
        </template>
      </ks-table-column>
    </ks-table>
  </div>
</template>

<script>

export default {
  name: 'InlineEditTable',
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
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      const items = [{
        'id': 1,
        'timestamp': 1167881086945,
        'author': 'Kimberly',
        'reviewer': 'Carol',
        'title': 'Tvwjom Ovyocnwwcr Ttdcpb Scmsjq Cktyzclbg Tcfn Svtd',
        'content_short': 'mock data',
        'content': '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>',
        'forecast': 62.44,
        'importance': 1,
        'type': 'JP',
        'status': 'published',
        'display_time': '2006-01-26 19:24:50',
        'comment_disabled': true,
        'pageviews': 1317,
        'image_uri': 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3',
        'platforms': ['a-platform']
      }, {
        'id': 2,
        'timestamp': 1490317855872,
        'author': 'Donald',
        'reviewer': 'Paul',
        'title': 'Mgh Vnbqv Upfe Myplevuu Cyhiznykus Gssnf',
        'content_short': 'mock data',
        'content': '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>',
        'forecast': 88.04,
        'importance': 2,
        'type': 'JP',
        'status': 'draft',
        'display_time': '2011-08-27 10:27:38',
        'comment_disabled': true,
        'pageviews': 3665,
        'image_uri': 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3',
        'platforms': ['a-platform']
      }, {
        'id': 3,
        'timestamp': 496594325789,
        'author': 'Melissa',
        'reviewer': 'Betty',
        'title': 'Ujxp Boijt Hugdsvt Ggbo Tjzvltu Spvrdx',
        'content_short': 'mock data',
        'content': '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>',
        'forecast': 58.08,
        'importance': 1,
        'type': 'US',
        'status': 'draft',
        'display_time': '1994-09-01 04:24:45',
        'comment_disabled': true,
        'pageviews': 806,
        'image_uri': 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3',
        'platforms': ['a-platform']
      }, {
        'id': 4,
        'timestamp': 1389193670431,
        'author': 'Michelle',
        'reviewer': 'Michael',
        'title': 'Gkbxye Rxhvcgeyd Derkacojm Rea Usqfsfgam Mbhprxm Kcrkignl Hgpfevt',
        'content_short': 'mock data',
        'content': '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>',
        'forecast': 16.34,
        'importance': 3,
        'type': 'US',
        'status': 'draft',
        'display_time': '1971-01-04 19:07:39',
        'comment_disabled': true,
        'pageviews': 1986,
        'image_uri': 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3',
        'platforms': ['a-platform']
      }, {
        'id': 5,
        'timestamp': 1498854947004,
        'author': 'Sharon',
        'reviewer': 'Matthew',
        'title': 'Xxns Ljeym Qrsvdtwn Ttsrqsvruh Feyapfoy Iysgpf Httbtvi Cshaf Bpnw',
        'content_short': 'mock data',
        'content': '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>',
        'forecast': 70.01,
        'importance': 1,
        'type': 'US',
        'status': 'published',
        'display_time': '2000-12-08 01:01:41',
        'comment_disabled': true,
        'pageviews': 4021,
        'image_uri': 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3',
        'platforms': ['a-platform']
      }, {
        'id': 6,
        'timestamp': 1260312868225,
        'author': 'Sharon',
        'reviewer': 'Paul',
        'title': 'Ptrksgz Cqujfvfx Sxozufhrw Efxo Fmwh Geveswjjz Vxtp',
        'content_short': 'mock data',
        'content': '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>',
        'forecast': 54.09,
        'importance': 1,
        'type': 'JP',
        'status': 'published',
        'display_time': '2002-10-25 07:40:29',
        'comment_disabled': true,
        'pageviews': 3569,
        'image_uri': 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3',
        'platforms': ['a-platform']
      }, {
        'id': 7,
        'timestamp': 719888234298,
        'author': 'Jessica',
        'reviewer': 'David',
        'title': 'Sbnh Smhvco Rlzn Qux Ydwg Rtvzlxw Uyfd',
        'content_short': 'mock data',
        'content': '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>',
        'forecast': 68.47,
        'importance': 2,
        'type': 'CN',
        'status': 'draft',
        'display_time': '1976-04-07 10:35:36',
        'comment_disabled': true,
        'pageviews': 2449,
        'image_uri': 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3',
        'platforms': ['a-platform']
      }, {
        'id': 8,
        'timestamp': 1487530319373,
        'author': 'Kevin',
        'reviewer': 'Jessica',
        'title': 'Jyjy Jelvwk Kzut Cuqyxqkm Rekaek Debis Ico Eaohx Fkyjbu',
        'content_short': 'mock data',
        'content': '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>',
        'forecast': 98.97,
        'importance': 1,
        'type': 'JP',
        'status': 'draft',
        'display_time': '1974-02-10 01:47:39',
        'comment_disabled': true,
        'pageviews': 619,
        'image_uri': 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3',
        'platforms': ['a-platform']
      }, {
        'id': 9,
        'timestamp': 1140971586965,
        'author': 'Ruth',
        'reviewer': 'Timothy',
        'title': 'Kivbg Ncq Sriz Nkyslosvas Volt Mhimvmg Mfny',
        'content_short': 'mock data',
        'content': '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>',
        'forecast': 90.42,
        'importance': 2,
        'type': 'EU',
        'status': 'draft',
        'display_time': '1990-09-06 01:30:31',
        'comment_disabled': true,
        'pageviews': 2410,
        'image_uri': 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3',
        'platforms': ['a-platform']
      }, {
        'id': 10,
        'timestamp': 268739165587,
        'author': 'Elizabeth',
        'reviewer': 'Margaret',
        'title': 'Tgemljepz Gzxw Dolkfno Ecndcqmr Qdcqc Yhjputlf Xtjixun Ilnr Ewuogce',
        'content_short': 'mock data',
        'content': '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>',
        'forecast': 92.21,
        'importance': 2,
        'type': 'JP',
        'status': 'draft',
        'display_time': '1978-03-19 09:57:15',
        'comment_disabled': true,
        'pageviews': 1164,
        'image_uri': 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3',
        'platforms': ['a-platform']
      }]
      this.list = items.map(v => {
        this.$set(v, 'edit', false) // https://vuejs.org/v2/guide/reactivity.html
        v.originalTitle = v.title //  will be used when user click the cancel botton
        return v
      })
      this.listLoading = false
    },
    cancelEdit(row) {
      row.title = row.originalTitle
      row.edit = false
      this.$message({
        message: 'The title has been restored to the original value',
        type: 'warning'
      })
    },
    confirmEdit(row) {
      row.edit = false
      row.originalTitle = row.title
      this.$message({
        message: 'The title has been edited',
        type: 'success'
      })
    }
  }
}
</script>

<style scoped>
.edit-input {
  padding-right: 100px;
  margin-bottom:0;
}
.cancks-btn {
  position: absolute;
  right: 15px;
  top: 3px;
}
</style>

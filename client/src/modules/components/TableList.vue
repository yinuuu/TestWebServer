<!--
 * @Author: shasha.qiang
 * @Date: 2021-01-21 09:01:01
 * @LastEditors: yiwen.wu
 * @LastEditTime: 2021-09-03 10:32:46
 * @Description: 表格展示
-->
<template>
  <div class="table-container">
    <ks-table
      :data="data"
      :stripe="tableConfigs.tableOptions.stripe"
      :border="tableConfigs.tableOptions.border"
      :show-header="tableConfigs.tableOptions.showHeader"
      :highlight-current-row="tableConfigs.tableOptions.highlightCcurrentRow"
      :current-row-key="tableConfigs.tableOptions.currentRowKey"
    >
      <!-- 表格 -->
      <ks-table-column
        v-if="tableConfigs.tableOptions.showIndex"
        type="index"
      />
      <table-column v-for="item in tableConfigs.tableColumns" :key="item.label" :column-config="item" />
      <ks-table-column v-if="tableConfigs.operateOptions" fixed="right" label="操作" :min-width="tableConfigs.tableOptions.operateWidth||100">
        <template slot-scope="scope">
          <template v-if="tableConfigs.tableOptions.editTable">
            <ks-button
              type="primary"
              show-type="text"
              size="small"
              class="option-button"
              icon="ks-icon-status-edit3"
              @click="handleEdit(scope.row)"
            >
              编辑
            </ks-button>
            <ks-button
              type="primary"
              show-type="text"
              size="small"
              class="option-button"
              icon="ks-icon-status-delete3"
              @click="handleDelete(scope.row)"
            >
              删除
            </ks-button>
          </template>
          <ks-button
            v-for="item in tableConfigs.operateOptions"
            :key="item.label"
            type="primary"
            show-type="text"
            size="small"
            class="option-button"
            :icon="item.icon"
            @click="handleClick(item.handleFun,scope.$index, scope.row)"
          >
            {{ item.label }}
          </ks-button>
        </template>
      </ks-table-column>
    </ks-table>
    <!-- 数据分页 -->
    <div v-if="tableOptions.showPagination" class="block pagination">
      <ks-pagination
        background
        layout="total,prev, pager, next, jumper,sizes"
        :current-page.sync="pagination[paginationLabel.currentPage]"
        :page-size="pagination[paginationLabel.limit]"
        :page-sizes="pagination[paginationLabel.pageSizes]"
        :total="pagination[paginationLabel.total]"
        @size-change="sizePageMix"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
import TableColumn from './TableColumn'
import request from '@utils/axios/request'
export default {
  components: { TableColumn },
  props: {
    tableConfigs: {
      required: true,
      type: Object
    },
    url: {
      required: true,
      type: Object
    }
  },
  data() {
    return {
      data: [{
        name: '张三',
        date: '2016-05-02',
        sex: '0',
        sexLabel: '男',
        dept: 1,
        deptName: '一级 1'
      }, {
        name: '李四',
        date: '2016-05-02',
        sex: '0',
        sexLabel: '男',
        dept: 1,
        deptName: '一级 1'
      }],
      pagination: {}, // 分页数据
      paginationLabel: {}, // 分页label
      paginationConfig: {} // 分页配置
    }
  },
  computed: {
    tableOptions() {
      return this.tableConfigs.tableOptions || {}
    }
  },
  watch: {},
  created() {
    this.initpaginationConfig()
  },
  methods: {
    // 初始化页面分页配置
    initpaginationConfig() {
      this.paginationLabel = this.tableConfigs.paginationOptions.label
      this.paginationConfig = this.tableConfigs.paginationOptions.config
      this.pagination[this.paginationLabel.limit] = this.paginationConfig.limit
      this.pagination[this.paginationLabel.currentPage] = this.paginationConfig.currentPage
      this.pagination[this.paginationLabel.pageSizes] = this.paginationConfig.pageSizes
      this.pagination[this.paginationLabel.total] = this.paginationConfig.total || this.data.length
    },
    // 修改页面size
    sizePageMix(val) {
      this.pagination[this.paginationLabel.limit] = val
    },
    indexMethodMix(index) {
      return (this.pagination[this.paginationLabel.currentPage] - 1) * this.pagination[this.paginationLabel.limit] + index + 1
    },
    // 分页事执行的请求，需要自己完善或者进行封装
    handleCurrentChange() {},
    // 实际请求函数请在实现时自己完善
    async getTableData(params = {}) {
      const list = await request({
        ...this.url,
        data: JSON.stringify(params)
      })
      this.data = list
    },
    handleEdit(row) {
      console.log(row)
      this.$emit('handleEdit', 'edit', Object.assign(row))
    },
    handleClick(funcName, index, row) {
      this.$emit('handleOptions', funcName, index, row)
    }
  }
}
</script>

<style scoped lang="scss">
.table-container{
  display: flex;
  flex-direction: column;
  .pagination-wrapper {
    display: flex;
    justify-content: flex-end;
  }
  .option-button {
    padding: 0 1px !important;
    // width: 45px;
    height: 20px;
    font-size: $--font-14;
    &::after {
      content: "";
      display: inline-block;
      background-color:#dfdfdf;
      width: 2px;
      height: 20px;
      margin-left: 10px;
      transform: translateY(30%);
    }
    &:last-child::after {
      display: none;
    }
  }
}
</style>

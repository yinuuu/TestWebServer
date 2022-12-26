<!--
 * @Author: genfa.zeng
 * @Date: 2021-08-13 09:14:04
 * @LastEditors: yiwen.wu
 * @LastEditTime: 2021-09-03 10:56:50
 * @Description:订单查询模块
-->
<template>
  <ks-complex-table
    show-pagination
    background
    stripe
    border
    layout="total, sizes, prev, pager, next, jumper"
    :page-sizes="[5, 10, 20, 30]"
    :pager-count="5"
    :total="100"
    :column="column"
    :data="data"
  />
</template>
<script>
export default {
  data() {
    return {
      currentPage: 1,
      pageSize: 5,
      column: [
        {
          prop: 'code',
          label: '代码'
        },
        {
          prop: 'name',
          label: '名称'
        },
        {
          prop: 'rate',
          label: '涨幅(%)',
          render: (h, scope) => {
            return (
              <span style={this.getTextColor(scope)}>
                {scope.row[scope.column.property]}
              </span>
            )
          }
        }
      ],
      data: [
        {
          code: '300405',
          name: '科隆股份',
          rate: 20.04
        },
        {
          code: '300198',
          name: '纳川股份',
          rate: 20.06
        },
        {
          code: '000422',
          name: '湖北宜化',
          rate: -9.88
        },
        {
          code: '002795',
          name: '永和智控',
          rate: -9.94
        },
        {
          code: '300405',
          name: '科隆股份',
          rate: 20.04
        },
        {
          code: '300198',
          name: '纳川股份',
          rate: 20.06
        },
        {
          code: '000422',
          name: '湖北宜化',
          rate: -9.88
        },
        {
          code: '002795',
          name: '永和智控',
          rate: -9.94
        }
      ]
    }
  },
  methods: {
    getTextColor(scope) {
      const cellValue = scope.row[scope.column.property]
      return {
        color: cellValue > 0 ? '#fa3459' : '#00b465'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .ks-complex-table__pagination {
  float: right;
  &::after {
    content: '';
    clear: both;
  }
}
</style>

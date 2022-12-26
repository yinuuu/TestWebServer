<!--
 * @Author: shasha.qiang
 * @Date: 2021-03-18 10:57:26
 * @LastEditors: genfa.zeng
 * @LastEditTime: 2021-08-11 09:57:51
 * @Description: 访问量
-->
<template>
  <div id="panelChart" class="panel-container" />
</template>

<script>
import echarts from 'echarts'
export default {
  mounted() {
    this.init()
  },
  methods: {
    init() {
      const myChart = echarts.init(document.getElementById('panelChart'), 'macarons')
      // 绘制图表
      const option = {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          right: '2%',
          orient: 'vertical',
          icon: 'none',

          textStyle: {
            borderColor: '#9A9EFF',
            padding: [5, 10],
            fontSize: 14,
            borderWidth: 1,
            borderRadius: 7,
            shadowColor: '#e6e5ff'
          }
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '$--color-fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '40',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            color: ['#5470c6', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#ea7ccc'],
            data: [
              { value: 0, name: '周一' },
              { value: 0, name: '周二' },
              { value: 580, name: '周三' },
              { value: 484, name: '周四' },
              { value: 0, name: '周五' },
              { value: 0, name: '周六' },
              { value: 0, name: '周日' }
            ]
          }
        ]
      }
      myChart.setOption(option)
    }
  }

}
</script>

<style lang="scss" scoped>
.panel-container{
  width: 550Px;
  height: 300Px;
}
</style>


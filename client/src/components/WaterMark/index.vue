<!--
 * @Author: yiwen.wu
 * @Date: 2021-10-18 09:00:28
 * @LastEditTime: 2021-11-11 15:29:49
 * @LastEditors: xin.chen
 * @Description: 水印组件
 * @FilePath: /ks-vue-template/src/components/WaterMark/index.vue
-->
<template>
  <div class="watermark__wrapper" :style="{backgroundImage: 'url(' + imgUrl + ')',zIndex:watermarkConfig.zIndex}" />
</template>

<script>
export default {
  name: 'WaterMask',
  props: {
    watermarkConfig: {
      type: Object,
      required: false,
      default() {
        return {
          width: '200',
          height: '200',
          textAlign: 'left',
          textBaseline: 'middle',
          font: '16',
          fillStyle: 'rgba(184, 184, 184, 0.6)',
          rotate: '0', // 旋转角度
          staticContent: '金仕达金融科技研究院', // 静态内容
          dynamicContent: [], // 动态内容
          connectSymbol: ' ', // 连接符号
          zIndex: '9999'
        }
      }
    }
  },
  data() {
    return {
      imgUrl: ''
    }
  },
  watch: {
    watermarkConfig: {
      handler() {
        this.imgUrl = this.setStamp()
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    setStamp() {
      const { width, height, textAlign, textBaseline, font, fillStyle, rotate, staticContent, dynamicContent, connectSymbol } = this.watermarkConfig
      const canvas = document.createElement('canvas')
      canvas.setAttribute('width', width + 'px')
      canvas.setAttribute('height', height + 'px')
      const ctx = canvas.getContext('2d')
      ctx.textAlign = textAlign
      ctx.textBaseline = textBaseline
      ctx.font = `bold ${font}px Arial`
      ctx.fillStyle = fillStyle
      ctx.translate(parseInt(width) / 2, parseInt(height) / 2)
      ctx.rotate(rotate * Math.PI / 180)
      ctx.translate(-parseInt(width) / 2, -parseInt(height) / 2)
      ctx.fillText(`${dynamicContent.join(connectSymbol)}${connectSymbol}${staticContent}`, parseFloat(width) / 4, parseFloat(height) / 2)
      return canvas.toDataURL()
    }
  }
}
</script>

<style lang="scss" scoped>
.watermark__wrapper {
  pointer-events: none;
  background-repeat:repeat;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

</style>

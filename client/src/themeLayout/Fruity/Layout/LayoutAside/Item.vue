<!--
 * @Author: xin.chen
 * @Date: 2020-09-14 14:34:42
 * @LastEditors: shengchao.yuan
 * @LastEditTime: 2020-12-25 18:59:38
 * @Description:
-->
<script>
export default {
  name: 'MenuItem',
  functional: true,
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  render(h, context) {
    const { icon, title } = context.props
    const vnodes = []

    if (icon) {
      if (icon.includes('ks-icon')) {
        vnodes.push(<i class={[icon, 'sub-ks-icon']} />)
      } else {
        vnodes.push(<svg-icon icon-class={icon} />)
      }
    }
    if (title) {
      vnodes.push(<span slot='title'>{title}</span>)
    }
    return vnodes
  }
}
</script>

<style scoped>
.sub-ks-icon {
  color: currentColor;
  width: 1em;
  height: 1em;
}
</style>

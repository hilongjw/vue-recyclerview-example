<script>
export default {
  props: {
    item: Object,
    tag: {
      type: String,
      default: 'div'
    }
  },
  render (h) {
    if (!this.item.show) return
    return h(this.tag, this.$slots.default)
  }
}
</script>

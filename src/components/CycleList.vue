<style>
.recyclerview {
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  width: 100%;
  height: 100%;
  position: absolute;
  box-sizing: border-box;
  contain: layout;
  will-change: transform;
}
</style>

<script>
import InfiniteScroller from '../covInfinite'
import Vue from 'vue'

function ContentSource (fetch, itemRender, Tombstone) {
  this.itemRender = itemRender
  this.Tombstone = Tombstone
  this.fetch = fetch
  this.nextItem_ = 0
  this.vmCache = {}
}

ContentSource.prototype = {
  getVm (data, el, item) {
    if (!this.vmCache[data.id]) {
      this.vmCache[data.id] = new Vue({
        render: (h) => {
          return h(this.itemRender, {
            props: {
              data: data
            }
          })
        }
      })
    }
    return this.vmCache[data.id]
  },
  createTombstone (el) {
    const vm = new Vue({
      el: el,
      render: (h) => {
        return h(this.Tombstone)
      }
    })
    return vm.$el
  },
  render (data, el, item) {
    const vm = new Vue({
      el: el,
      render: (h) => {
        return h(this.itemRender, {
          props: {
            data: data
          }
        })
      }
    })
    item.vm = vm
    return vm.$el
  }
}

export default {
  props: {
    fetch: Function,
    item: Object,
    tombstone: Object,
    prerender: Number,
    tag: {
      type: String,
      default: 'div'
    }
  },
  render (h) {
    return h(this.tag, null, this.$slots.default)
  },
  data () {
    return {
      contentSource: new ContentSource(this.fetch, this.item, this.tombstone, {
        RUNWAY_ITEMS: this.prerender
      }),
      scroller: null
    }
  },
  mounted () {
    this.init()
  },
  beforeDestroy () {
    this.scroller.destroy()
  },
  methods: {
    init () {
      this.scroller = new InfiniteScroller(
        this.$el,
        this.contentSource,
        {
          RUNWAY_ITEMS: 10,
          RUNWAY_ITEMS_OPPOSITE: 10
        }
      )
    }
  }
}
</script>

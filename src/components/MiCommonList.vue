<style>
.common-list .mi-item {
  position: relative;
  list-style: none;
}
</style>
<template>
    <div class="common-list">
        <MiItem :data="item" v-for="item in list" :key="item.id"></MiItem>
    </div>
</template>

<script>
import MiItem from '../components/MiItem.vue'
import { fetch } from '../data/mi-fetch'

export default {
  data () {
    return {
      list: []
    }
  },
  components: {
    MiItem
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      fetch(100, 0)
        .then(data => {
          this.list = data.list
        })
    }
  }
}
</script>

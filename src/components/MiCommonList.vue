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
import fetch from '../data/miFetch'

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
      fetch(1000)
        .then(data => {
          this.list = data.list
        })
    }
  }
}
</script>

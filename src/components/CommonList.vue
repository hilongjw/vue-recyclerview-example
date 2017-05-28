<template>
    <div>
        <ChatItem :data="item" v-for="item in messages" :key="item.id"></ChatItem>
    </div>
</template>

<script>
import ChatItem from './ChatItem.vue'
import Tombstone from './Tombstone.vue'
import fetch from '../data/wechat-fetch'

export default {
  data () {
    return {
      messages: []
    }
  },
  components: {
    ChatItem,
    Tombstone
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      fetch(1000)
        .then(data => {
          this.messages = data.list
        })
    }
  }
}
</script>

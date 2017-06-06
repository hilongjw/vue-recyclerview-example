<style>
html {
  background: #eeeeee;
}

html, body {
  min-height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
  font-family: 'Roboto', sans-serif;
  -webkit-tap-highlight-color: rgba(0,0,0,0);
}
html .wechat-list,
.wechat .recyclerview {
  background: #efefef;
}
.switch {
  position: fixed;
  top: 50px;
  right: 0;
  z-index: 100;
  background: #03A9F4;
  color: #fff;
  font-size: 14px;
  padding: 10px;
}
.nav-header {
  background: #373b3e;
  height: 50px;
  line-height: 50px;
  color: #fff;
  padding: 0 20px;
}
.nav-header-action {
  position: absolute;
  height: 50px;
  width: 50px;
  padding-right: 10px;
  top: 0;
  right: 0;
  color: #fff;
  line-height: 45px;
  text-align: right;
}
.nav-header-action-icon {
  width: 26px;
  margin-top: 14px;
}
.recyclerview-container {
  height: calc(100vh - 50px);
}
.testlist {
  display: flex;
  flex-wrap: wrap;
}
.chat-view-footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  height: 50px;
}
.wechat {
  height: calc(100vh - 100px);
}
.chat-input {
  width: 100%;
  height: 50px;
  border: none;
  outline: none;
  padding: 5px;
  line-height: 14px;
}
.chat-send-btn {
  flex-shrink: 0;
  width: 100px;
  height: 50px;
  background: #8BC34A;
  border: none;
  color: #fff;
  font-size: 14px;
}
</style>

<template>
  <div id="app">
    <div class="nav-header" @click="scrollToBottom">
      {{ listType }}
      <div class="nav-header-action" @click="toogleModal">
        <img src="static/images/wechat-more.svg" class="nav-header-action-icon">
      </div>
    </div>

    <div class="chat-view" v-if="listType === 'wechat-recyclerview'" >
      <RecyclerView 
        ref="RecyclerView"
        key="wechat"
        class="recyclerview-container wechat" 
        :fetch="wechatFetch" 
        :item="ChatItem" 
        :tombstone="Tombstone"
        :prerender="10"
        :remain="10"
        :options="wechatOptions"
        @inited="initScrollToBottom"
        ></RecyclerView>
        <div class="chat-view-footer">
          <textarea v-model="input" @keyup.enter="addMessage" class="chat-input"></textarea>
          <button class="chat-send-btn" @click="addMessage">send</button>
        </div>
    </div>

    <CommonList v-if="listType === 'listview'" class="recyclerview wechat-list common" ></CommonList>
    
    <RecyclerView 
      ref="RecyclerView"
      v-if="listType === 'mi recyclerview'" 
      :prerender="5"
      :remain="1"
      key="mi"
      :list="list"
      :fetch="MiFetch" 
      :item="MiItem" 
      :tombstone="MiTomstone"
    ></RecyclerView>

    <RecyclerView 
      v-if="listType === 'Multiple-columns'" 
      ref="RecyclerView"
      :prerender="20"
      :remain="20"
      :column="3"
      class="recyclerview-container testlist"
      key="multi"
      :list="list"
      :waterflow="true"
      :fetch="MiFetch" 
      :item="TestItem" 
      :tombstone="TestTombstone"
    ></RecyclerView>

    <MiCommonList v-if="listType === 'mi listview'" class="recyclerview common" ></MiCommonList>

    <ActionModal :action-modal="actionModal" :toogle-modal="toogleModal"></ActionModal>
  </div>
</template>

<script>
// import RecyclerView from 'vue-recyclerview/src/RecyclerView.vue'
// import RecyclerView from './components/RecyclerView.vue'
// import RecyclerView from './recyclerview/index.js'
// import RecyclerView from '../dist/static/js/recyclerview.js'
import ChatItem from './components/ChatItem.vue'
import Tombstone from './components/Tombstone'
import MiItem from './components/MiItem.vue'
import MiTomstone from './components/MiTombstone.vue'
import initStat from './stat-config'
import * as wechatFetch from './data/wechat-fetch'
import CommonList from './components/CommonList.vue'
import MiCommonList from './components/MiCommonList.vue'
import ActionModal from './components/ActionModal.vue'
import TestItem from './components/TestItem.vue'
import TestTombstone from './components/TestTombstone.vue'
import { fetch } from './data/mi-fetch'

export default {
  name: 'app',
  data () {
    return {
      input: '',
      wechatOptions: {
        props: {
          color: {
            value: ''
          }
        }
      },
      actionModal: {
        show: false,
        actions: [{
          text: 'wechat-recyclerview',
          icon: 'icon-wechat1',
          handler: this.actionHandler
        }, {
          text: 'listview',
          icon: 'icon-1',
          handler: this.actionHandler
        }, {
          text: 'mi recyclerview',
          icon: 'icon-mi',
          handler: this.actionHandler
        }, {
          text: 'mi listview',
          icon: 'icon-mi',
          handler: this.actionHandler
        }, {
          text: 'Multiple-columns',
          icon: 'icon-mi',
          handler: this.actionHandler
        }]
      },
      list: [], // JSON.parse(JSON.stringify(testData)),
      wechatFetch: wechatFetch.fetch,
      ChatItem,
      Tombstone,
      actionModalShow: false,
      listType: '',
      messages: [],
      MiFetch: fetch,
      MiItem,
      MiTomstone,
      TestTombstone,
      TestItem
    }
  },
  mounted () {
    initStat()
    if (window.location.hash) {
      this.listType = window.location.hash.replace('#', '')
    } else {
      this.listType = 'mi recyclerview'
    }
  },
  components: {
    CommonList,
    MiCommonList,
    ActionModal
  },
  methods: {
    actionHandler (action) {
      this.listType = action.text
      this.toogleModal()
    },
    initScrollToBottom () {
      this.$nextTick(() => {
        const RecyclerView = this.$refs.RecyclerView
        RecyclerView && RecyclerView.scrollToIndex(1000)
      })
    },
    wechatScrollToBottom () {
      const RecyclerView = this.$refs.RecyclerView
      RecyclerView._scrollToBottom()
    },
    replyMessage () {
      setTimeout(() => {
        this.addMsg(null, false)
      }, 500 + 1500 * Math.random())
    },
    addMsg (msg, sender, cb) {
      const RecyclerView = this.$refs.RecyclerView
      wechatFetch.getItem()
        .then(data => {
          if (msg) data.message = msg
          data.self = sender
          cb && cb()
          this.wechatOptions.props.color.value = '#' + ((1 << 24) * Math.random() | 0).toString(16)
          RecyclerView.scroller.MAX_COUNT += 1
          RecyclerView.scroller.addContent([data])
          this.wechatScrollToBottom()
        })
    },
    addMessage () {
      this.addMsg(this.input, true, () => {
        this.input = ''
        this.replyMessage()
      })
    },
    scrollToBottom () {
      const RecyclerView = this.$refs.RecyclerView
      if (!RecyclerView) return
      const len = RecyclerView.scroller.MAX_COUNT
      RecyclerView.scrollToIndex(len)
      // this.list = this.list.concat(JSON.parse(JSON.stringify(testData)))
    },
    toogleModal () {
      this.actionModal.show = !this.actionModal.show
    },
    toggle () {
      this.view = !this.view
      this.toogleModal()
    }
  }
}
</script>

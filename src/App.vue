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
</style>

<template>
  <div id="app">
    <div class="nav-header" @click="scrollToBottom">
      {{ listType }}
      <div class="nav-header-action" @click="toogleModal">
        <img src="static/images/wechat-more.svg" class="nav-header-action-icon">
      </div>
    </div>

    <RecyclerView 
      v-if="listType === 'wechat-recyclerview'" 
      key="wechat"
      class="recyclerview-container wechat" 
      :fetch="wechatFetch" 
      :item="ChatItem" 
      :tombstone="Tombstone"
      :prerender="10"
      :remain="10"
      ></RecyclerView>

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
import wechatFetch from './data/wechat-fetch'
import CommonList from './components/CommonList.vue'
import MiCommonList from './components/MiCommonList.vue'
import ActionModal from './components/ActionModal.vue'
import TestItem from './components/TestItem.vue'
import TestTombstone from './components/TestTombstone.vue'
import { fetch } from './data/mi-fetch'

// const testData = [{
//   vm: null,
//   data: {
//     'id': '5287',
//     'stand_img_id': '8880692',
//     'name': '小米USB-C电源适配器（45W）',
//     'market_price_max': '99.00',
//     'market_price_min': '99.00',
//     'price_max': '99.00',
//     'price_min': '99.00',
//     'has_store': '0',
//     'is_cos': true,
//     'img_url': '//cdn.cnbj0.fds.api.mi-img.com/b2c-mimall-media/648060ed1a8ef00f5756679ef7ba6971.jpg',
//     'action': {
//       'log_code': '30000001110011001'
//     },
//     'product_comment': 'PD2.0 协议 / 精致小巧 / 可为 QC3.0 设备充电 / 附赠USB-C to USB-C数据线\n',
//     'tag_img': ''
//   },
//   node: null,
//   height: 100,
//   width: 100,
//   top: 0
// }, {
//   vm: null,
//   data: {
//     'id': '1123',
//     'stand_img_id': '8880692',
//     'name': '小米USB-C电源适配器（45W）',
//     'market_price_max': '99.00',
//     'market_price_min': '99.00',
//     'price_max': '99.00',
//     'price_min': '99.00',
//     'has_store': '0',
//     'is_cos': true,
//     'img_url': '//cdn.cnbj0.fds.api.mi-img.com/b2c-mimall-media/648060ed1a8ef00f5756679ef7ba6971.jpg',
//     'action': {
//       'log_code': '30000001110011001'
//     },
//     'product_comment': 'PD2.0 协议 / 精致小巧 / 可为 QC3.0 设备充电 / 附赠USB-C to USB-C数据线\n',
//     'tag_img': ''
//   },
//   node: null,
//   height: 100,
//   width: 100,
//   top: 0
// }, {
//   vm: null,
//   data: {
//     'id': '123123',
//     'stand_img_id': '8880692',
//     'name': '小米USB-C电源适配器（45W）',
//     'market_price_max': '99.00',
//     'market_price_min': '99.00',
//     'price_max': '99.00',
//     'price_min': '99.00',
//     'has_store': '0',
//     'is_cos': true,
//     'img_url': '//cdn.cnbj0.fds.api.mi-img.com/b2c-mimall-media/648060ed1a8ef00f5756679ef7ba6971.jpg',
//     'action': {
//       'log_code': '30000001110011001'
//     },
//     'product_comment': 'PD2.0 协议 / 精致小巧 / 可为 QC3.0 设备充电 / 附赠USB-C to USB-C数据线\n',
//     'tag_img': ''
//   },
//   node: null,
//   height: 100,
//   width: 100,
//   top: 0
// }, {
//   vm: null,
//   data: {
//     'id': '5287',
//     'stand_img_id': '8880692',
//     'name': '小米USB-C电源适配器（45W）',
//     'market_price_max': '99.00',
//     'market_price_min': '99.00',
//     'price_max': '99.00',
//     'price_min': '99.00',
//     'has_store': '0',
//     'is_cos': true,
//     'img_url': '//cdn.cnbj0.fds.api.mi-img.com/b2c-mimall-media/648060ed1a8ef00f5756679ef7ba6971.jpg',
//     'action': {
//       'log_code': '30000001110011001'
//     },
//     'product_comment': 'PD2.0 协议 / 精致小巧 / 可为 QC3.0 设备充电 / 附赠USB-C to USB-C数据线\n',
//     'tag_img': ''
//   },
//   node: null,
//   height: 100,
//   width: 100,
//   top: 0
// }, {
//   vm: null,
//   data: {
//     'id': '1',
//     'stand_img_id': '8880692',
//     'name': '小米USB-C电源适配器（45W）',
//     'market_price_max': '99.00',
//     'market_price_min': '99.00',
//     'price_max': '99.00',
//     'price_min': '99.00',
//     'has_store': '0',
//     'is_cos': true,
//     'img_url': '//cdn.cnbj0.fds.api.mi-img.com/b2c-mimall-media/648060ed1a8ef00f5756679ef7ba6971.jpg',
//     'action': {
//       'log_code': '30000001110011001'
//     },
//     'product_comment': 'PD2.0 协议 / 精致小巧 / 可为 QC3.0 设备充电 / 附赠USB-C to USB-C数据线\n',
//     'tag_img': ''
//   },
//   node: null,
//   height: 100,
//   width: 100,
//   top: 0
// }, {
//   vm: null,
//   data: {
//     'id': '123123',
//     'stand_img_id': '8880692',
//     'name': '小米USB-C电源适配器（45W）',
//     'market_price_max': '99.00',
//     'market_price_min': '99.00',
//     'price_max': '99.00',
//     'price_min': '99.00',
//     'has_store': '0',
//     'is_cos': true,
//     'img_url': '//cdn.cnbj0.fds.api.mi-img.com/b2c-mimall-media/648060ed1a8ef00f5756679ef7ba6971.jpg',
//     'action': {
//       'log_code': '30000001110011001'
//     },
//     'product_comment': 'PD2.0 协议 / 精致小巧 / 可为 QC3.0 设备充电 / 附赠USB-C to USB-C数据线\n',
//     'tag_img': ''
//   },
//   node: null,
//   height: 100,
//   width: 100,
//   top: 0
// }, {
//   vm: null,
//   data: {
//     'id': '5287',
//     'stand_img_id': '8880692',
//     'name': '小米USB-C电源适配器（45W）',
//     'market_price_max': '99.00',
//     'market_price_min': '99.00',
//     'price_max': '99.00',
//     'price_min': '99.00',
//     'has_store': '0',
//     'is_cos': true,
//     'img_url': '//cdn.cnbj0.fds.api.mi-img.com/b2c-mimall-media/648060ed1a8ef00f5756679ef7ba6971.jpg',
//     'action': {
//       'log_code': '30000001110011001'
//     },
//     'product_comment': 'PD2.0 协议 / 精致小巧 / 可为 QC3.0 设备充电 / 附赠USB-C to USB-C数据线\n',
//     'tag_img': ''
//   },
//   node: null,
//   height: 100,
//   width: 100,
//   top: 0
// }, {
//   vm: null,
//   data: {
//     'id': '1123',
//     'stand_img_id': '8880692',
//     'name': '小米USB-C电源适配器（45W）',
//     'market_price_max': '99.00',
//     'market_price_min': '99.00',
//     'price_max': '99.00',
//     'price_min': '99.00',
//     'has_store': '0',
//     'is_cos': true,
//     'img_url': '//cdn.cnbj0.fds.api.mi-img.com/b2c-mimall-media/648060ed1a8ef00f5756679ef7ba6971.jpg',
//     'action': {
//       'log_code': '30000001110011001'
//     },
//     'product_comment': 'PD2.0 协议 / 精致小巧 / 可为 QC3.0 设备充电 / 附赠USB-C to USB-C数据线\n',
//     'tag_img': ''
//   },
//   node: null,
//   height: 100,
//   width: 100,
//   top: 0
// }, {
//   vm: null,
//   data: {
//     'id': '123123',
//     'stand_img_id': '8880692',
//     'name': '小米USB-C电源适配器（45W）',
//     'market_price_max': '99.00',
//     'market_price_min': '99.00',
//     'price_max': '99.00',
//     'price_min': '99.00',
//     'has_store': '0',
//     'is_cos': true,
//     'img_url': '//cdn.cnbj0.fds.api.mi-img.com/b2c-mimall-media/648060ed1a8ef00f5756679ef7ba6971.jpg',
//     'action': {
//       'log_code': '30000001110011001'
//     },
//     'product_comment': 'PD2.0 协议 / 精致小巧 / 可为 QC3.0 设备充电 / 附赠USB-C to USB-C数据线\n',
//     'tag_img': ''
//   },
//   node: null,
//   height: 100,
//   width: 100,
//   top: 0
// }, {
//   vm: null,
//   data: {
//     'id': '5287',
//     'stand_img_id': '8880692',
//     'name': '小米USB-C电源适配器（45W）',
//     'market_price_max': '99.00',
//     'market_price_min': '99.00',
//     'price_max': '99.00',
//     'price_min': '99.00',
//     'has_store': '0',
//     'is_cos': true,
//     'img_url': '//cdn.cnbj0.fds.api.mi-img.com/b2c-mimall-media/648060ed1a8ef00f5756679ef7ba6971.jpg',
//     'action': {
//       'log_code': '30000001110011001'
//     },
//     'product_comment': 'PD2.0 协议 / 精致小巧 / 可为 QC3.0 设备充电 / 附赠USB-C to USB-C数据线\n',
//     'tag_img': ''
//   },
//   node: null,
//   height: 100,
//   width: 100,
//   top: 0
// }, {
//   vm: null,
//   data: {
//     'id': '1',
//     'stand_img_id': '8880692',
//     'name': '小米USB-C电源适配器（45W）',
//     'market_price_max': '99.00',
//     'market_price_min': '99.00',
//     'price_max': '99.00',
//     'price_min': '99.00',
//     'has_store': '0',
//     'is_cos': true,
//     'img_url': '//cdn.cnbj0.fds.api.mi-img.com/b2c-mimall-media/648060ed1a8ef00f5756679ef7ba6971.jpg',
//     'action': {
//       'log_code': '30000001110011001'
//     },
//     'product_comment': 'PD2.0 协议 / 精致小巧 / 可为 QC3.0 设备充电 / 附赠USB-C to USB-C数据线\n',
//     'tag_img': ''
//   },
//   node: null,
//   height: 100,
//   width: 100,
//   top: 0
// }, {
//   vm: null,
//   data: {
//     'id': '123123',
//     'stand_img_id': '8880692',
//     'name': '小米USB-C电源适配器（45W）',
//     'market_price_max': '99.00',
//     'market_price_min': '99.00',
//     'price_max': '99.00',
//     'price_min': '99.00',
//     'has_store': '0',
//     'is_cos': true,
//     'img_url': '//cdn.cnbj0.fds.api.mi-img.com/b2c-mimall-media/648060ed1a8ef00f5756679ef7ba6971.jpg',
//     'action': {
//       'log_code': '30000001110011001'
//     },
//     'product_comment': 'PD2.0 协议 / 精致小巧 / 可为 QC3.0 设备充电 / 附赠USB-C to USB-C数据线\n',
//     'tag_img': ''
//   },
//   node: null,
//   height: 100,
//   width: 100,
//   top: 0
// }]

export default {
  name: 'app',
  data () {
    return {
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
      actionModalShow: false,
      listType: '',
      messages: [],
      wechatFetch: wechatFetch,
      MiFetch: fetch,
      MiItem,
      ChatItem,
      Tombstone,
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
    scrollToBottom () {
      const RecyclerView = this.$refs.RecyclerView
      // const len = this.list.length
      RecyclerView && RecyclerView.scrollToIndex(99)
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

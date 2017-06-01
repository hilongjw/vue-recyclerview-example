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
.action-filter {
  position: fixed;
  top: 50px;
  left: 0;
  height: 100vh;
  width: 100%;
  background: rgba(0, 0, 0, 0.31);
  z-index: 100;
}
.action-modal {
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  min-height: 200px;
  background: #fff;
  z-index: 101;
  padding: 20px;
  box-sizing: border-box;
}
.action-item {
  width: 25%;
  text-align: center;
  color: #6d6d6d;
}
.action-item-icon {
  font-size: 30px;
  margin-bottom: 5px;
}
.action-item-text {
  font-size: 12px;
}
</style>

<template>
  <div id="app">
    <div class="nav-header">
      {{ listType }}
      <div class="nav-header-action" @click="toogleModal">
        <img src="static/images/wechat-more.svg" class="nav-header-action-icon">
      </div>
    </div>

    <RecyclerView 
      v-if="listType === 'wechat recyclerview'" 
      key="wechat" class="recyclerview wechat" 
      :fetch="wechatFetch" 
      :item="ChatItem" 
      :tombstone="Tombstone"
      :prerender="30"
      ></RecyclerView>

    <CommonList v-if="listType === 'listview'" class="recyclerview common" ></CommonList>

    <RecyclerView 
      v-if="listType === 'mi recyclerview'" 
      :prerender="30"
      key="mi" 
      class="recyclerview mi-list" 
      :fetch="MiFetch" 
      :item="MiItem" 
      :tombstone="MiTomstone"
    ></RecyclerView>

    <MiCommonList v-if="listType === 'mi listview'" class="recyclerview common" ></MiCommonList>

    <ActionModal :action-modal="actionModal" :toogle-modal="toogleModal"></ActionModal>
  </div>
</template>

<script>
// import RecyclerView from 'vue-recyclerview/src/RecyclerView.vue'
// import RecyclerView from './components/RecyclerView.vue'
import RecyclerView from './recyclerview/index.js'
// import RecyclerView from '../dist/static/js/recyclerview.js'
import ChatItem from './components/ChatItem.vue'
import Tombstone from './components/Tombstone'
import MiItem from './components/MiItem.vue'
import MiTomstone from './components/MiTombstone.vue'
import initStat from './stat-config'
import wechatFetch from './data/wechat-fetch'
import MiFetch from './data/miFetch'
import CommonList from './components/CommonList.vue'
import MiCommonList from './components/MiCommonList.vue'
import ActionModal from './components/ActionModal.vue'
import Vue from 'vue'

export default {
  name: 'app',
  data () {
    return {
      miRecycleOptions: {
        RUNWAY_ITEMS: 10
      },
      actionModal: {
        show: false,
        actions: [{
          text: 'wechat recyclerview',
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
        }]
      },
      actionModalShow: false,
      listType: 'mi recyclerview',
      messages: [],
      wechatFetch: wechatFetch,
      MiFetch: MiFetch,
      MiItem,
      ChatItem,
      Tombstone,
      MiTomstone
    }
  },
  mounted () {
    initStat()
  },
  components: {
    RecyclerView: RecyclerView(Vue),
    CommonList,
    MiCommonList,
    ActionModal
  },
  methods: {
    actionHandler (action) {
      this.listType = action.text
      this.toogleModal()
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

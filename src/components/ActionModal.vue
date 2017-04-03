<template>
  <div>
    <div class="action-filter" @click="toogleModal" v-show="actionModal.show"></div>
    <div class="action-modal" v-show="actionModal.show">
      <div class="action-item" v-for="action in actionModal.actions" @click="action.handler(action)">
        <div class="action-item-icon iconfont" :class="action.icon"></div>
        <div class="action-item-text">
          {{ action.text }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    actionModal: Object,
    toogleModal: Function
  }
}
</script>

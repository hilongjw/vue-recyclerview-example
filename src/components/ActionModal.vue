<style>
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

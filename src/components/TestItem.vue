<style>
.simple-item {
  position: relative;
  width: 33.33%;
  min-height: 150px;
  background: #ccc;
  border: 1px solid #fff;
  box-sizing: border-box;
}
.simple-item-id {
  position: absolute;
  top: 1;
}
.simple-item-image {
  width: 100%;
  min-height: 150px;
  vertical-align: bottom;
}
</style>

<template>
    <div class="simple-item" :index="data.id">
      <div class="simple-item-id">{{data.id}}</div>
      <img :src="data.image" class="simple-item-image">
    </div>
</template>

<script>
export default {
  props: {
    data: Object
  }
}
</script>

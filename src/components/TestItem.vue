<style>
.simple-item {
  position: relative;
  width: 33.33%;
  min-height: 150px;
  background: #000;
  border: 1px solid #000;
  box-sizing: border-box;
}
.simple-item-id {
  position: absolute;
  top: 5px;
  left: 5px;
  color: #737373;
  background: #fff;
  padding: 5px;
  border-radius: 4px;
  min-width: 20px;
  text-align: center;
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

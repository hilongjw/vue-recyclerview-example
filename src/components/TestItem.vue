<style>
.simple-item {
    width: 33%;
    height: 100px;
    background: #ccc;
    border: 1px solid #fff;
    box-sizing: border-box;
}
</style>

<template>
    <div class="simple-item" :style="{ background: data.color }">
        {{ data.id }}
    </div>
</template>

<script>
export default {
  props: {
    data: Object
  }
}
</script>

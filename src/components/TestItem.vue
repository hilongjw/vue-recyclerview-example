<style>
.simple-item {
    width: 33.33%;
    height: 200px;
    background: #ccc;
    border: 1px solid #fff;
    box-sizing: border-box;
}
</style>

<template>
    <div class="simple-item" :index="data.id" :style="{ background: data.color, height: data.height }">
      <p>
        {{ data.id }}
      </p>
      <button>666</button>
    </div>
</template>

<script>
export default {
  props: {
    data: Object
  }
}
</script>

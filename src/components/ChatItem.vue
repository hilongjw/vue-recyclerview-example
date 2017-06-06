<style>
.chat-item {
  display: flex;
  padding: 10px 0;
  width: 100%;
  contain: layout;
  will-change: transform;
}

.avatar {
  border-radius: 4px;
  margin-left: 10px;
  margin-right: 6px;
  height: 30px;
  width: 30px;
}

.chat-item p {
  margin: 0;
  word-wrap: break-word;
  font-size: 13px;
}

.chat-item.tombstone p {
  width: 100%;
  height: 0.5em;
  background-color: #ccc;
  margin: 0.5em 0;
}

.chat-item .bubble img {
  max-width: 100%;
  height: auto;
}

.bubble {
  padding: 7px 10px;
  color: #333;
  background: #fff;
  border-radius: 4px;
  position: relative;
  max-width: 420px;
  min-width: 80px;
  margin: 0 5px;
}

.bubble::before {
  content: '';
  border-style: solid;
  border-width: 5px 5px 5px 0;
  border-color: transparent #fff transparent transparent;
  position: absolute;
  top: 10.6px;
  left: -5px;
}

/*.bubble img {
  width: 80%;
}*/

.meta {
  font-size: 0.8rem;
  color: #999;
  margin-top: 3px;
}

.from-me {
  justify-content: flex-end;
}

.from-me .avatar {
  order: 1;
  margin-left: 6px;
  margin-right: 10px;
}

.from-me .bubble {
  background: #a2e563;
}

.from-me .bubble::before {
  left: 100%;
  border-width: 5px 5px 5px 5px;
  border-color: transparent transparent transparent #a2e563;
}
.state {
  display: none;
}
.invisible {
  display: none;
}

@media screen and (max-width: 640px) {
  .bubble {
    max-width: 220px;
  }
}
</style>
<template>
  <li class="chat-item" @click="say" :class="{ 'from-me': data.self }" :data-id="data.id">
    <img class="avatar" width="48" height="48" :src="data.avatar">
    <div class="bubble">
      <p :style="{ color: color && color.value }" >
        {{data.id + data.message}}
      </p>
      <img width="300" height="300" :class="{ invisible: !data.image  }"  :src="data.image">
      <!-- <div class="meta">
        <time class="posted-date">{{data.time}}</time>
      </div> -->
    </div>
  </li>
</template>

<script>
export default {
  props: {
    data: Object,
    color: Object
  },
  methods: {
    say () {
      console.log(this.data.id)
    }
  }
}
</script>

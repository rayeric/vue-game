<template>
  <div class="game-wrapper">
    <div
      v-for="(item, index) in boxs"
      class="game-box-item"
      @click="handleSelect(index)"
      :key="index"
    >{{item}}</div>
  </div>
</template>

<script>
export default {
  name: "GameBox",
  props: {
    boxs: {
      type: Array,
      required: true
    }
  },
  data() {
    return {};
  },
  methods: {
    handleSelect(i) {
      this.$emit("handleSelect", i);
    }
  }
};
</script>

<style>
.game-wrapper {
  width: 300px;
  height: 300px;
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
  padding: 0;
}

.game-box-item {
  width: 100px;
  height: 100px;
  line-height: 80px;
  border: 1px solid #000;
  box-sizing: border-box;
  text-align: center;
  font-size: 80px;
  font-weight: bold;
  margin-right: -1px;
  margin-top: -1px;
}
</style>


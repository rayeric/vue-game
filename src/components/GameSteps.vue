<template>
  <ol class="steps">
    <li @click="handleResert">Go to game start</li>
    <li
      v-for="(item, index) in steps"
      :key="index"
      @click="handleReturn(item)"
    >Go to game #{{index+1}}</li>
  </ol>
</template>

<script>
export default {
    name: 'GameSteps',
    props: {
        steps: {
            type: Array,
            required: true
        }
    },
    methods: {
        handleReturn(i) {
            this.$emit('handleReturn', i)
        },
        handleResert() {
            this.$emit('handleResert')
        }
    }
}
</script>

<style>
ol {
  padding-left: 1rem;
}
ol li {
  font-weight: bold;
  border: 1px solid #999;
  margin: 10px 0;
  padding: 5px;
  cursor: pointer;
  border-radius: 4px;
}
</style>
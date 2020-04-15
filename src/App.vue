<template>
  <div id="app">
    <game-box :boxs="boxs" @handleSelect="handleSelect" />

    <div class="result">
      <span v-if="!isWin">Next Player: {{next===0?'x': 'o'}}</span>
      <span v-else>Winner: {{next===0?'x': 'o'}}</span>
    </div>

    <game-steps :steps="steps" @handleReturn="handleReturn" @handleResert="handleResert" />
  </div>
</template>

<script>
import GameBox from "./components/GameBox";
import GameSteps from "./components/GameSteps";

export default {
  name: "app",
  components: { GameBox, GameSteps },
  data() {
    return {
      boxs: [null, null, null, null, null, null, null, null, null], //視圖顯示‘x’、‘o’
      steps: [], //步驟
      next: 0, //下一步誰下
      isWin: false, //是否勝利
      player1: [], //遊戲者1
      player2: [] //遊戲者2
    };
  },
  created() {},
  watch: {
    player1(val) {
      if (this.isWinner(val)) {
        this.isWin = true;
        this.next = 0;
      }
    },
    player2(val) {
      if (this.isWinner(val)) {
        this.isWin = true;
        this.next = 1;
      }
    }
  },
  methods: {
    handleSelect(index) {
      if (this.isWin) return;
      if (this.boxs[index] !== null) return;
      if (this.next === 0) {
        this.next = 1;
        this.player1.push(index + 1);
        this.boxs.splice(index, 1, "x");
      } else {
        this.player2.push(index + 1);
        this.boxs.splice(index, 1, "o");
        this.next = 0;
      }

      this.steps.push(index + 1);
    },
    // 反悔
    handleReturn(i) {

      if(this.player1.includes(this.steps.indexOf(i) + 1)) {
        this.next = 1
      } else if(this.player2.includes(this.steps.indexOf(i) + 1)) {
        this.next = 0
      }

      const steps = this.steps.splice(this.steps.indexOf(i) + 1);
      
      steps.forEach(item => {
        this.boxs.splice(item - 1, 1, null);
        if (this.player1.indexOf(item) !== -1) {
          this.player1.splice(this.player1.indexOf(item), 1);
        }
        if (this.player2.indexOf(item) !== -1) {
          this.player2.splice(this.player2.indexOf(item), 1);
        }
      });
      this.isWin = false;
    },
    //重新遊戲
    handleResert() {
      this.steps = [];
      this.boxs = [null, null, null, null, null, null, null, null, null];
      this.next = 0;
      this.player1 = [];
      this.player2 = [];
      this.isWin = false;
    },
    // 是否勝利
    isWinner(arr) {
      let result = [];
      const verifyArr = [
        [1, 2, 3],
        [2, 5, 8],
        [3, 6, 9],
        [4, 5, 6],
        [1, 5, 9],
        [3, 5, 7],
        [7, 8, 9],
        [1, 4, 7]
      ];
      for (let i = 0; i < verifyArr.length; i++) {
        result.push(this.includes(arr, verifyArr[i]));
      }
      return result.some(val => val === true);
    },
    includes(arr1, arr2) {
      return arr2.every(val => arr1.includes(val));
    }
  }
};
</script>

<style>
#app {
  position: absolute;
  left: 50%;
  margin-left: -150px;
  padding-top: 40px;
}
.result {
  padding: 10px;
  font-size: 24px;
}
</style>
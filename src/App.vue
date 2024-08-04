<script setup lang="ts">
import multi from "@/assets/multi.svg";
import one from "@/assets/one.svg";
import { onMounted, reactive, ref } from "vue";
import Game from "./lib/game";


const game = reactive(new Game("Amir", "Javid"));
const loading = ref<boolean>(false);

onMounted(() => {
  game.init();
  game.gameHandler(0);
});

const clickHandler = (box: number): void => {
  if (!game.multiplayer) {
    loadingConcept();
  }

  game.gameHandler(box);
};

const loadingConcept = (): void => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
  }, 1000);
};
</script>
<!-- ask about .once and disable -->
<template>
  <main class="grid gap">
    <div class="min-h-32 mb-16">
      <div
        v-if="loading"
        class="rounded-full mx-auto my-auto grid text-center items-center justify-center"
      >
        <img
          class="w-32"
          src="https://tifin.com/wp-content/uploads/TIFIN-BRAIN-1000PX.gif"
          alt="brain"
        />

     
      </div>
      <div
        v-else
        class="rounded-full mx-auto my-auto grid text-center items-center justify-center"
      >
        <div
          v-if="!game.multiplayer"
          class="flex justify-center text-white tracking-widest"
        >
          your turn
        </div>
        <div v-else class="flex justify-center text-white tracking-widest">
          <span v-if="game.turn === 1"> {{ game.player1 }}'s turn</span>
          <span v-else> {{ game.player2 }}'s turn</span> 
        </div>
      </div>
      
    </div>
    <!-- <div class="flex justify-center mb-16">
    <button class="flex justify-center w-32 bg-white py-2 px-4 rounded-lg"> Restart Game</button>
  </div> -->
    <div
      class="flex gap"
      v-for="(pattern, row) in game.boardPattern"
      :key="row"
    >
      <template v-for="(box, col) in pattern" :key="col">
        <template v-if="row === 0">
          <button
            :class="`w-48 h-48 b-border ${
              col === 0 ? 'r-border' : col === 1 ? 'rl-border' : 'l-border'
            }`"
            :disabled="game.p2Pattern(box) || game.p1Pattern(box) || loading"
            @click.prevent="clickHandler(box)"
          >
            <div
              :class="`${
                game.p1Pattern(box)
                  ? 'cross'
                  : game.p2Pattern(box)
                  ? 'circle'
                  : ''
              }`"
            ></div>
          </button>
        </template>
        <template v-else-if="row === 1">
          <button
            :class="`w-48 h-48 b-border t-border ${
              col === 0 ? 'r-border' : col === 1 ? 'rl-border' : 'l-border'
            }`"
            :disabled="game.p2Pattern(box) || game.p1Pattern(box) || loading"
            @click.prevent="clickHandler(box)"
          >
            <div
              :class="`${
                game.p1Pattern(box)
                  ? 'cross'
                  : game.p2Pattern(box)
                  ? 'circle'
                  : ''
              }`"
            ></div>
          </button>
        </template>
        <template v-else>
          <button
            :class="`w-48 h-48  t-border ${
              col === 0 ? 'r-border' : col === 1 ? 'rl-border' : 'l-border'
            }`"
            :disabled="game.p2Pattern(box) || game.p1Pattern(box) || loading"
            @click.prevent="clickHandler(box)"
          >
            <div
              :class="`${
                game.p1Pattern(box)
                  ? 'cross'
                  : game.p2Pattern(box)
                  ? 'circle'
                  : ''
              }`"
            ></div>
          </button>
        </template>
      </template>
    </div>
    <div
      class="text-white w-full flex mb-8 justify-center mt-16 gap-16 text-[1.5rem]"
    >
      <div class="text-center">
        <div>{{ game.player1 }} ( X )</div>
        <div>{{ game.p1Score }}</div>
      </div>
      <div class="text-center">
        <div>Draws</div>
        <div>{{ game.p1Score }}</div>
      </div>
      <div v-if="game.multiplayer" class="text-center">
        <div>{{ game.player2 }} ( O )</div>
        <div>{{ game.p2Score }}</div>
      </div>
      <div v-else class="text-center">
        <div>Computer ( O )</div>
        <div>{{ game.p2Score }}</div>
      </div>
      <div>
        <button class="grid" @click.prevent="game.playerMode">
          <img v-if="!game.multiplayer" width="32" :src="one" alt="oneplayer" />
          <img v-else width="32" :src="multi" alt="multiplayer" />
          {{ game.multiplayer ? "2" : "1" }}P
        </button>
      </div>
    </div>
  </main>

  <footer
    class="bg-white w-full text-black fixed bottom-0 py-4 flex justify-center"
  >
    Amir Samimi - Tic-Tac-Toe - 2024
  </footer>
</template>

<style>
button {
  display: flex;
  justify-content: center;
  align-items: center;
}

.b-border {
  border-bottom: 0.25rem solid white;
}
.t-border {
  border-top: 0.25rem solid white;
}
.l-border {
  border-left: 0.5rem solid white;
}

.r-border {
  border-right: 0.5rem solid white;
}

.circle {
  border: 1rem solid white;
  border-radius: 100px;
  width: 8rem;
  height: 8rem;
}

.cross {
  position: relative;
  width: 8rem;
  height: 8rem;
}

.cross::before,
.cross::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 10px;
  background-color: white;
}

.cross::before {
  transform: translate(-50%, -50%) rotate(45deg);
}

.cross::after {
  transform: translate(-50%, -50%) rotate(-45deg);
}
</style>

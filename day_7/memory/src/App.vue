<template>
  <div class="s-app-wrapper">
    <div class="s-table">
      <h1>Игра Memory</h1>

      <div class="s-table-game">
        <Card
            v-for="card in cards"
            :key="card.id"
            :number="card.number"
            :flipped="card.flipped || card.matched"
            :disabled="lockBoard || card.matched"
            :matched="card.matched"
            @click="flipCard(card)"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import {onMounted, ref} from 'vue'
import Card from '@/components/Card.vue'

const levels = {
  beginner: 12,
  intermediate: 24,
  expert: 36
}

const chosenLevel = ref(levels.expert)
const cards = ref([])
const firstCard = ref(null)
const secondCard = ref(null)
const lockBoard = ref(false)

onMounted(() => {
  initGame()
})

function initGame() {
  const pairs = chosenLevel.value / 2
  let id = 1
  const numbers = []

  for (let i = 1; i <= pairs; i++) {
    numbers.push(i, i)
  }

  cards.value = shuffle(numbers).map(number => ({
    id: id++,
    number,
    flipped: false,
    matched: false
  }))
}

function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5)
}

function flipCard(card) {
  if (card.flipped || lockBoard.value) return

  card.flipped = true

  if (!firstCard.value) {
    firstCard.value = card
    return
  }

  secondCard.value = card
  checkMatch()
}

function checkMatch() {
  lockBoard.value = true

  if (firstCard.value.number === secondCard.value.number) {
    firstCard.value.matched = true
    secondCard.value.matched = true
    resetTurn()
  } else {
    setTimeout(() => {
      firstCard.value.flipped = false
      secondCard.value.flipped = false
      resetTurn()
    }, 800)
  }
}

function resetTurn() {
  firstCard.value = null
  secondCard.value = null
  lockBoard.value = false
}
</script>

<style scoped lang="scss">
.s-app-wrapper {
  height: 100%;
  display: flex;
  justify-content: center;
  padding: 20px;

  .s-table {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    gap: 20px;

    &-game {
      padding: 10px;
      max-width: 600px;
      width: 100%;
      height: 600px;
      background: var(--s-green);
      display: grid;
      grid-gap: 10px;
      grid-template-columns: repeat(6, 1fr);
      grid-template-rows: repeat(6, 1fr);
    }
  }
}
</style>

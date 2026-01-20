<template>
  <div class="s-app-wrapper">
    <div class="s-table">
      <h1>Игра Memory</h1>
      <h3>Выберите уровень</h3>
      <div class="s-table-levels">
        <SButton color="green"
                 class="s-table-level-btn"
                 v-for="(level, key) in levels"
                 :key="key"
                 :class="{ active: chosenLevelKey === key }"
                 @click="changeLevel(key)"
        >
          {{ level.label }}
        </SButton>
      </div>
      <div class="s-table-stats">
        <SStat class="s-table-stats-item" title="Уровень сложности:">{{ chosenLevel.label }}</SStat>
        <SStat class="s-table-stats-item" title="Ходов:">{{ moves }}</SStat>
        <SStat class="s-table-stats-item" title="Осталось карточек:">{{ remainingCards }}</SStat>
        <SStat class="s-table-stats-item" title="Время:">{{ formattedTime }}</SStat>
      </div>
      <div class="s-table-game" :style="gridStyle">
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
import {computed, onMounted, ref, watch} from 'vue'
import Card from '@/components/Card.vue'
import {SButton, SStat} from "startup-ui";

const levels = {
  beginner: {
    cards: 12,
    label: 'Новичок'
  },
  intermediate: {
    cards: 24,
    label: 'Средний'
  },
  expert: {
    cards: 36,
    label: 'Эксперт'
  }
}

//stats
const moves = ref(0)
const time = ref(0)
let timerId = null

const cards = ref([])
const firstCard = ref(null)
const secondCard = ref(null)
const lockBoard = ref(false)

const chosenLevelKey = ref('expert')
const chosenLevel = computed(() => levels[chosenLevelKey.value])

onMounted(() => {
  initGame()
})


function changeLevel(levelKey) {
  if (chosenLevelKey.value === levelKey) return

  chosenLevelKey.value = levelKey
  initGame()
}


function initGame() {
  const pairs = chosenLevel.value.cards / 2
  let id = 1
  const numbers = []

  moves.value = 0
  time.value = 0
  stopTimer()

  firstCard.value = null
  secondCard.value = null
  lockBoard.value = false

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

  startTimer()
  card.flipped = true

  if (!firstCard.value) {
    firstCard.value = card
    moves.value++

    return
  }

  moves.value++

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


function startTimer() {
  if (timerId) return

  timerId = setInterval(() => {
    time.value++
  }, 1000)
}

function stopTimer() {
  clearInterval(timerId)
  timerId = null
}

const remainingCards = computed(() => {
  return cards.value.filter(card => !card.matched).length
})

const formattedTime = computed(() => {
  const minutes = Math.floor(time.value / 60)
  const seconds = time.value % 60
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
})

watch(remainingCards, value => {
  if (value === 0 && cards.value.length) {
    stopTimer()
  }
})

const gridStyle = computed(() => {
  const total = chosenLevel.value.cards

  if (total === 12) {
    return {
      gridTemplateColumns: 'repeat(4, 1fr)',
      gridTemplateRows: 'repeat(3, 1fr)',
    }
  }

  if (total === 24) {
    return {
      gridTemplateColumns: 'repeat(6, 1fr)',
      gridTemplateRows: 'repeat(4, 1fr)',
    }
  }

  // 36 (эксперт)
  return {
    gridTemplateColumns: 'repeat(6, 1fr)',
    gridTemplateRows: 'repeat(6, 1fr)',
  }
})

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

    &-levels {
      display: flex;
      gap: 10px;
    }

    &-stats {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      max-width: 600px;

      &-item {
        width: 100%;
        max-width: 270px;
        padding: 10px;
        border: 1px solid var(--s-black);
        border-radius: 5px;
        margin-bottom: 0;
      }
    }

    &-game {
      padding: 10px;
      max-width: 600px;
      width: 100%;
      height: 600px;
      border-radius: 5px;
      background: var(--s-green);
      display: grid;
      grid-gap: 10px;
    }
  }
}
</style>

<template>
  <div
      class="s-flying-ship"
      :class="state"
      :style="style"
      @click="refuel"
  >
    <img :src="`../../public/assets/img/${currentImage}`"/>

    <div class="s-fuel-bar">
      <div class="s-fuel" :style="{ width: fuelPercent + '%' }"/>
    </div>
  </div>
</template>

<script setup>
import {computed, onMounted, onUnmounted, ref} from 'vue'

const props = defineProps({
  ship: Object
})

//position
const x = ref(window.innerWidth / 2 - 100)
const y = ref(window.innerHeight + 150)

const flightSpeed = computed(() => props.ship.speed * 0.15)


//fuel
const fuel = ref(props.ship.fuel)
const maxFuel = props.ship.maxFuel
const speed = props.ship.speed
const fuelBurnRate = computed(() => speed * 0.05)
let fuelInterval = null
let moveInterval = null


const fuelPercent = computed(() =>
    Math.max((fuel.value / maxFuel) * 100, 0)
)
const state = ref('flying')


const style = computed(() => ({
  transform: `translate(${x.value}px, ${y.value}px)`
}))


const images = {
  flying: props.ship.image,
  crashed: 'crashed_' + props.ship.image,
}


const currentImage = computed(() =>
    state.value === 'crashed' || state.value === 'falling'
        ? images.crashed
        : images.flying
)


/* ЗАПУСК */
onMounted(() => {
  moveInterval = setInterval(() => {
    if (state.value === 'crashed') return

    y.value -= flightSpeed.value

    // улетел за экран — можно убрать
    if (y.value < -300) {
      clearInterval(moveInterval)
    }
  }, 16) // ~60fps

  fuelInterval = setInterval(burnFuel, 100)
})

onUnmounted(() => {
  clearInterval(moveInterval)
  clearInterval(fuelInterval)
})

//burnfuel
const burnFuel = () => {
  if (state.value === 'crashed') return

  fuel.value -= fuelBurnRate.value

  if (fuel.value <= 0) {
    fuel.value = 0
    crash()
  } else if (fuelPercent.value <= 10) {
    state.value = 'lowFuel'
    y.value += 0.8
  }
}


/* ЗАПРАВКА */
const refuel = () => {
  if (state.value === 'crashed') return

  fuel.value = Math.min(fuel.value + maxFuel * 0.3, maxFuel)
  state.value = 'flying'
}

//falling
const crash = () => {
  state.value = 'falling'
  clearInterval(fuelInterval)
  clearInterval(moveInterval)

  const fall = setInterval(() => {
    y.value += 14

    if (y.value > window.innerHeight) {
      clearInterval(fall)
      state.value = 'crashed'
      emit('crashed')
    }
  }, 40)
}

const emit = defineEmits(['crashed'])

</script>

<style scoped>
.s-flying-ship {
  position: fixed;
  left: 0;
  top: 0;
  cursor: pointer;

  img {
    width: 120px;
  }

  &.lowFuel {
    animation: shake 0.4s infinite;
    position: relative;
  }

  .s-fuel-bar {
    width: 120px;
    height: 6px;
    background: rgba(255, 255, 255, 0.3);
    margin-top: 6px;
  }

  .s-fuel {
    height: 100%;
    background: lime;
    transition: width 0.2s;
  }
}


@keyframes shake {
  0% {
    top: 0;
  }
  50% {
    top: 4px;
  }
  100% {
    top: 0;
  }
}
</style>

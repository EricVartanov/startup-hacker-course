<template>
  <div class="app-wrapper">
    <div v-if="isLive" class="live-text">
      В эфире
    </div>

    <Countdown
        v-else
        :deadlineISO="deadline"
        :labels="labels"
        :showLabels="true"
    />
  </div>
</template>

<script setup>
import {computed, onMounted, onUnmounted, ref} from 'vue'
import {Countdown} from 'vue3-flip-countdown'

// const deadline = '2026-02-01 00:00:00'

const deadline = new Date(Date.now() + 10000).toISOString()
const isLive = ref(false)

const remaining = ref({
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
})

let timerId

function pluralize(n, forms) {
  const t = Math.abs(n) % 100
  const r = t % 10
  if (t > 10 && t < 20) return forms[2]
  if (r > 1 && r < 5) return forms[1]
  if (r === 1) return forms[0]
  return forms[2]
}

function updateRemaining() {
  const now = new Date()
  const end = new Date(deadline)
  const diff = end - now

  if (diff <= 0) {
    isLive.value = true
    clearInterval(timerId)
    return
  }

  remaining.value.days = Math.floor(diff / (1000 * 60 * 60 * 24))
  remaining.value.hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
  remaining.value.minutes = Math.floor((diff / (1000 * 60)) % 60)
  remaining.value.seconds = Math.floor((diff / 1000) % 60)
}

const labels = computed(() => ({
  days: pluralize(remaining.value.days, ['День', 'Дня', 'Дней']),
  hours: pluralize(remaining.value.hours, ['Час', 'Часа', 'Часов']),
  minutes: pluralize(remaining.value.minutes, ['Минута', 'Минуты', 'Минут']),
  seconds: pluralize(remaining.value.seconds, ['Секунда', 'Секунды', 'Секунд']),
}))

onMounted(() => {
  updateRemaining()
  timerId = setInterval(updateRemaining, 1000)
})

onUnmounted(() => {
  clearInterval(timerId)
})
</script>

<style scoped>
.app-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-family: sans-serif;
}

.live-text {
  font-size: 48px;
  font-weight: 700;
  color: red;
  text-transform: uppercase;
  font-family: sans-serif;
}
</style>

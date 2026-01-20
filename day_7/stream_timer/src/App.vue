<template>
  <div class="s-app-wrapper">
    <div class="s-timerbox">
      <Transition name="bounce" mode="out-in" appear>
        <TimerHeader
            :key="isTimeOver"
            :title="isTimeOver ? 'В Эфире' : 'Будем в эфире через'"
            :isTimeOver="isTimeOver"
        />
      </Transition>
      <div v-show="!isTimeOver" class="s-timerbox-display">
        <TimerSegment
            v-for="(number, key) in formattedTime"
            :key="key"
            :number="number"
            :label="pluralize(number, labels[key])"
        />
      </div>
      <div v-show="isTimeOver">
        <iframe
            width="320"
            height="200"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1&start=43"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen>
        </iframe>
      </div>
    </div>
  </div>
</template>

<script setup>
import {computed, onMounted, onUnmounted, ref} from "vue";
import TimerHeader from "@/components/TimerHeader.vue";
import TimerSegment from "@/components/TimerSegment.vue";


// seconds remaining
const remaining = ref(3);

let timer = null;

const stopTimer = () => {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
};

onMounted(() => {
  timer = setInterval(() => {
    if (remaining.value > 0) {
      remaining.value--;
    } else {
      stopTimer();
    }
  }, 1000);
});

onUnmounted(stopTimer);

const isTimeOver = computed(() => remaining.value <= 0);

const formattedTime = computed(() => {
  const total = Math.max(remaining.value, 0);

  return {
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
  };
});

const labels = {
  days: ["День", "Дня", "Дней"],
  hours: ["Час", "Часа", "Часов"],
  minutes: ["Минуту", "Минуты", "Минут"],
  seconds: ["Секунду", "Секунды", "Секунд"],
};

const pluralize = (value, forms) => {
  const n = Math.abs(value) % 100;
  const n1 = n % 10;

  if (n > 10 && n < 20) return forms[2];
  if (n1 === 1) return forms[0];
  if (n1 > 1 && n1 < 5) return forms[1];
  return forms[2];
};
</script>

<style scoped lang="scss">
.s-app-wrapper {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .s-timerbox {
    max-width: 450px;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 20px;
    border: 1px solid rgb(58, 58, 58);
    border-radius: 6px;
    text-align: center;
    background: #769cea;
    box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.42);

    &-display {
      display: flex;
      justify-content: center;
      gap: 10px;
    }
  }
}

.bounce-enter-active,
.bounce-leave-active {
  animation: bounce 0.2s ease;
}

.bounce-leave-active {
  animation-direction: reverse;
}

.bounce-enter-from,
.bounce-leave-to {
  opacity: 0;
}

@keyframes bounce {
  0% {
    transform: scale(0.8);
    opacity: 0;
  }
  100% {
    transform: scale(1);
  }
}
</style>

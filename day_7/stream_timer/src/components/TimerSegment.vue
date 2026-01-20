<template>
  <div class="s-timesegment">
    <div class="s-timesegment-datawrapper">
      <div class="s-timesegment-number-wrapper">
        <Transition name="s-slide-down" mode="out-in">
          <span :key="number" class="s-number">{{ number }}</span>
        </Transition>
      </div>
      <span class="s-label">{{ label }}</span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  label: String,
  number: Number
});
</script>

<style scoped lang="scss">
.s-timesegment {
  &-datawrapper {
    display: flex;
    flex-direction: column;
    gap: 5px;
    align-items: center;
  }

  &-number-wrapper {
    background-color: var(--s-gray);
    padding: 5px;
    border-radius: 6px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 70px;
    overflow: hidden;
  }

  .s-number {
    font-size: 32px;
  }

  .s-label {
    font-size: 16px;
  }
}

/* Slide-down transition */
.s-slide-down-enter-active,
.s-slide-down-leave-active {
  transition: all 0.25s ease;
}

.s-slide-down-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.s-slide-down-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.s-slide-down-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.s-slide-down-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>

<template>
  <div
      class="s-timerheader"
  >
    <h1 class="s-timerheader-title" :class="{ 's-timerheader-title_active': isTimeOver }">{{ title }}</h1>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  isTimeOver: Boolean
})
</script>

<style scoped lang="scss">
.s-timerheader {
  margin-bottom: 20px;

  &-title {
    display: inline-block;

    &_active {
      color: red;
      position: relative;

      &:before {
        content: "";
        position: absolute;
        right: -7px;
        top: 0;
        width: 10px;
        border-radius: 50%;
        height: 10px;
        background-color: red;
        animation: flash 1s linear infinite;
      }

      @keyframes flash {
        0%,
        100% {
          opacity: 1;
        }
        50% {
          opacity: 0;
        }
      }
    }
  }
}
</style>

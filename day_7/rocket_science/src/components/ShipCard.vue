<template>
  <div
      class="s-ship-card"
      :class="{ crashed: ship.crashed }"
  >
    <div class="s-ship-card-image">
      <img :src="imageSrc">
    </div>
    <div class="s-ship-card-info">
      <SStat title="Имя:">
        {{ ship.name || '—' }}
      </SStat>
      <SStat title="Топливо:">
        {{ ship.maxFuel }}
      </SStat>
      <SStat title="Скорость:">
        {{ ship.speed }}
      </SStat>
    </div>
  </div>
</template>

<script setup>
import {computed} from 'vue'
import {SStat} from 'startup-ui'

const props = defineProps({
  ship: Object
})

const imageSrc = computed(() => {
  if (props.ship.crashed) {
    return `../../public/assets/img/crashed_${props.ship.image}`
  }
  return `../../public/assets/img/${props.ship.image}`
})
</script>

<style>
.s-ship-card {
  cursor: pointer;
  width: 40%;
  max-width: 120px;
  max-height: 200px;
  z-index: 10;
  border-radius: 5px;
  border: 1px solid rgba(204, 204, 204, 0.4);
  padding: 5px;

  &.crashed {
    pointer-events: none;
    opacity: 0.4;
    filter: grayscale(1);
    transform: none !important;
    box-shadow: none !important;

    &:hover {
      transform: none;
      box-shadow: none;
    }
  }

  &:hover {
    transition: all 0.3s ease;
    transform: scale(1.05);
    border: 1px solid rgba(204, 204, 204, 0.8);
    box-shadow: 0 0 10px 5px rgb(228, 226, 223);
  }

  &:hover .s-ship-card-info .s-stat {
    transition: all 0.3s ease;
    opacity: 0.8;
  }

  .s-ship-card-image {
    width: 100%;
    display: block;
    height: auto;

    img {
      width: 100%;
    }
  }

  .s-ship-card-info {
    padding: 5px;
    display: flex;
    flex-direction: column;
    gap: 5px;

    .s-stat {
      opacity: 0.6;
      margin: 0;
      flex-wrap: nowrap;
      gap: 10px;
      color: var(--s-white);
      font-size: 12px;
    }
  }
}
</style>
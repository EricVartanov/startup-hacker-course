<template>
  <div class="s-sidebar">
    <div class="s-sidebar-header">
      <h1 class="s-sidebar-header-title">Выбери корабль</h1>
    </div>
    <div class="s-sidebar-stats">
      <SStat title="Кораблей в строю:">
        {{ activeCount }}
      </SStat>
      <SStat title="Кораблей разбито:">
        {{ crashedCount }}
      </SStat>
      <SStat title="Запусков:">
        {{ launchCount }}
      </SStat>
    </div>
    <div class="s-sidebar-content">
      <slot/>
    </div>
  </div>
</template>

<script setup>
import {SStat} from "startup-ui";

const props = defineProps({
  activeCount: Number,
  crashedCount: Number,
  launchCount: Number
})
</script>

<style>
.s-sidebar {
  position: fixed;
  padding: 10px;
  top: 0;
  left: 0;
  bottom: 0;
  width: 260px;
  height: 100%;
  background: linear-gradient(0deg, rgba(2, 0, 36, 0.8) 0%, rgba(9, 9, 121, 0.8) 35%, rgba(213, 0, 255, 0.8) 100%);
  border-bottom-right-radius: 10px;
  border-top-right-radius: 10px;

  .s-sidebar-header {
    padding: 15px 20px;

    .s-sidebar-header-title {
      margin: 0;
      color: var(--s-gray);
      font-size: 20px;
      text-align: center;
    }
  }

  .s-sidebar-stats {
    padding: 15px;
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

  .s-sidebar-content {
    padding: 20px 10px;
    overflow: auto;
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    margin-top: 20px;
    justify-content: center;
    align-items: center;
  }
}
</style>
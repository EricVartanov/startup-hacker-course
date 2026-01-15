<script setup>

const emit = defineEmits(['close'])

</script>

<template>
  <div class="overlay" @click.self="emit('close')">
    <div class="modal-content">
      <h2>
        <slot name="title">
          Добавить книгу
        </slot>
      </h2>
      <slot />
    </div>
  </div>
</template>


<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,.4);
  display: flex;
  align-items: center;
  justify-content: center;

  h2{
    text-align: center;
    font-family: sans-serif;
    margin-bottom: 20px;
  }

  .modal-content {
    background: #fff;
    padding: 16px;
    max-width: 500px;
    border-radius: 12px;
  }
}
</style>
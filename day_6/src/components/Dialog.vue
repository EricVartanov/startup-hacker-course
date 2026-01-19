<script setup>
const props = defineProps({
  isModalOpen: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['close'])
</script>

<template>
  <Transition name="fade">
    <div
        v-show="isModalOpen"
        class="dialog-overlay"
        @click.self="$emit('close')"
    >
      <Transition name="fade-slide">
        <div
            v-show="isModalOpen"
            class="dialog"
        >
          <h2 class="dialog-header">
            <slot name="title"/>
          </h2>

          <div class="dialog-content">
            <slot/>
          </div>
        </div>
      </Transition>
    </div>
  </Transition>
</template>


<style>
.dialog-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.dialog {
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  width: 100%;
  max-width: 420px;
}

.dialog-header {
  text-align: center;
  font-family: sans-serif;
  margin-bottom: 20px;
}


.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 0.5s ease,
  transform 0.5s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(100px);
}

.fade-slide-enter-to,
.fade-slide-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
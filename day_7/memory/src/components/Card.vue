<template>
  <div class="s-card-wrapper" @click="handleClick">
    <div
        class="s-card"
        :class="{ flipped, matched }"
    >
      <div class="s-card-face s-card-face_front">?</div>
      <div class="s-card-face s-card-face_back">
        {{ number }}
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  number: Number,
  flipped: Boolean,
  disabled: Boolean,
  matched: Boolean
})

const emit = defineEmits(['click'])

function handleClick() {
  if (!props.disabled && !props.matched) {
    emit('click')
  }
}
</script>


<style lang="scss">
.s-card-wrapper {
  perspective: 800px;
  cursor: pointer;
}

.s-card {
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.4s ease,
  opacity 0.4s ease;

  &.flipped {
    transform: rotateY(180deg);
  }

  &.matched {
    opacity: 0;
    pointer-events: none;
    transition: transform 0.6s ease,
    opacity 0.4s ease 0.6s;
  }

  &-face {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    font-size: 2rem;
    //backface-visibility: hidden;

    &_front {
      background: var(--s-yellow);
    }

    &_back {
      background: #444;
      color: white;
      transform: rotateY(180deg);
    }
  }
}
</style>

<script setup>
import {computed, ref} from "vue";

const emit = defineEmits(['edit', 'delete'])

const props = defineProps({
  book: Object,
  genreList: Array,
})

const genreLabels = computed(() => {
  const map = {}
  for (const genre of props.genreList) {
    map[genre.value] = genre.label
  }
  return props.book.genre.map(v => map[v]).join(', ')
})

const currentRating = computed(() => props.book.rating ?? 0)
const userRating = ref(0)
const hoverRating = ref(0)

const rated = computed(() => userRating.value >= 1)
const setRating = (value) => {
  if (rated.value) return
  userRating.value = value
  console.log('User rating:', value)
}

</script>

<template>
  <div class="card">
    <div
        class="cover"
        :style="{ backgroundImage: `url(./assets/img/webp/${book.cover}.webp)` }"
    >
      <img class="adult" v-show="book.adult" src="/assets/img/png/adult18.png" alt="adult" />

      <div class="rating-wrapper">
        <FontAwesomeIcon
            class="rating-star"
            :icon="['fas', 'star']"
        />
        <span class="rating"> {{ currentRating }} </span>
      </div>
    </div>
    <div class="content">
      <h3 class="title">
        {{ book.title }}
      </h3>
      <div class="genre">
        {{ genreLabels }}
      </div>
      <p class="description">
        {{ book.description }}
      </p>
      <div class="stars">
        <FontAwesomeIcon
            v-for="i in 5"
            :key="i"
            :class="['star', { active: i <= (userRating || hoverRating) }, {disabled: rated}]"
            :icon="['fas', 'star']"
            @mouseenter="!userRating && (hoverRating = i)"
            @mouseleave="!userRating && (hoverRating = 0)"
            @click="setRating(i)"
        />
      </div>
      <div class="actions">
        <FontAwesomeIcon
            class="edit-btn"
            :icon="['fas', 'edit']"
            @click.stop="emit('edit')"
        />
        <FontAwesomeIcon
            class="del-btn"
            :icon="['fas', 'trash']"
            @click.stop="emit('delete')"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  width: 220px;
  min-height: 330px;
  padding: 16px;
  border-radius: 16px;
  background: #fff;
  box-shadow: 0 10px 30px rgba(0,0,0,.08);
  cursor: pointer;

  .cover {
    width: 100%;
    height: 250px;
    border-radius: 12px;
    background-size: cover;
    background-position: top center;
    margin-bottom: 12px;
    background-repeat: no-repeat;
    position: relative;

    .adult {
      width: 30px;
      height: 30px;
      position: absolute;
      top: -10px;
      right: -10px;
    }

    .rating-wrapper {
      position: absolute;
      top: -15px;
      left: -15px;
      width: 35px;
      height: 35px;
    }

    .rating-star{
      width: 35px;
      height: 35px;
      color: #FFD700;
    }

    .rating {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      font-family: sans-serif;
      font-size: 10px;
      font-weight: bold;
      color: #212121;
    }
  }

  &:hover {
    transition: all 0.3s;
    box-shadow: 0 3px 30px rgba(118, 156, 234, 0.61);
  }

  .content {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-start;
    position: relative;

    .title {
      font-family: sans-serif;
      font-size: 18px;
      color: #212121;
      margin: 0;
    }

    .description {
      margin: 0;
      margin-top: 10px;
      font-size: 14px;
      color: #757575;
      font-family: 'roboto';
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .genre {
      padding: 2px 4px;
      margin-top: 10px;
      display: inline-block;
      font-size: 10px;
      color: #2474f6;
      border-radius: 12px;
      font-family: sans-serif;
      background: rgba(118, 156, 234, 0.56);
      border: 1px solid #2474f6;

    }

    .stars {
      display: flex;
      gap: 6px;
      margin-top: 10px;

      .star {
        font-size: 18px;
        color: #c3c3c3;
        cursor: pointer;
        transition: color 0.2s ease;

        &.active {
          color: #FFD700;
        }

        &.disabled {
          cursor: not-allowed;
        }
      }
    }

    .actions {
      position: absolute;
      bottom: 0;
      right: 0;
      display: flex;
      gap: 5px;
      border-left: 1px solid rgba(78, 78, 78, 0.51);
      padding-left: 3px;

      .edit-btn {
        color: #769cea;
        cursor: pointer;

        &:hover {
          transition: color 0.2s ease;
          color: #2474f6;
        }
      }

      .del-btn {
        color: rgba(246, 36, 36, 0.52);
        cursor: pointer;

        &:hover {
          transition: color 0.2s ease;
          color: #f62424;
        }
      }
    }
  }
}
</style>
<script setup>
  import {computed} from "vue";

  const { book } = defineProps({
    book: {
      type: Object,
    }
  })

  const ratingPercent = computed(() => {
    return `${(book.rating / 5) * 100}%`
  })
</script>

<template>
 <div class="card">
   <div
       class="cover"
       :style="{ backgroundImage: `url(./assets/img/webp/${book.cover}.webp)` }"
   >
    <img class="adult" v-show="book.adult" src="/assets/img/png/adult18.png" alt="adult" />
   </div>
  <div class="content">
    <h3 class="title">
      {{ book.title }}
    </h3>
    <div class="genre">
      {{ book.genre }}
    </div>
    <p class="description">
      {{ book.description }}
    </p>
    <div class="rating">
      <div class="stars-bg">★★★★★</div>
      <div class="stars-fill" :style="{ width: ratingPercent }">★★★★★</div>
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
        height: 150px;
        border-radius: 12px;
        background-size: cover;
        background-position: top;
        margin-bottom: 12px;
        transition: height 0.3s;
        position: relative;

        .adult {
          width: 30px;
          height: 30px;
          position: absolute;
          top: -10px;
          right: -10px;
        }
      }

      &:hover .cover{
        transition: all 0.5s;
        height: 300px;
      }

      .content {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: flex-start;

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
          background: #769cea;
          border: 1px solid #2474f6;

        }

        .rating {
          position: relative;
          display: inline-block;
          font-size: 12px;
          line-height: 1;
          margin-top: 10px;

          .stars-bg {
            color: #ddd;
          }

          .stars-fill {
            color: gold;
            position: absolute;
            top: 0;
            left: 0;
            white-space: nowrap;
            overflow: hidden;
            pointer-events: none;
          }
        }
      }
    }
</style>
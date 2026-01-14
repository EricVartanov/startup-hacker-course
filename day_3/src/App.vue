<template>
  <div class="app">
    <!--<FontAwesomeIcon icon="star" />-->
    <div class="container">
      <Card v-for="book in books" :key="book.title" :book="book" />
    </div>
  </div>
</template>
<script setup>
import {ref} from "vue";
import Card from "@/components/Card.vue";

const books = ref([
  {
    title: 'Метро 2033',
    description: 'Постапокалиптический роман о выживании людей в московском метро после ядерной войны.',
    genre: 'Постапокалипсис',
    cover: 'metro2033',
    adult: true,
    rating: 4.7
  },
  {
    title: 'Мастер и Маргарита',
    description: 'Мистический роман о добре и зле, любви и дьяволе в Москве 1930-х годов.',
    genre: 'Роман, мистика',
    cover: 'master_margarete',
    adult: false,
    rating: 4.9
  },
  {
    title: 'American Psycho',
    description: 'Психологический триллер о двойной жизни успешного финансиста и серийного убийцы.',
    genre: 'Триллер',
    cover: 'american_psyho',
    adult: true,
    rating: 4.2
  },
  {
    title: 'Игра престолов',
    description: 'В мире Вестероса переплетаются политика, предательство, магия и судьбы множества героев. Книги известны своей реалистичностью, неожиданными поворотами и глубокой проработкой персонажей.',
    genre: 'Фэнтези',
    cover: 'game_of_thrones',
    adult: true,
    rating: 4.7
  }
])
</script>


<style scoped>
 * {
   box-sizing: border-box;
 }

 body {
   background-color: rgb(228, 226, 223);
 }

 .container {
   padding: 20px;
   display: flex;
   flex-wrap: wrap;
   justify-content: center;
   align-items: flex-start;
   gap: 20px;
 }
</style>
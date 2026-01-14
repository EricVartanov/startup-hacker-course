<template>
  <div class="app">
    <div class="container">
      <button @click="isModalOpen = true" class="button">Добавить</button>
      <div class="catalog">
        <Card v-for="book in books" :key="book.title" :item="book" />
      </div>
    </div>
    <div v-if="isModalOpen" class="modal">
      <div class="modal-content">
        <h2>Добавить книгу</h2>

        <input
            v-model="form.title"
            placeholder="Название"
        />

        <textarea
            v-model="form.description"
            placeholder="Описание"
        ></textarea>

        <input
            v-model="form.cover"
            placeholder="Обложка (имя файла или URL)"
        />

        <select v-model="form.genre" multiple>
          <option
              v-for="genre in genresList"
              :key="genre.value"
              :value="genre.value"
          >
            {{ genre.label }}
          </option>
        </select>

        <label class="checkbox">
          <input type="checkbox" v-model="form.adult" />
          18+
        </label>

        <div class="actions">
          <button class="submit-btn" @click="submitForm">Сохранить</button>
          <button class="cancel-btn" @click="isModalOpen = false">Отмена</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import {ref, watch} from "vue";
import Card from "@/components/Card.vue";

const isModalOpen = ref(false);
const genresList = [
  { value: 'fantasy', label: 'Фэнтези' },
  { value: 'drama', label: 'Драма' },
  { value: 'romance', label: 'Роман' },
  { value: 'horror', label: 'Хоррор' },
  { value: 'thriller', label: 'Триллер' },
  { value: 'postapocalypse', label: 'Постапокалипсис' },
  { value: 'mystic', label: 'Мистика' },
]

const form = ref({
  title: '',
  description: '',
  cover: '',
  genre: [],
  adult: false,
})

const submitForm = () => {
  console.log('New book:', form.value)
  resetForm()
  isModalOpen.value = false
}

const resetForm = () => {
  form.value = {
    title: '',
    description: '',
    cover: '',
    genre: [],
    adult: false,
  }
}


watch(isModalOpen, (open) => {
  document.body.style.overflow = open ? 'hidden' : ''
})

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
   max-width: 1200px;
   margin: 0 auto;

   .button {
     display: block;
     margin: 0 auto;
     margin-top: 20px;
     padding: 10px 20px;
     border-radius: 5px;
     background-color: #2474F6;
     color: #ffffff;
     cursor: pointer;
     border: 1px solid #ffffff;

     &:hover {
       transition: 0.3s;
       background-color: #ffffff;
       color: #2474F6;
       border: 1px solid #2474F6;
     }
   }

   .catalog {
     margin-top: 20px;
     border-top: 1px solid rgb(228, 226, 223);
     padding: 20px;
     display: flex;
     flex-wrap: wrap;
     justify-content: center;
     align-items: flex-start;
     gap: 20px;
   }
 }

 .modal {
   position: fixed;
   inset: 0;
   background: rgba(0,0,0,.4);
   display: flex;
   align-items: center;
   justify-content: center;

   h2{
     text-align: center;
     font-family: sans-serif;
   }
 }

 .modal-content {
   width: 420px;
   background: #fff;
   padding: 16px;
   border-radius: 12px;
   display: flex;
   flex-direction: column;
   gap: 10px;
 }

 .modal-content input,
 .modal-content textarea,
 .modal-content select {
   width: 100%;
   padding: 6px;
   border-radius: 6px;
   border: 1px solid #ccc;
 }

 .checkbox {
   display: flex;
   cursor: pointer;
   flex-direction: row-reverse;
   align-items: center;
   justify-content: flex-end;
   max-width: 100px;

   input {
     cursor: pointer;
     width: 20px;
   }
 }

 .actions {
   display: flex;
   margin-top: 20px;
   justify-content: space-between;

   button {
     display: block;
     padding: 8px 20px;
     border-radius: 5px;
     cursor: pointer;
     color: #ffffff;
     border: 1px solid #ffffff;

     &:hover {
       transition: 0.3s;
       opacity: 0.8;
     }
   }

   .submit-btn {
     background-color: #2474F6;
   }

   .cancel-btn {
     background-color: #f62424;
   }
 }
</style>
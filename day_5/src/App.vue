<template>
  <div class="app">
    <div class="container">
      <div class="menu">
        <div class="buttons">
          <button class="button" @click="openAdd">
            Добавить
          </button>
          <button class="button" @click="resetAllRatings">Сбросить весь рейтинг</button>
        </div>
        <div class="statistic">
          <span>
            Всего книг: <span class="value"> {{ books.length }} </span>
          </span>
          <span>
            Средний рейтинг: <span class="value"> {{ averageRating }} </span>
          </span>
        </div>
      </div>
      <div class="catalog">
        <BookCard
            v-for="(book, index) in books"
            :key="book.title"
            :book
            :genreList="genresList"
            @edit="openEdit(index)"
            @delete="handleDeleteBook"
        />
      </div>
    </div>

    <Dialog
        v-if="isAddOpen || isEditOpen"
        @close="closeModal"
    >
      <template #title>
        {{ isAddOpen ? 'Добавить книгу' : 'Редактировать книгу' }}
      </template>

      <BookForm
          v-model="formBook"
          :genresList="genresList"
          @submit="handleSubmit"
          @cancel="closeModal"
      />
    </Dialog>
  </div>
</template>
<script setup>
import {computed, ref} from "vue";
import BookCard from "@/components/BookCard.vue";
import Dialog from "@/components/Dialog.vue";
import BookForm from "@/components/BookForm.vue";

const isAddOpen = ref(false)
const isEditOpen = ref(false)
const editedIndex = ref(null)

const genresList = [
  { value: 'fantasy', label: 'Фэнтези' },
  { value: 'drama', label: 'Драма' },
  { value: 'romance', label: 'Роман' },
  { value: 'horror', label: 'Хоррор' },
  { value: 'thriller', label: 'Триллер' },
  { value: 'postapocalypse', label: 'Постапокалипсис' },
  { value: 'mystic', label: 'Мистика' },
]

const resetAllRatings = () => {
  books.value = books.value.map(book => ({
    ...book,
    rating: 0
  }))
}

const averageRating = computed(
    function () {
      return (books.value.reduce((acc, book) => acc + book.rating, 0) / books.value.length).toFixed(2);
    }
)

const modalType = computed(() =>
    isAddOpen.value ? 'add' : 'edit'
)

const formBook = ref(getEmptyBook())

function getEmptyBook() {
  return {
    title: '',
    description: '',
    genre: [],
    cover: '',
    adult: false
  }
}

const openAdd = () => {
  formBook.value = getEmptyBook()
  isAddOpen.value = true
}

const openEdit = (index) => {
  editedIndex.value = index
  formBook.value = { ...books.value[index] }
  isEditOpen.value = true
}

const closeModal = () => {
  isAddOpen.value = false
  isEditOpen.value = false
  editedIndex.value = null
  formBook.value = getEmptyBook()
}

const handleSubmit = (book) => {
  if (modalType.value === 'add') {
    books.value.push({
      ...book,
      rating: 0
    })
  } else {
    books.value[editedIndex.value] = {
      ...books.value[editedIndex.value],
      ...book
    }
  }

  closeModal()
}

const handleDeleteBook = () => {
  books.value.splice(editedIndex.value, 1)
  editedIndex.value = null
}

const books = ref([
  {
    title: 'Метро 2033',
    description: 'Постапокалиптический роман о выживании людей в московском метро после ядерной войны.',
    genre: ['postapocalypse'],
    cover: 'metro2033',
    adult: true,
    rating: 4.7
  },
  {
    title: 'Мастер и Маргарита',
    description: 'Мистический роман о добре и зле, любви и дьяволе в Москве 1930-х годов.',
    genre: ['romance', 'mystic'],
    cover: 'master_margarete',
    adult: false,
    rating: 4.9
  },
  {
    title: 'American Psycho',
    description: 'Психологический триллер о двойной жизни успешного финансиста и серийного убийцы.',
    genre: ['thriller'],
    cover: 'american_psyho',
    adult: true,
    rating: 4.2
  },
  {
    title: 'Игра престолов',
    description: 'В мире Вестероса переплетаются политика, предательство, магия и судьбы множества героев. Книги известны своей реалистичностью, неожиданными поворотами и глубокой проработкой персонажей.',
    genre: ['fantasy'],
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

  .menu {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 50px;

    .buttons {
      display: flex;
      gap: 20px;

      .button {
        cursor: pointer;
        display: block;
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
    }

    .statistic {
      border-left: 1px solid #282C34;
      padding-left: 10px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      font-size: 14px;
      color: #282C34;
      font-family: sans-serif;

      .value {
        font-weight: bold;
        color: #2474F6;
      }
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
</style>
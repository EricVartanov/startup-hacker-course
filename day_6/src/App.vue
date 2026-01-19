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
            v-for="(book) in books"
            :key="book.id"
            :book
            :genreList="genresList"
            @edit="handleEditBook"
            @delete="handleDeleteBook"
        />
      </div>
    </div>
    <Dialog
        :isModalOpen="isModalOpen"
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
import data from './books.json'

const isAddOpen = ref(false)
const isEditOpen = ref(false)
const books = ref(data);

const genresList = [
  {value: 'fantasy', label: 'Фэнтези'},
  {value: 'drama', label: 'Драма'},
  {value: 'romance', label: 'Роман'},
  {value: 'horror', label: 'Хоррор'},
  {value: 'thriller', label: 'Триллер'},
  {value: 'postapocalypse', label: 'Постапокалипсис'},
  {value: 'mystic', label: 'Мистика'},
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

const isModalOpen = computed(() => isAddOpen.value || isEditOpen.value)

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

const handleEditBook = (id) => {
  const book = books.value.find(book => book.id === id)
  formBook.value = {...book}
  isEditOpen.value = true
}

const closeModal = () => {
  isAddOpen.value = false
  isEditOpen.value = false
}

const handleSubmit = (data) => { //todo переделать после бэка
  if (modalType.value === 'add') {
    books.value.push({
      ...data,
      id: Date.now(), // на время
      rating: 0
    })
  } else {
    books.value = books.value.map((book) => {
      if (book.id === data.id) {
        data.rating = book.rating;
        return data;
      }
      return book;
    });
  }

  closeModal()
}

const handleDeleteBook = (id) => {
  books.value = books.value.filter(book => book.id !== id)
}

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
<script setup>
import { ref } from 'vue'

const props = defineProps({
  genresList: Array
})

const emit = defineEmits(['close', 'submit'])

const form = ref({
  title: '',
  description: '',
  cover: '',
  genre: [],
  adult: false
})

const submit = () => {
  emit('submit', form.value)
  emit('close')
}
</script>

<template>
  <div class="modal">
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
        <button class="submit-btn" @click="submit">Сохранить</button>
        <button class="cancel-btn" @click="$emit('close')">Отмена</button>
      </div>
    </div>
  </div>

</template>

<style scoped>
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

  .modal-content {
    width: 420px;
    background: #fff;
    padding: 16px;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    gap: 10px;

    input,
    textarea,
    select {
      width: 100%;
      max-width: 400px;
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
  }
}
</style>
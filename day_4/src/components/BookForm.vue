<script setup>
import { reactive, watch} from 'vue'

const props = defineProps({
  modelValue: {
    type: Object,
    required: true
  },
  genresList: {
    type: Array,
    required: true
  }
})

const emit = defineEmits([
  'update:modelValue',
  'submit',
  'cancel'
])

const form = reactive({ ...props.modelValue })

watch(
    form,
    () => {
      emit('update:modelValue', { ...form })
    },
)

watch(
    () => props.modelValue,
    (value) => {
      Object.assign(form, value)
    }
)

const submit = () => {
  emit('submit', { ...form })
}

</script>


<template>
  <form class="form" @submit.prevent="submit">
    <input v-model="form.title" placeholder="Название" />

    <textarea v-model="form.description" placeholder="Описание" />

    <input v-model="form.cover" placeholder="Обложка" />

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
      <button class="cancel-btn" @click="$emit('cancel')">Отмена</button>
    </div>
  </form>
</template>


<style scoped>
h2{
  text-align: center;
  font-family: sans-serif;
}

.form {
  width: 420px;
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
</style>
<script setup>
import {computed, reactive, watch} from 'vue'
import Multiselect from "vue-multiselect";
import 'vue-multiselect/dist/vue-multiselect.css'

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

const selectedGenres = computed({
  get() {
    return props.genresList.filter(g =>
        form.genre.includes(g.value)
    )
  },
  set(values) {
    form.genre = values.map(v => v.value)
  }
})

watch(
    form,
    () => {
      emit('update:modelValue', { ...form })
    },
    { deep: true }
)

watch(
    () => props.modelValue,
    (value) => {
      Object.assign(form, value)
    },
    { deep: true }
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

    <multiselect
        v-model="selectedGenres"
        :options="genresList"
        track-by="value"
        label="label"
        :multiple="true"
        :close-on-select="false"
        placeholder="Выберите жанры"
        select-label=""
        deselect-label=""
        selected-label=""
        class="genre-multiselect"
    />

    <label class="checkbox">
      <input type="checkbox" v-model="form.adult" />
      18+
    </label>

    <div class="actions">
      <button class="submit-btn">Сохранить</button>
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
    padding: 2px 6px;
    border-radius: 6px;
    border: 1px solid #e8e8e8;
    height: 36px;
  }
  .checkbox {
    display: flex;
    cursor: pointer;
    flex-direction: row-reverse;
    align-items: center;
    justify-content: flex-end;
    max-width: 100px;
    font-weight: bold;
    font-size: 18px;

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

  .genre-multiselect {
    --accent: #2474f6;
  }

  .genre-multiselect :deep(.multiselect__tag),
  .genre-multiselect :deep(.multiselect__option--highlight) {
    background: var(--accent);
  }

}

</style>
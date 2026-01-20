<template>
  <SDialog
      :model-value="isModalOpen"
      @update:model-value="emit('update:isModalOpen', $event)"
      title="Дай имя своему кораблю"
      width="500px"
  >
    <SForm v-model="form" @submit="submit">
      <SFormRow title="Имя" name="name">
        <SInput v-model="form.name"/>
      </SFormRow>

      <SButton color="red">
        Запустить
      </SButton>
    </SForm>
  </SDialog>
</template>

<script setup>
import {reactive, watch} from 'vue'
import {SButton, SDialog, SForm, SFormRow, SInput} from 'startup-ui'

const props = defineProps({
  isModalOpen: Boolean,
  ship: Object
})

const emit = defineEmits(['update:isModalOpen', 'submit'])

const form = reactive({
  name: ''
})

watch(
    () => props.isModalOpen,
    (open) => {
      if (open && props.ship) {
        form.name = props.ship.name || ''
      }
    }
)

const submit = () => {
  emit('submit', {
    ...props.ship,
    name: form.name
  })

  emit('update:isModalOpen', false)
}
</script>


<style scoped>

</style>
<template>
  <div
      class="s-space-wrapper"
      style="background-image: url('../assets/img/bg.jpg')"
  >
    <div class="s-space-container">
      <Sidebar
          :active-count="activeShipsCount"
          :crashed-count="crashedShipsCount"
          :launch-count="launchCount"
      >
        <ShipCard
            v-for="ship in ships"
            :key="ship.id"
            :ship="ship"
            @click="openModal(ship)"
        />
      </Sidebar>
    </div>

    <Modal
        v-model:isModalOpen="isModalOpen"
        :ship="selectedShip"
        @submit="startFlight"
    />
    <FlyingShip
        v-if="flyingShip"
        :key="flyingShip.id"
        :ship="flyingShip"
        @crashed="onShipCrashed"
    />
  </div>
</template>

<script setup>
import {computed, ref} from 'vue'
import Sidebar from '@/components/Sidebar.vue'
import ShipCard from '@/components/ShipCard.vue'
import Modal from '@/components/Modal.vue'
import FlyingShip from "@/components/FlyingShip.vue";

const isModalOpen = ref(false)
const selectedShip = ref(null)
const flyingShip = ref(null)

const openModal = (ship) => {
  if (ship.crashed) return

  selectedShip.value = ship
  isModalOpen.value = true
}

const launchCount = ref(0)

const activeShipsCount = computed(() =>
    ships.value.filter(s => !s.crashed).length
)

const crashedShipsCount = computed(() =>
    ships.value.filter(s => s.crashed).length
)


const startFlight = (updatedShip) => {
  const ship = ships.value.find(s => s.id === updatedShip.id)
  if (ship) {
    ship.name = updatedShip.name
  }

  flyingShip.value = {
    ...ship,
    fuel: ship.maxFuel
  }

  launchCount.value++
}

const onShipCrashed = () => {
  const ship = ships.value.find(s => s.id === flyingShip.value.id)
  if (ship) {
    ship.crashed = true
  }

  flyingShip.value = null
  selectedShip.value = null
}


const ships = ref([
  {id: 1, name: '', image: 'ship1.png', maxFuel: 40, speed: 10, crashed: false},
  {id: 2, name: '', image: 'ship2.png', maxFuel: 30, speed: 10, crashed: false},
  {id: 3, name: '', image: 'ship3.png', maxFuel: 45, speed: 15, crashed: false},
  {id: 4, name: '', image: 'ship4.png', maxFuel: 35, speed: 10, crashed: false},
  {id: 5, name: '', image: 'ship5.png', maxFuel: 20, speed: 20, crashed: false}
])
</script>


<style lang="scss">
.s-space-wrapper {
  width: 100%;
  height: 100vh;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>

<template>
  <div class="app">
    <header class="header">
      <nav class="header-nav">
        <RouterLink class="header-nav-link" to="/">Домой</RouterLink>
        <RouterLink class="header-nav-link" to="/about-us">О Нас</RouterLink>
      </nav>
    </header>
    <main class="main">
      <RouterView/>
    </main>
    <footer>

    </footer>
  </div>
</template>
<script setup>


</script>


<style scoped>
* {
  box-sizing: border-box;
}

body {
  background-color: rgb(228, 226, 223);
  margin: 0 !important;
}

.header {
  padding: 1rem;
  border-bottom: 1px solid black;
  max-width: 1200px;

  .header-nav {
    display: flex;
    justify-content: flex-start;
    gap: 1rem;
    font-family: sans-serif;
    font-size: 1.2rem;
    padding: 0 3rem;

    .header-nav-link {
      text-decoration: none;
      color: rgb(36, 116, 246);

      &:hover {
        transition: 0.3s;
        color: rgb(18, 18, 18);
      }
    }
  }
}

.main {
  margin-top: 2rem;
}

</style>
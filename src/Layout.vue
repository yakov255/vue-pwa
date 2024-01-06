<script setup>
import mainPage from "@/pages/MainPage.vue";
import AppFooter from "@/components/AppFooter.vue";
</script>

<template>
  <div class="layout-wrapper">
    <app-topbar></app-topbar>
    <div class="layout-main-container">
      <div class="layout-main">
        <main-page></main-page>
      </div>
      <app-footer></app-footer>
    </div>
  </div>
</template>

<style scoped>
.layout-main-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  justify-content: space-between;
  padding: 7rem 2rem 2rem 4rem;
  transition: margin-left $transitionDuration;
}
</style>
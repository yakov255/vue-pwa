<template>
  <div class="layout-topbar">
    <div class="layout-topbar-logo">
      <img src="/img/logo-white.svg" alt="logo"/>
      <span>App</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.layout-topbar {
  position: fixed;
  height: 5rem;
  z-index: 997;
  left: 0;
  top: 0;
  width: 100%;
  padding: 0 2rem;
  background-color: var(--surface-card);
  transition: left $transitionDuration;
  display: flex;
  justify-content: center;
  box-shadow: 0px 3px 5px rgba(0, 0, 0, .02), 0px 0px 2px rgba(0, 0, 0, .05), 0px 1px 4px rgba(0, 0, 0, .08);

  .layout-topbar-logo {
    display: flex;
    align-items: center;
    color: var(--surface-900);
    font-size: 1.5rem;
    font-weight: 500;
    border-radius: 12px;
    width: auto;
    order: 2;

    img {
      height: 2.5rem;
      margin-right: .5rem;
    }

    &:focus {
      @include focused();
    }
  }
}
</style>
<script setup lang="ts">
</script>
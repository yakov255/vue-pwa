<template>
    <div class="layout-footer">
        <img src="/img/logo-white.svg" alt="Logo" height="20" class="mr-2" />
        by
        <span class="font-medium ml-2">PrimeVue</span>
    </div>
</template>
<style lang="scss" scoped>
.layout-footer {
  transition: margin-left $transitionDuration;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 1rem;
  border-top: 1px solid var(--surface-border);
}
</style>

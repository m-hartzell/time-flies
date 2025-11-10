<template>
  <header class="site-header">
    <section class="site-header__logo">
      <app-logo />
    </section>
    <section class="site-header__date">
      <time datetime="2024-02-24">2.24.2024</time>
    </section>
  </header>
</template>

<style scoped>
.site-header {
  display: flex;
  gap: 1rem;
  align-items: center;
  padding: 2rem;
}

.site-header__date {
  font-size: var(--font-size-xlarge);
  font-weight: bold;
  color: var(--color-neutral);
}
</style>

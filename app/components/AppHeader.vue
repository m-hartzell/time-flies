<script setup lang="ts">
import { inject } from 'vue';

const currentDate = inject<Ref<Date>>('currentDate');
const currentDateDisplay = computed(() => {
  if (!currentDate?.value) return '';
  return `${currentDate.value.getMonth() + 1}.${currentDate.value.getDate()}.${currentDate.value.getFullYear()}`;
});
</script>

<template>
  <header class="site-header">
    <section class="site-header__logo">
      <app-logo />
    </section>
    <section v-if="currentDate" class="site-header__date">
      <time :datetime="currentDate.toISOString().split('T')[0]">{{ currentDateDisplay }}</time>
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

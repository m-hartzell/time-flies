<script setup lang="ts">

const currentTask = reactive({
  time: '02:20:35',
  startTime: '09:31',
  category: 'Project',
  description: 'Donec orci arcu, hendrerit in tortor mollis, efficitur volutpat velit',
});

const currentTaskDateTime = computed(() => `PT${currentTask.time.replace(/:/g, 'H')}S`);

const tasks = reactive([
  {
    time: '09:31',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    active: true,
    category: 'Project',
  },
  {
    time: '08:57',
    description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    active: false,
    category: 'Meeting',
  },
  {
    time: '08:23',
    description: 'Aenean euismod',
    active: false,
    category: 'Project',
  },
  {
    time: '07:34',
    description: 'Quisque ut mauris euismod, gravida nunc non, cursus erat.',
    active: false,
    category: 'Project',
  },
]);

</script>

<template>
  <div>
    <app-header />

    <main>

      <task-controls :currentTaskTime="currentTask.time" :currentTaskDateTime="currentTaskDateTime" />

      <section class="main__task-list" aria-label="Task list">
        <ol class="task-list__items">
          <li class="task-list__item" v-for="task in tasks" :key="task.time">
            <article class="task" :class="{ 'task--active': task.active }">
              <div class="task__start-and-category">
                <time class="task__time" :datetime="task.time">{{ task.time }}</time>
                <div class="task__category">{{ task.category }}</div>
              </div>
              <div class="task__description">{{ task.description }}</div>
            </article>
          </li>
        </ol>
      </section>
    </main>
  </div>
</template>

<style>
@import "@/assets/css/base.css";

.main__task-list {
  padding: 1rem 2rem;
}

.task__category {
  display: inline-block;
  padding: 0.25rem 1rem;
  margin-top: 0.5rem;
  background: var(--color-secondary);
  border-radius: 500px;
}

.task__description {
  line-height: 1.5;
}

.task-list__items {
  color: var(--color-neutral);
}

.task {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 1rem;
  margin-bottom: 1rem;

  &.task--active {
    color: var(--color-text);
  }
}
</style>
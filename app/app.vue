<script setup lang="ts">
const currentDate = ref(new Date());
provide('currentDate', currentDate);

const { data: tasks, pending, error, refresh } = await useFetch('/api/task/all');
const activeTask = computed(() => tasks.value?.find((task) => task.endedAt === null) || null);
const { formatTime } = useDateTime();

</script>

<template>
  <div>
    <app-header />

    <main>
      <task-controls 
        :active-task="activeTask"
        @task-saved="refresh"
      />

      <section class="task-list" aria-label="Task list">
        <template v-if="tasks?.length">
          <ol class="task-list__items">
            <li class="task-list__item" v-for="task in tasks" :key="task.taskEntryId">
              <article class="task" :class="{ 'task--active': task.endedAt === null }">
                <div class="task__start-and-category">
                  
                  <nuxt-time class="task__time" :datetime="task.startedAt" time-style="short" />
                  <!-- <div class="task__category">{{ task.category }}</div> -->
                </div>
                <div class="task__description">{{ task.description }}</div>
              </article>
            </li>
          </ol>
        </template>
      </section>

    </main>
  </div>
</template>

<style>
@import "@/assets/css/base.css";

.task-list {
  padding: 1rem 2rem;
}

.task-list__items {
  color: var(--color-neutral);
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

.task {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 1rem;
  margin-bottom: 1rem;

  &.task--active {
    color: var(--color-text);

    .task__time {
      font-size: var(--font-size-large);
      font-weight: 400;
    }

    .task__description {
      font-weight: 400;
    }
  }
}
</style>
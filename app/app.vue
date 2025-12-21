<script setup lang="ts">
import Task from '../models/Task'
import TaskEntry from '../models/TaskEntry';

const { data, pending, error } = await useFetch('/api/task/all');
const tasks = computed(() => (data.value ?? []).map(t => {
  console.log('task', t);
  return new Task(t.taskId, t.description, t.taskEntries?.map((entry: any) => {
    return new TaskEntry(entry.taskEntryId, entry.startedAt, entry.endedAt);
  }));
}));
</script>

<template>
  <div>
    <app-header />

    <main>

      <!-- <task-controls 
        :currentTaskTime="currentTask?.time" 
        :currentTaskDateTime="currentTaskDateTime" 
        @next-task="onNextTask"
      /> -->

      <section class="task-list" aria-label="Task list">
        <template v-if="tasks?.length">
          <ol class="task-list__items">
            <li class="task-list__item" v-for="task in tasks" :key="task.taskId">
              <article class="task" :class="{ 'task--active': task.isActive }">
                <!-- <div class="task__start-and-category">
                  <time class="task__time" :datetime="task.time">{{ task.time }}</time>
                  <div class="task__category">{{ task.category }}</div>
                </div> -->
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
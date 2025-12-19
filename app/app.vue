<script setup lang="ts">

type Task = {
  time: string | null;
  startTime: string | null;
  description: string;
  active: boolean;
  category: string | null;
};

const currentTask = computed<Task | null>(() => tasks.find(task => task.active));

const currentTaskDateTime = computed(() => `PT${currentTask.value?.time?.replace(/:/g, 'H')}S`);

const tasks = reactive<Task[]>([
  {
    time: '9:31am',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    active: true,
    category: 'Project',
    startTime: null
  },
  {
    time: '8:57am',
    description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    active: false,
    category: 'Meeting',
    startTime: null
  },
  {
    time: '8:23am',
    description: 'Aenean euismod',
    active: false,
    category: 'Project',
    startTime: null
  },
  {
    time: '7:34am',
    description: 'Quisque ut mauris euismod, gravida nunc non, cursus erat.',
    active: false,
    category: 'Project',
    startTime: null
  },
]);

function onNextTask() {  
  deactivateActiveTask();
}

function deactivateActiveTask() {
  tasks.forEach(task => {
    task.active = false;
  });
}

</script>

<template>
  <div>
    <app-header />

    <main>

      <task-controls 
        :currentTaskTime="currentTask.time" 
        :currentTaskDateTime="currentTaskDateTime" 
        @next-task="onNextTask"
      />

      <section class="task-list" aria-label="Task list">
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
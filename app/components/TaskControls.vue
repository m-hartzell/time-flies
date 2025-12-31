<script setup lang="ts">
import type { TaskEntryData } from "~~/server/api/task/save";
import { saveTaskEntry } from "~~/server/service/task-service";

const props = defineProps<{
  activeTask: any | null;
}>();

const emit = defineEmits<{
  (event: "task-saved"): void;
}>();

const { elapsed: currentTaskTime } = useElapsedTime(
  () => props.activeTask.startedAt
);

const startNextTask = ref(props.activeTask == null ? true : false);

const nextTaskData = reactive<{
  newTask: TaskEntryData;
  prevTask: TaskEntryData;
}>({
  newTask: {
    taskEntryId: null,
    taskId: null,
    description: null,
    startedAt: new Date().toISOString(),
    endedAt: null,
  },
  prevTask: {
    taskEntryId: null,
    taskId: null,
    description: null,
    startedAt: new Date().toISOString(),
    endedAt: null,
  },
});

async function saveTask() {
  nextTaskData.newTask.startedAt = new Date().toISOString();
  nextTaskData.newTask.description = nextTaskData.newTask.description;
  await $fetch("/api/task/save", {
    method: "POST",
    body: nextTaskData.newTask,
  });

  if (props.activeTask != null) {
    nextTaskData.prevTask.taskEntryId = props.activeTask.taskEntryId;
    nextTaskData.prevTask.taskId = props.activeTask.taskId;
    nextTaskData.prevTask.endedAt = new Date().toISOString();

    await $fetch("/api/task/save", {
      method: "POST",
      body: nextTaskData.prevTask,
    });
  }

  startNextTask.value = false;
  emit("task-saved");
}
const { currentTime } = useDateTime();
</script>

<template>
  <div class="task-controls">
    <template v-if="startNextTask == false">
      <time class="timer">{{ currentTaskTime }}</time>
      <!-- <nuxt-time class="timer" :datetime="currentTaskTime" hour="2-digit" minute="2-digit" second="2-digit" aria-live="polite" /> -->

      <app-button
        v-if="startNextTask == false"
        @click="startNextTask = true"
        type="button"
        class="next-btn"
        aria-label="Set up next task"
        outline
      >
        Next
      </app-button>
    </template>
    <template v-if="startNextTask == true">
      <div class="new-task-controls">
        <div class="new-task-controls__timer-and-save">
          <time
            class="timer"
            :datetime="new Date().toISOString()"
            aria-live="polite"
          >
            00:00:00
          </time>
          <app-button
            @click="saveTask"
            type="button"
            class="save-btn"
            aria-label="Finish current task and start the new one"
            outline
          >
            Start
          </app-button>
        </div>
        <div class="new-task-controls__inputs">
          <div class="new-task-controls__start-time">
            <nuxt-time
              class="start-time"
              :datetime="new Date().toISOString()"
              time-style="short"
              aria-live="polite"
            >
              {{ currentTime }}
            </nuxt-time>
            <app-button type="button">...</app-button>
          </div>
          <input type="text" v-model="nextTaskData.newTask.description" />
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
.task-controls {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: space-between;
  padding: 0.875rem 2rem;
  background-color: var(--color-background-highlight);
  font-size: var(--font-size-large);
}

.timer {
  color: var(--color-primary);
  font-weight: bold;
  font-size: var(--font-size-xlarge);
}

.start-time {
  white-space: nowrap;
}

.next-btn {
  font-size: var(--font-size-large);
  font-weight: bold;
  border-width: 1px;
  border-radius: 5px;
}

.save-btn {
  font-size: var(--font-size-large);
  font-weight: bold;
  border-width: 1px;
  border-radius: 5px;
  background-color: var(--color-primary);
  color: var(--color-background);
}

input[type="text"] {
  width: 100%;
  padding: 0.5rem;
  font-size: var(--font-size-large);
  border: 1px solid var(--color-neutral);
  border-radius: 5px;
  background: transparent;
  color: var(--color-text);
}

.new-task-controls {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.new-task-controls__timer-and-save {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: space-between;

  .timer {
    color: var(--color-secondary);
  }
}

.new-task-controls__start-time {
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 0.5rem;

  .app-button {
    flex-shrink: 1;
  }
}

.new-task-controls__inputs {
  display: flex;
  align-items: start;
  gap: 0.5rem;
}
</style>

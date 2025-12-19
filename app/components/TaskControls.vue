<script setup lang="ts">
defineProps<{
	currentTaskTime: string;
	currentTaskDateTime: string;
}>();

defineEmits<{
	(event: 'next-task'): void;
}>();
</script>

<template>
	<div class="task-controls">
		<time class="timer" :datetime="currentTaskDateTime" aria-live="polite">{{ currentTaskTime }}</time>
		<app-button @click="$emit('next-task')" type="button" class="next-btn" aria-label="Start next task" outline>Next</app-button>
	</div>
</template>

<style scoped>
.task-controls {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0.875rem 2rem;
	background-color: var(--color-background-highlight);
	font-size: var(--font-size-large);
	font-weight: bold;
}

time {
	color: var(--color-primary);
	font-size: var(--font-size-xlarge);
}

.next-btn {
	font-size: var(--font-size-large);
	font-weight: bold;
	border-width: 1px;
	border-radius: 5px;
}
</style>
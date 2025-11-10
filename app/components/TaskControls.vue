<script setup lang="ts">
defineProps<{
	currentTaskTime: string;
	currentTaskDateTime: string;
}>();
</script>

<template>
	<div class="task-controls">
		<time class="timer" :datetime="currentTaskDateTime" aria-live="polite">{{ currentTaskTime }}</time>
		<app-button type="button" class="next-btn" aria-label="Start next task" outline>Next</app-button>
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

.next-btn {
	font-size: var(--font-size-large);
	font-weight: bold;
}
</style>
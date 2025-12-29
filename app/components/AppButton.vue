<script setup lang="ts">
withDefaults(defineProps<{
	outline?: boolean;
}>(), {
	outline: false,
});

</script>

<template>
	<button class="app-button" :class="{ 'app-button--outline': outline }">
		<slot />
	</button>
</template>

<style scoped>
.app-button {
	padding: 0.25rem 2rem;
	font-weight: bold;
	border: none;
	border-radius: 4px;
	background-color: var(--color-background);
	color: var(--color-on-primary);
	border-radius: 4px;
	cursor: pointer;
	box-shadow: var(--shadow-sm);
}

.app-button--outline {
	background-color: transparent;
	color: var(--color-text);
	background-color: transparent;
	border: 2px solid var(--color-primary);
}
</style>
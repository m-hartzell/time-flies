import { ref, computed, onMounted, onUnmounted } from 'vue';

export default function useElapsedTime(startedAt: () => Date | string | null) {
  const tick = ref(0);

  onMounted(() => {
    const interval = setInterval(() => tick.value++, 1000);
    onUnmounted(() => clearInterval(interval));
  });

  const elapsed = computed(() => {
    console.log(startedAt());
    // Force re-computation every tick
    tick.value;

    if (!startedAt()) return '00:00:00';

    const start = new Date(startedAt()!);
    const diffMs = Date.now() - start.getTime();

    const hrs = Math.floor(diffMs / 3600000);
    const mins = Math.floor((diffMs % 3600000) / 60000);
    const secs = Math.floor((diffMs % 60000) / 1000);

    return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  });

  return { elapsed };
}
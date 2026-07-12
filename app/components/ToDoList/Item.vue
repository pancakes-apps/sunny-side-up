<script setup lang="ts">
const { goal } = defineProps<{ goal: Goal }>()
const goalsStore = useGoalsStore()
</script>

<template>
    <div class="flex items-center justify-between group">
        <div class="flex items-center gap-2">
            <input type="checkbox" v-model="goal.checked">
            <input v-if="!goal.checked" type="text" v-model="goal.description" placeholder="what are we doing today?" class="outline-0 border-0 text-[clamp(0.875rem,2.5vw,1.125rem)]">
            <p v-else class="text-[clamp(0.875rem,2.5vw,1.125rem)] line-through">{{ goal.description }}</p>
        </div>
        <span class="cursor-pointer opacity-0 group-hover:opacity-100" @click="() => goalsStore.removeGoal(goal.id)">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
        </span>
    </div>
</template>
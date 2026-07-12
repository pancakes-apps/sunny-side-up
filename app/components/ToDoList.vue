<script lang="ts" setup>
const goalsStore = useGoalsStore()

const newGoal = ref<Goal>({
    id: -1,
    description: '',
    checked: false,
})

const handleAddNewGoal = (description: string) => {
    let lastItem: Goal | undefined = goalsStore.goals?.at(-1)
    let newId: number = 0

    if (lastItem) {
        newId = lastItem.id + 1
    }

    goalsStore.addGoal({
        id: newId,
        description: description,
        checked: false,
    })

    newGoal.value.description = ''
}
</script>

<template>
    <div class="flex w-full md:w-[40%] h-[40vh] md:h-auto p-4 sm:p-7 flex-col items-center md:items-start md:justify-normal justify-center">
        <h1 class="text-[clamp(1.5rem,4vw,1.875rem)] mb-5">Goals for today</h1>
        <!-- Goals -->
        <div class="w-full">
            <div v-if="goalsStore.goals?.length" class="space-y-2">
                <ToDoListItem v-for="goal in goalsStore.goals.filter(g => !g.checked)" :key="goal.id" :goal="goal"/>
            </div>
            <div class="space-x-2 mt-2">
                <input type="checkbox" v-model="newGoal.checked">
                <input type="text" v-model="newGoal.description" placeholder="what are we doing today?" class="outline-0 border-0 text-[clamp(0.875rem,2.5vw,1.125rem)]" @keypress.enter="() => handleAddNewGoal(newGoal.description)">
            </div>
        </div>

        <!-- Completed Goals -->
        <div class="mt-24 w-full" v-if="goalsStore.goals?.filter(g => g.checked).length">
            <h1 class="text-[clamp(1rem,3vw,1.25rem)] mb-2">Finished for the day</h1>
            
            <div class="space-y-2">
                <ToDoListItem v-for="goal in goalsStore.goals.filter(g => g.checked)" :key="goal.id" :goal="goal"/>
            </div>
        </div>
    </div>
</template>
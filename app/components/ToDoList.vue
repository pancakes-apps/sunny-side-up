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
    <div class="flex w-full md:w-[40%] p-7 flex flex-col items-start justify-center">
        <h1 class="text-3xl mb-5">Goals for today</h1>
        <!-- Goals -->
        <div>
            <div v-if="goalsStore.goals?.length">
                <div class="space-x-2" v-for="goal in goalsStore.goals" :key="goal.id">
                    <input type="checkbox" v-model="goal.checked">
                    <input type="text" v-model="goal.description" placeholder="what are we doing today?" class="outline-0 border-0">
                </div>
            </div>
            <div class="space-x-2">
                <input type="checkbox" v-model="newGoal.checked">
                <input type="text" v-model="newGoal.description" placeholder="what are we doing today?" class="outline-0 border-0" @keypress.enter="() => handleAddNewGoal(newGoal.description)">
            </div>
        </div>
    </div>
</template>
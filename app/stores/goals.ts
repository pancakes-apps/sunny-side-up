export const useGoalsStore = defineStore('goals-store', () => {
    const goals = ref<Goal[] | undefined>([])
    
    const addGoal = (goal: Goal) => {
        console.log(goal)
        goals.value?.push(goal)
    }

    const removeGoal = (id: number) => {
        goals.value = goals.value?.filter((g) => g.id !== id)
    }

    return {
        goals,
        addGoal,
        removeGoal,
    }
})
<script lang="ts" setup>
const timerStore = useTimerStore()

const { sessionId } = defineProps<{ sessionId: number }>()

const isSessionRunning = computed(() => {
    return timerStore.runningSessionId && timerStore.activeSession?.id === sessionId
})

const sessionTime = timerStore.getSessionTime(sessionId)

const sessionTimeInHours = ref<number>(hour(sessionTime.value))
const sessionTimeInMinutes = ref<number>(min(sessionTime.value))
const sessionTimeInSeconds = ref<number>(sec(sessionTime.value))

// component 
const editSessionTime = ref<boolean>(false)

// component
const displaySessionTime = computed( () => {
    const h = String(hour(sessionTime.value)).padStart(2,'0')
    const m = String(min((sessionTime.value))).padStart(2,'0')
    const s = String(sec(sessionTime.value)).padStart(2,'0')
    return `${h}:${m}:${s}`
})

const handleStartSession = () => {
    timerStore.startSession(sessionId)
}

const handlePauseSession = () => {
    timerStore.pauseSession(sessionId)
}

const handleToggleEditSection = () => {
    // toggle the section and update the time in hours and mins
    editSessionTime.value = !editSessionTime.value

    const runningSession = timerStore.getSessionTime(sessionId)
    sessionTimeInHours.value = hour(runningSession.value)
    sessionTimeInMinutes.value = min(runningSession.value)
    sessionTimeInSeconds.value = sec(runningSession.value)

}

const handleEditTime = () => {
    if (editSessionTime.value) {
        timerStore.editTime(sessionId, (sessionTimeInHours.value * 60 * 60) + (sessionTimeInMinutes.value * 60) + sessionTimeInSeconds.value)
    }

    handleToggleEditSection()
}
</script>

<template>
    <div class="w-full">
        <p v-if="!editSessionTime" :class="['text-9xl transition text-center', isSessionRunning ? '' : 'opacity-50']">{{ displaySessionTime }}</p>

        <div v-else class="text-9xl flex items-center justify-center">
            <div class="flex items-center">
                <input placeholder="00" type="number" min="0" class="outline-0 border-0 no-spinner w-42" v-model="sessionTimeInHours">
                <p>:</p>
            </div>

            <div class="flex items-center">
                <input placeholder="00" type="number" min="0" max="59" class="outline-0 border-0 no-spinner w-42" v-model="sessionTimeInMinutes">
                <p>:</p>
            </div>

            <div class="flex flex-col">
                <input placeholder="00" type="number" min="0" max="59" class="outline-0 border-0 no-spinner w-42" v-model="sessionTimeInSeconds">
            </div>
        </div>
    </div>

    <!-- Time -->
    <div class="mt-5 flex items-center gap-3">
        <button class="cursor-pointer" v-if="!editSessionTime" @click="handleStartSession">start</button>
        <button class="cursor-pointer" v-if="!editSessionTime" @click="handlePauseSession">stop</button>
        <div class="flex items-center gap-2">
            <button class="cursor-pointer" @click="handleEditTime">{{editSessionTime ? 'save' : 'edit'}}</button>
            <button class="cursor-pointer" v-if="editSessionTime" @click="editSessionTime = false">cancel</button>
        </div>
    </div>
</template>

<style scoped>
.no-spinner::-webkit-outer-spin-button,
.no-spinner::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.no-spinner {
  -moz-appearance: textfield;
}
</style>
<script lang="ts" setup>
const timerStore = useTimerStore()

const sessionId = ref<number>(timerStore.activeSession ? timerStore.activeSession.id : 1)

const toggleSessions = (id:number) => {
    sessionId.value = id
}

</script>

<template>
    <div class="flex w-full md:w-[60%] p-4 flex flex-col items-center">
        <div class="rounded-full bg-white/40 mb-8 flex items-center text-sm">
            <button @click="() => toggleSessions(1)" :class="['transition px-4 py-2 rounded-full cursor-pointer', sessionId === 1 ? 'bg-black' : '']">Session One</button>
            <button @click="() => toggleSessions(2)" :class="['transition px-4 py-2 rounded-full cursor-pointer', sessionId === 2 ? 'bg-black' : '']">Session Two</button>
        </div>

        <TimerSession :session-id="1" v-if="sessionId === 1" />
        <TimerSession :session-id="2" v-else/>
    </div>
</template>

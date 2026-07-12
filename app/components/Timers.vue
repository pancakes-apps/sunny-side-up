<script lang="ts" setup>
const timerStore = useTimerStore()

const sessionId = ref<number>(timerStore.activeSession ? timerStore.activeSession.id : 1)

const toggleSessions = (id:number) => {
    sessionId.value = id
}

</script>

<template>
    <div class="flex w-full md:w-[60%] h-[60vh] md:h-auto p-4 flex-col items-center md:justify-normal justify-center">
        <div class="rounded-full bg-white/40 mb-[clamp(1rem,4vw,2rem)] flex items-center text-[clamp(0.75rem,2vw,0.875rem)]">
            <button 
                @click="() => toggleSessions(1)"
                :class="[
                    'transition px-[clamp(0.75rem,2.5vw,1rem)] py-[clamp(0.375rem,1.5vw,0.5rem)] rounded-full cursor-pointer',
                    sessionId === 1 ? 'bg-black' : '',
                    timerStore.activeSession?.id === 1 ? 'text-cyan-200' : ''
                ]"
            >Session One</button>
            <button 
                @click="() => toggleSessions(2)"
                :class="[
                    'transition px-[clamp(0.75rem,2.5vw,1rem)] py-[clamp(0.375rem,1.5vw,0.5rem)] rounded-full cursor-pointer',
                    sessionId === 2 ? 'bg-black' : '',
                    timerStore.activeSession?.id === 2 ? 'text-cyan-200' : '',
                ]"
            >Session Two</button>
        </div>

        <TimerSession :session-id="1" v-if="sessionId === 1" />
        <TimerSession :session-id="2" v-else/>

        <div>
            <button class="cursor-pointer mt-10" @click="timerStore.resetToDefaults()">rest everything</button>
        </div>
    </div>
</template>

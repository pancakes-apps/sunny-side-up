<script lang="ts" setup>
const sessionId = ref<number>(1)
const toggleSessions = ref<boolean>(false)

const runningSessionId = ref<number|undefined>()

const sessionTime = ref<number>(4 * 60 * 60) // start with 4 hours

const displaySessionTime = computed( () => {
    const h = String(Math.floor(sessionTime.value / 3600)).padStart(2,'0')
    const m = String(Math.floor((sessionTime.value % 3600) / 60)).padStart(2,'0')
    const s = String(sessionTime.value % 60).padStart(2,'0')
    return `${h}:${m}:${s}`
})

const startSession = () => {
    const sessionIntervalId = setInterval(() => {
        if (sessionTime.value < 0) {
            clearInterval(sessionIntervalId)
            runningSessionId.value = undefined
        } else {
            sessionTime.value--
        }
    }, 1000)

    runningSessionId.value = sessionIntervalId
}

const pauseSession = () => {
    clearInterval(runningSessionId.value)
    runningSessionId.value = undefined
}

</script>

<template>
    <div class="flex w-full md:w-1/2 p-4 flex flex-col items-center">
        <div class="rounded-full bg-white/40 mb-8 flex items-center text-sm">
            <p :class="['px-4 py-2 rounded-full cursor-pointer', sessionId === 1 ? 'bg-black' : '']">Session One</p>
            <p :class="['px-4 py-2 rounded-full cursor-pointer', sessionId === 2 ? 'bg-black' : '']">Current Two</p>
        </div>

        <div>
            <p :class="['text-9xl transition', runningSessionId ? '' : 'opacity-50']">{{ displaySessionTime }}</p>
        </div>

        <!-- Time -->
        <div class="mt-5 space-x-4">
            <button class="cursor-pointer" @click="startSession">start</button>
            <button class="cursor-pointer" @click="pauseSession">stop</button>
        </div>
    </div>
</template>
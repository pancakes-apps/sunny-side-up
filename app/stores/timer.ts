export const useTimerStore = defineStore('timer-store', () => {
    const DEFAULT_SESSION_TIME:number =  4 * 60 * 60

    const sessions = ref<Session[]>([
        { id: 1, active: true },
        { id: 2, active: false }
    ])

    const sessionOneTime = ref<number>(DEFAULT_SESSION_TIME)
    const sessionTwoTime = ref<number>(DEFAULT_SESSION_TIME)

    const runningSessionId = ref<number|undefined>()

    const activeSession = computed( () => {
        return sessions.value.find(s => s.active)
    })

    const editTime = (sessionId: number, time: number) => {
        if ( sessionId === 1 ) {
            sessionOneTime.value = time
        } else {
            sessionTwoTime.value = time
        }
    }

    const startSession = (sessionId: number) => {
        if (activeSession.value?.id !== sessionId) {
            alert('You must finish your first session to get started')

            return
        }

        const sessionIntervalId = setInterval(() => {
            if (activeSession.value?.id === 1) {
                if (sessionOneTime.value === 0) {
                    sessionEnded(sessionIntervalId)
                } else {
                    sessionOneTime.value--
                }
            } else {
                if (sessionTwoTime.value === 0) {
                    sessionEnded(sessionIntervalId)
                } else {
                    sessionTwoTime.value--
                }      
            }
        }, 1000)

        runningSessionId.value = sessionIntervalId
    }

    const sessionEnded = (sessionIntervalId: number) => {
        clearInterval(sessionIntervalId)
        runningSessionId.value = undefined

        // deactivate running session
        const current = sessions.value.find(s => s.active)
        if (current) {
            current.active = false

            // activate the other one
            const next = sessions.value.find(s => s.id !== current.id)
            if (next) {
                next.active = true

                alert(`session: ${current.id} has ended now you can start with session ${next.id}`)
            }
        }
    }

    const pauseSession = (sessionId: number) => {
        if (activeSession.value?.id !== sessionId) {
            alert('You must finish your first session to get started')

            return
        }

        clearInterval(runningSessionId.value)
        runningSessionId.value = undefined
    }

    const getSessionTime = (sessionId: number,) => {
        if ( sessionId === 1 ) {
            return sessionOneTime
        } else {
            return sessionTwoTime
        }
    }

    return {
        sessionOneTime,
        sessionTwoTime,
        activeSession,
        runningSessionId,
        editTime,
        pauseSession,
        startSession,
        getSessionTime,
    }
})
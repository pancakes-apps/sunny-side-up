export const useTimerStore = defineStore('timer-store', () => {
    const DEFAULT_SESSION_TIME:number =  4 * 60 * 60
    const SESSIONS = ref<Session[]>([
        { 
            id: 1,
            active: true,
            time: DEFAULT_SESSION_TIME,
            startedAt: undefined,
            duration: undefined,
        },
        { 
            id: 2,
            active: false,
            time: DEFAULT_SESSION_TIME,
            startedAt: undefined,
            duration: undefined,
        }
    ])

    // private ticking clock: not returned from the store, so updating it every second
    // re-renders the display WITHOUT triggering a localStorage write
    const nowTick = ref<number>(Date.now())

    const liveRemaining = (session: Session): number => {
        if (session.startedAt !== undefined && session.duration !== undefined) {
            return Math.max(Math.floor((session.duration - (nowTick.value - session.startedAt)) / 1000), 0)
        }

        return session.time
    }

    const getRemainingSessionTime = (sessionId: number): number => {
        const session = SESSIONS.value.find(s => s.id === sessionId)

        return session ? liveRemaining(session) : 0
    }

    const activeSession = computed( () => {
        return SESSIONS.value.find(s => s.active)
    })

    // call this when the component is mounted
    const currentSessionComponentId = ref<number | undefined>()
    const setCurrentSessionComponentId = (id:number) => {
        currentSessionComponentId.value = id
    }

    const displaySessionTime = computed( () => { return getRemainingSessionTime(currentSessionComponentId.value ? currentSessionComponentId.value : 1) },)

    const editTime = (time: number) => {
        if ( currentSessionComponentId.value === 1 ) {
            SESSIONS.value[0]!.time = time
        } else {
            SESSIONS.value[1]!.time = time
        }
    }

    const runningIntervalId = ref<number|undefined>()

    const startSession = (sessionId: number) => {
        if (activeSession.value?.id !== sessionId) {
            alert(`You must finish the current session to get started. Current session: ${activeSession.value?.id}`)

            return
        }

        if (runningIntervalId.value !== undefined) {
            return
        }

        const isSessionOneRunning = activeSession.value?.id === 1

        activeSession.value.startedAt = Date.now()
        activeSession.value.duration = isSessionOneRunning ? SESSIONS.value[0]!.time * 1000 : SESSIONS.value[1]!.time * 1000
        nowTick.value = Date.now()

        const sessionIntervalId = setInterval(() => {
            // only the private clock ticks — persisted state is untouched while running
            nowTick.value = Date.now()

            if (liveRemaining(activeSession.value!) <= 0) {
                sessionEnded(sessionIntervalId)
            }
        }, 1000)

        runningIntervalId.value = sessionIntervalId
    }

    const pauseSession = (sessionId: number) => {
        if (activeSession.value?.id !== sessionId) {
            alert(`You must finish the current session to get started. Current session: ${activeSession.value?.id}`)

            return
        }

        clearInterval(runningIntervalId.value)
        runningIntervalId.value = undefined

        // freeze the remaining time into `time` (the one write for this run), then
        // clear the running markers so the session doesn't drain across refreshes
        activeSession.value.time = liveRemaining(activeSession.value)
        activeSession.value.startedAt = undefined
        activeSession.value.duration = undefined
    }

    const sessionEnded = (sessionIntervalId: number) => {
        clearInterval(sessionIntervalId)
        runningIntervalId.value = undefined

        // capture the session before flipping `active`, otherwise the computed becomes undefined
        const ended = activeSession.value!
        ended.startedAt = undefined
        ended.duration = undefined
        ended.time = 0
        ended.active = false

        const next = SESSIONS.value.find(s => s.id !== ended.id)
        if (next) {
            next.active = true

            alert(`session: ${next.id === 1 ? 2 : 1} has ended now you can start with session ${next.id}`)
        }
    }


    // this is a one time thing
    const getSessionTime = () => {
        return displaySessionTime
    }

    const resetToDefaults = () => {
        if (runningIntervalId.value) {
            clearInterval(runningIntervalId.value)
            runningIntervalId.value = undefined
        }

        SESSIONS.value = [
            { id: 1, active: true, time: DEFAULT_SESSION_TIME, startedAt: undefined, duration: undefined, },
            { id: 2, active: false, time: DEFAULT_SESSION_TIME, startedAt: undefined, duration: undefined, }
        ]
    }

    if (import.meta.client) {
        // ticks never touch localStorage, so persist the remaining time exactly once
        // when the page is closed, refreshed, or moved to the background
        const snapshotRunningSession = () => {
            const session = activeSession.value

            if (session && session.startedAt !== undefined && session.duration !== undefined) {
                session.time = liveRemaining(session)
            }
        }

        window.addEventListener('pagehide', snapshotRunningSession)
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'hidden') {
                snapshotRunningSession()
            }
        })
    }

    return {
        SESSIONS,
        activeSession,
        runningIntervalId,
        displaySessionTime,
        currentSessionComponentId,
        editTime,
        pauseSession,
        startSession,
        getSessionTime,
        resetToDefaults,
        getRemainingSessionTime,
        setCurrentSessionComponentId,
    }
}, {
    persist: {
        serializer: {
            serialize: (state) => {
                const { runningIntervalId, ...rest } = state
                return JSON.stringify(rest)
            },
            deserialize: (str) => {
                const parsed = JSON.parse(str)

                if (parsed.SESSIONS) {
                    parsed.SESSIONS = parsed.SESSIONS.map((session: Session) => ({
                        ...session,
                        startedAt: undefined,
                        duration: undefined,
                    }))
                }

                parsed.runningIntervalId = undefined

                return parsed
            },
        },
    },
})
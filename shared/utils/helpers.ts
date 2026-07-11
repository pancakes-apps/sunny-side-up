export const hour = (time: number): number => {
    return Math.floor(time / 3600)
}

export const min = (time: number): number => {
    return Math.floor((time % 3600) / 60)
}

export const sec = (time: number): number => {
    return Math.floor(time % 60)
}
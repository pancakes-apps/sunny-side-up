export type Session = {
    id: number;
    active: boolean;
    time: number,
    startedAt: undefined | number,  // the actual time the session was started in
    duration: undefined | number,   // how long the session is supposed to run
}
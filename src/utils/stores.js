import { writable } from "svelte/store"
export const currentUser = writable({ email: "" })
export const loggedin = writable(false)
export const verified = writable(false)
export const admin = writable(false)

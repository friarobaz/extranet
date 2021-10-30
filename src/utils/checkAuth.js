import { push } from "svelte-spa-router"

export const checkAuth = () => {
  console.log("checking auth")
  if (loggedIn) return true
  push("/login-or-signup")
  return false
}

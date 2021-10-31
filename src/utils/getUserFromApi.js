import { getDataFromApi } from "./getDataFromApi"
import { check, success, warning } from "./log"
const LOG_INDENT = 0

export const getUserFromApi = async (userId) => {
  const url = `/.netlify/functions/get-user?id=${userId}`
  check(`Getting user from API ID: ${userId}`, LOG_INDENT)
  try {
    const data = await getDataFromApi(url)
    const user = data.user
    success(`User found: ${user.prenom.$value} ${user.nom.$value}`, LOG_INDENT)
    //console.log(user)
    return user
  } catch (error) {
    warning("User not found", LOG_INDENT)
    console.error(error)
    return
  }
}

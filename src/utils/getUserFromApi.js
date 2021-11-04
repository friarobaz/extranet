import { getDataFromApi } from "./getDataFromApi"
import { check, success, warning } from "./log"

export const getUserFromApi = async (userId) => {
  const url = `/.netlify/functions/get-user?id=${userId}`
  check(`Getting user from API ID: ${userId}`)
  try {
    const data = await getDataFromApi(url)
    const user = data.user
    success(`User found: ${user.prenom.$value} ${user.nom.$value}`)
    //console.log(user)
    return user
  } catch (error) {
    warning("User not found")
    console.error(error)
    return null
  }
}

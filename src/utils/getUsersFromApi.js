import { getDataFromApi } from "./getDataFromApi"
import { check, success, warning } from "./log"
const LOG_INDENT = 0

export const getUsersFromApi = async (clubId = "7421") => {
  const url = `/.netlify/functions/get-users?id=${clubId}`
  check(`Getting users from club ID: ${clubId}`, LOG_INDENT)
  try {
    const data = await getDataFromApi(url)
    const users = data.users
    success(`Found ${users.length} users`, LOG_INDENT)
    //console.log(users)
    return users
  } catch (error) {
    warning("Users not found", LOG_INDENT)
    console.error(error)
    return
  }
}

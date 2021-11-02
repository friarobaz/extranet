import { getDataFromApi } from "./getDataFromApi"
import { check, success, warning } from "./log"
const LOG_INDENT = 1

export const getUsersFromApi = async () => {
  const url = `/.netlify/functions/get-users?id=7421`
  check(`Getting users from API`, LOG_INDENT)
  try {
    const data = await getDataFromApi(url)
    const users = data.users
    success(`Found ${users.length} users`, LOG_INDENT)
    console.log(users)
    return users
  } catch (error) {
    warning("Users not found", LOG_INDENT)
    console.error(error)
    return
  }
}

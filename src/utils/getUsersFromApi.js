import { getDataFromApi } from "./getDataFromApi"
import { check, success, warning } from "./log"

export const getUsersFromApi = async (parent_indent = 0) => {
  const indent = parent_indent + 1
  const url = `/.netlify/functions/get-users?id=7421`
  check(`Getting users from API`, indent)
  try {
    const data = await getDataFromApi(url, indent)
    const users = data.users
    success(`Found ${users.length} users`, indent)
    console.log(users)
    return users
  } catch (error) {
    warning("Users not found", indent)
    throw error
  }
}

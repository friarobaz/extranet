import { getDataFromApi } from "./getDataFromApi"
import { check, success, warning } from "./log"

export const getUsersFromApi = async () => {
  console.group()
  const url = `/.netlify/functions/get-users?id=7421`
  check(`Getting users from API`)
  try {
    const data = await getDataFromApi(url)
    const users = data.users
    success(`Found ${users.length} users`)
    console.groupEnd()
    return users
  } catch (error) {
    warning("Users not found")
    throw error
  }
}

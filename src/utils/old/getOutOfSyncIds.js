import { check, success, warning } from "../logg"
import { getUsersFromApi } from "../getUsersFromApii"
import { formatApiUser } from "../formatApiUserr"
import { getUserFromFirestore } from "../getUserFromFirestoree"
import { areIdentical } from "../areIdenticall"
const LOG_INDENT = 0

export const getOutOfSyncIds = async () => {
  check("Checking if users are up to date", LOG_INDENT)
  const ApiUsers = await getUsersFromApi()
  let ids = []

  //for all users in API
  for (const user of ApiUsers) {
    const formattedApiUser = formatApiUser(user)
    const firestoreUser = await getUserFromFirestore(user.id.$value, false)
    if (!areIdentical(formattedApiUser, firestoreUser, false)) {
      warning(`User not up to date ID:${user.id.$value}`, LOG_INDENT + 1)
      ids.push(user.id.$value)
    }
  }
  //after loop
  if (ids.length) {
    warning(`Found differences in ${ids.length} users`)
    console.log(ids)
    return ids
  } else {
    success(`Users are up to date`, LOG_INDENT)
    return null
  }
}

/* import { getUserFromApi } from "../getUserFromApipii
import { getUserFromFirestore } from../getUserFromFirestoretoree
import { formatApiUser } fr../formatApiUserpiUserr
import { areIdentical } from "../areIdentical"
import { check, success, warning } ../log "../logg

const LOG_INDENT = 0

export const isUserUpToDate = async (userId, log = true) => {
  if (log) check(`Checking if user is up to date, ID: ${userId}`, LOG_INDENT)
  const apiUser = await getUserFromApi(userId)
  if (!apiUser) {
    warning(`No user`, LOG_INDENT)
    return false
  }
  const formattedApiUser = formatApiUser(apiUser)
  const firestoreUser = await getUserFromFirestore(userId)

  if (areIdentical(formattedApiUser, firestoreUser, true)) {
    if (log) success("User is up to date", LOG_INDENT)
    return true
  } else {
    warning("User is not up to date", LOG_INDENT)
    return false
  }
} */

import { formatApiUser } from "../formatApiUser"
import { getUserFromApi } from "../getUserFromApi"
import { doc, setDoc } from "firebase/firestore"
import { check, success, warning } from "../log"
import { db } from "../firebase"

const LOG_INDENT = 0

export const updateUser = async (userId) => {
  check(`Updating user ID: ${userId}`, LOG_INDENT)
  const apiUser = await getUserFromApi(userId.toString())
  const formattedUser = formatApiUser(apiUser)

  try {
    await setDoc(doc(db, "users", userId.toString()), formattedUser, {
      merge: true,
    })
    success(`Document updated`, LOG_INDENT)
    return
  } catch (error) {
    warning(`Could not update document`, LOG_INDENT)
    console.error(error)
    return
  }
}

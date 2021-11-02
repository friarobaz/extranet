import { collection, getDocs } from "firebase/firestore"
import { db } from "./firebase"
import { check, success, warning } from "./log"
const LOG_INDENT = 1

export const getUsersFromFirestore = async () => {
  check(`Getting users from Firestore`, LOG_INDENT)
  const users = []
  try {
    const usersSnapshot = await getDocs(collection(db, "users"))
    usersSnapshot.forEach((user) => {
      users.push(user.data())
    })
    if (users.length) success(`Found ${users.length} users`, LOG_INDENT)
    console.log(users)
    return users
  } catch (error) {
    warning("Users not found", LOG_INDENT)
    console.error(error)
    return
  }
}

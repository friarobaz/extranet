import { doc, getDoc } from "firebase/firestore"
import { db } from "./firebase"
import { check, success, warning } from "./log"
const LOG_INDENT = 1

export const getUserFromFirestore = async (userId, log = false) => {
  if (!userId) return
  if (log) check(`Getting user from Firestore ID: ${userId}`, LOG_INDENT)

  try {
    const docRef = doc(db, "users", userId.toString())
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      const user = docSnap.data()
      if (!log) console.log("user found")
      if (log)
        success(`User found: ${user.firstName} ${user.lastName}`, LOG_INDENT)
      //console.log(user)
      return user
    } else {
      throw "User not found"
    }
  } catch (error) {
    console.error(error)
    warning(`User not found ID:${userId}`, LOG_INDENT)
    throw "Utilateur non trouvé"
  }
}

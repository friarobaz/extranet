import { doc, getDoc } from "firebase/firestore"
import { db } from "./firebase"
import { check, success, warning } from "./log"

export const getUserFromFirestore = async (userId, log = true) => {
  if (log) console.group()
  if (log) check(`Getting user from Firestore ID: ${userId}`)

  try {
    const docRef = doc(db, "users", userId.toString())
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      const user = docSnap.data()

      if (!log) console.log("user found")
      if (log) success(`User found: ${user.firstName} ${user.lastName}`)
      if (log) console.log(user)
      if (log) console.groupEnd()
      return user
    } else {
      warning(`Utilisateur non trouvé pour l'ID: ${userId}`)
      return null
    }
  } catch (error) {
    warning(`User not found ID:${userId}`)
    throw error
  }
}

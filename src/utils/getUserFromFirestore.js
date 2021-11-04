import { doc, getDoc } from "firebase/firestore"
import { db } from "./firebase"
import { check, success, warning } from "./log"

export const getUserFromFirestore = async (
  userId,
  parentIndent = 0,
  log = false
) => {
  const indent = parentIndent + 1
  if (log) check(`Getting user from Firestore ID: ${userId}`, indent)

  try {
    const docRef = doc(db, "users", userId.toString())
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      const user = docSnap.data()
      if (!log) console.log("user found")
      if (log) success(`User found: ${user.firstName} ${user.lastName}`, indent)
      //console.log(user)
      return user
    } else {
      throw `Utilisateur non trouvé pour l'ID: ${userId}`
    }
  } catch (error) {
    warning(`User not found ID:${userId}`, indent)
    throw error
  }
}

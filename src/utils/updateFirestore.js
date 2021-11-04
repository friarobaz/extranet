import { formatApiUser } from "./formatApiUser"
import { getUserChanges } from "./getUserChanges"
import { getUserFromFirestore } from "./getUserFromFirestore"
import { getUsersFromApi } from "./getUsersFromApi"
import { check, success, warning } from "./log"
import { doc, setDoc } from "firebase/firestore"
import { db } from "./firebase"

export const updateFirestore = async (parent_indent = 0) => {
  const indent = parent_indent + 1
  check("Updating Firestore", indent)
  try {
    const apiUsers = await getUsersFromApi(indent)
    for (const apiUser of apiUsers) {
      const id = apiUser.id.$value
      const formatted = formatApiUser(apiUser)
      const firestoreUser = await getUserFromFirestore(id, indent)
      if (!firestoreUser) {
        warning("User not found in Firestore, adding it now", indent)
        const userRef = doc(db, "users", id)
        await setDoc(userRef, formatted, { merge: true })
      } else {
        const changes = getUserChanges(formatted, firestoreUser, indent)
        if (changes) {
          check(`Updating firestore for user ID: ${id}`, indent)
          const userRef = doc(db, "users", id)
          await setDoc(userRef, formatted, { merge: true })
          success("Done", indent)
        }
      }
    }
    success("Done", indent)
  } catch (error) {
    warning("Could not update Firestore", indent)
    throw error
  }
}

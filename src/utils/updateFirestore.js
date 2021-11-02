import { formatApiUser } from "./formatApiUser"
import { getUserChanges } from "./getUserChanges"
import { getUserFromFirestore } from "./getUserFromFirestore"
import { getUsersFromApi } from "./getUsersFromApi"
import { check, success, warning } from "./log"
import { doc, setDoc } from "firebase/firestore"
import { db } from "./firebase"
const LOG_INDENT = 0

export const updateFirestore = async () => {
  check("Updating Firestore", LOG_INDENT)
  const apiUsers = await getUsersFromApi()
  for (const apiUser of apiUsers) {
    const id = apiUser.id.$value
    const formatted = formatApiUser(apiUser)
    const firestoreUser = await getUserFromFirestore(id)
    if (!firestoreUser) {
      warning("User not found in Firestore, adding it now", LOG_INDENT)
      const userRef = doc(db, "users", id)
      await setDoc(userRef, formatted, { merge: true })
    } else {
      const changes = getUserChanges(formatted, firestoreUser)
      if (changes) {
        check(`Updating firestore for user ID: ${id}`, LOG_INDENT)
        const userRef = doc(db, "users", id)
        await setDoc(userRef, formatted, { merge: true })
        success("Done", LOG_INDENT)
      }
    }
  }
  success("Done", LOG_INDENT)
}

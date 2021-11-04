import { db } from "./firebase"
import { getDoc, doc } from "firebase/firestore"
import { check, warning, success } from "./log"

export const getApiPassword = async () => {
  try {
    console.group()
    check("Getting password from Firestore")
    const docRef = doc(db, "admin", "api-password")
    const docSnap = await getDoc(docRef)
    success("Password found")
    console.groupEnd()
    return docSnap.data().password
  } catch (error) {
    warning("Password not found")
    throw error
  }
}

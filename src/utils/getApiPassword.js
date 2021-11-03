import { db } from "./firebase"
import { getDoc, doc } from "firebase/firestore"
import { check, warning, success } from "./log"

export const getApiPassword = async (parent_indent = 0) => {
  const indent = parent_indent + 1
  try {
    check("Getting password from Firestore", indent)
    const docRef = doc(db, "admin", "api-password")
    const docSnap = await getDoc(docRef)
    success("Password found", indent)
    return docSnap.data().password
  } catch (error) {
    warning("Password not found", indent)
    throw error
  }
}

import { db } from "./firebase"
import { getDoc, doc } from "firebase/firestore"

export const getApiPassword = async () => {
  const docRef = doc(db, "admin", "api-password")
  const docSnap = await getDoc(docRef)
  return docSnap.data().password
}

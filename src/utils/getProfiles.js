import { collection, query, where, getDocs } from "firebase/firestore"
import { db } from "./firebase"
import { check, success, warning } from "./log"

//Find users in extranet database that have this email

export const getProfiles = async (email) => {
  check(`Getting profiles for ${email}`)

  try {
    let profiles = []
    const q = query(collection(db, "users"), where("email", "==", email))
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      profiles.push(doc.data())
    })
    success(`Found ${profiles.length} profiles that match this email`)
    return profiles
  } catch (error) {
    warning(`Could not get profiles`)
    throw error
  }
}

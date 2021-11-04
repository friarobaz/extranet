import { collection, getDocs } from "firebase/firestore"
import { db } from "./firebase"
import { check, success, warning } from "./log"

export const getUsersFromFirestore = async () => {
  console.group()
  check(`Getting users from Firestore`)
  const users = []
  try {
    const usersSnapshot = await getDocs(collection(db, "users"))
    usersSnapshot.forEach((user) => {
      users.push(user.data())
    })
    success(`Found ${users.length} users`)
    console.groupEnd()
    return users
  } catch (error) {
    warning("Users not found")
    console.error(error)
    return
  }
}

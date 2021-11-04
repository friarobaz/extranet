import { formatApiUser } from "./formatApiUser"
import { getUserChanges } from "./getUserChanges"
import { getUserFromFirestore } from "./getUserFromFirestore"
import { getUsersFromApi } from "./getUsersFromApi"
import { check, success, warning } from "./log"
import {
  doc,
  setDoc,
  getDoc,
  addDoc,
  collection,
  getDocs,
  where,
  deleteDoc,
} from "firebase/firestore"
import { db } from "./firebase"
import { getUsersFromFirestore } from "./getUsersFromFirestore"

export const updateFirestore = async () => {
  check("Updating Firestore")
  try {
    check("Checking API users")
    //get all users from API
    const apiUsers = await getUsersFromApi()

    //for all API users, check if a Firestore user exists and is up to date
    for (const apiUser of apiUsers) {
      const id = apiUser.id.$value

      //format user object to Firestore standards
      const formatted = formatApiUser(apiUser)

      //check if user exists in Firestore
      const firestoreUser = await getUserFromFirestore(id, false)

      //if it doesn't exist, create it
      if (firestoreUser === null) await addUser(formatted)

      //look for differences bewteen API user and Firestore user
      const changes = getUserChanges(formatted, firestoreUser, false)

      //if differences are found, update Firestore user
      if (changes) await addUser(formatted)
    }

    check("Checking Firestore users")

    //list of all user IDs in API
    const apiIds = apiUsers.map((user) => user.id.$value)

    //get all users from Firestore
    const firestoreUsers = await getUsersFromFirestore()

    //for all Firestore users, check if they exist in API, otherwise delete them
    for (const user of firestoreUsers) {
      if (!apiIds.includes(user.id)) {
        await deleteUser(user)
      }
    }

    success("Firestore database updated")
  } catch (error) {
    warning("Could not update Firestore")
    throw error
  }
}

const addUser = async (userObj) => {
  console.group()
  check(`Making Firestore user from API user`)
  if (!userObj) throw "No userObj to make firestore user"
  try {
    const id = userObj.id
    const userRef = doc(db, "users", id)
    await setDoc(userRef, userObj, { merge: true })
    success(`Added user with id: ${id}`)
    console.groupEnd()
  } catch (error) {
    warning(`Could not create Firestore user`)
    throw error
  }
}

const deleteUser = async (user) => {
  console.group()
  if (!user.id) throw "User doesn't have an ID, delete manualy"
  check(`Deleting Firestore user id: ${user.id}`)
  try {
    //creating backup
    await setDoc(doc(db, "trash", user.id), user)
    //deleting
    await deleteDoc(doc(db, "users", user.id))
    success(`Deleted user`)
    console.groupEnd()
  } catch (error) {
    warning(`Could not delete user id: ${user.id}`)
    throw error
  }
}

export const updateStats = async () => {
  const snap = await getDoc(doc(db, "stats", "lastUpdate"))
  const previousUpdate = snap.data()
  const currentUpdate = await makeStats()
  await addDoc(collection(db, "stats"), previousUpdate)
  await setDoc(doc(db, "stats", "lastUpdate"), currentUpdate)
  success("Done ?")
}

const makeStats = async () => {
  // API
  let apiIds = []
  const apiUsers = await getUsersFromApi()
  for (const user of apiUsers) {
    apiIds.push(user.id.$value)
  }
  // Firestore
  let firestoreIds = []
  let oldIds = []
  const snap = await getDocs(collection(db, "users"))
  snap.forEach((user) => {
    firestoreIds.push(user.id)
    if (!apiIds.includes(user.id)) oldIds.push(user.id)
  })

  return {
    date: dayjs().format("YYYY-MM-DD"),
    apiIds,
    firestoreIds,
    oldIds,
  }
}

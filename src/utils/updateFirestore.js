import { formatApiUser } from "./formatApiUser"
import { getUserChanges } from "./getUserChanges"
import { getUserFromFirestore } from "./getUserFromFirestore"
import { getUsersFromApi } from "./getUsersFromApi"
import { check, success, warning } from "./log"
import { makeStats } from "./stats"
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

    //update stats
    await updateStats(firestoreUsers)

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

const deleteUser = async (userObj) => {
  console.group()
  if (!userObj.id) throw "User doesn't have an ID, delete manualy"
  check(`Deleting Firestore user id: ${userObj.id}`)
  try {
    //creating backup
    await setDoc(doc(db, "trash", userObj.id), userObj)
    //deleting
    await deleteDoc(doc(db, "users", userObj.id))
    success(`Deleted user`)
    console.groupEnd()
  } catch (error) {
    warning(`Could not delete user id: ${userObj.id}`)
    throw error
  }
}

export const updateStats = async (users) => {
  console.group()
  check("Updating stats")
  try {
    //get old stats
    const snapshot = await getDoc(doc(db, "stats", "lastUpdate"))
    const previousUpdate = snapshot.data()

    //save them as backup
    await addDoc(collection(db, "stats"), previousUpdate)

    //if function was called without users, get them from firestore
    if (!users) {
      users = await getUsersFromFirestore()
    }
    //create new set of stats
    const currentUpdate = await makeStats(users)

    //save them to Firestore
    await setDoc(doc(db, "stats", "lastUpdate"), currentUpdate)

    success("Stats updated")
    console.groupEnd()
  } catch (error) {
    warning("Could not update stats")
    throw error
  }
}

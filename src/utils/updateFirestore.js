import { formatApiUser } from "./formatApiUser"
import { getUserChanges } from "./getUserChanges"
import { getUserFromFirestore } from "./getUserFromFirestore"
import { getUsersFromApi } from "./getUsersFromApi"
import { check, success, warning } from "./log"
import { makeStats, updateStats } from "./stats"
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
  check("Looking for changes or new users in API")
  try {
    //get all users from API
    const apiUsers = await getUsersFromApi()

    //for all API users, check if a Firestore user exists and is up to date
    for (const apiUser of apiUsers) {
      const id = apiUser.id.$value

      //format user object to Firestore standards
      const formatted = formatApiUser(apiUser)

      //check if user exists in Firestore
      let firestoreUser = await getUserFromFirestore(id, false)

      //if it doesn't exist, create it
      if (firestoreUser === null) {
        await addUser(formatted)
        firestoreUser = await getUserFromFirestore(id, false)
      }

      //look for differences bewteen API user and Firestore user
      const changes = getUserChanges(formatted, firestoreUser, false)

      //if differences are found, update Firestore user
      if (changes) await addUser(formatted)
    }
    check("Checking for Firestore users that are not in the API")
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

    //update list of ids
    //await updateListOfIds(firestoreUsers)

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

const updateListOfIds = async (users) => {
  console.group()
  check(`Updating list of ids`)
  if (!users) throw "No users to update ids"
  try {
    for (const user of users) {
      const id = user.id
      const name = user.name
      const fef = doc(db, "public", "ids")
      const obj = { [id]: name }
      await setDoc(userRef, userObj, { merge: true })
      success(`Updated list of ids`)
    }
    console.groupEnd()
  } catch (error) {
    warning(`Could not create Firestore user`)
    throw error
  }
}

import { check, success, warning } from "./log"
import { getUsersFromFirestore } from "./getUsersFromFirestore"
import { addDoc, setDoc, doc, getDoc } from "@firebase/firestore"
import { db } from "./firebase"
import { getAge } from "../utils/getAge"
import { get } from "lodash"

const ACTIVITIES = [
  "alpinisme",
  "canyon",
  "cascade de glace",
  "escalade",
  "marche nordique",
  "randonnee",
  "raquettes",
  "ski alpin",
  "ski nordique",
  "ski de randonnee",
  "slackline",
  "speleologie",
  "surf des neiges",
  "telemark",
  "trail",
  "velo de montagne",
  "via ferrata",
  "sports aeriens",
]

export const makeStats = async (users) => {
  console.group()
  check("Making new stats")
  if (!users) throw "No users to make stats"
  try {
    const recentUsers = users.filter((user) => user.signedupThisYear)
    let stats = {
      date: dayjs().format("YYYY-MM-DD"),
      time: dayjs().format("HH:MM:ss"),
      allUsers: users.length,
      recentUsers: recentUsers.length,
      women: recentUsers.filter((user) => user.sex == "female").length,
      men: recentUsers.filter((user) => user.sex == "male").length,
      activities: createAcitivitiesStats(recentUsers),
      averageAge: getAverageAge(recentUsers),
    }
    console.log(stats)
    success("New stats created")
    console.groupEnd()
    return stats
  } catch (error) {
    warning("Could not make new stats")
    throw error
  }
}

const createAcitivitiesStats = (users) => {
  let activities = []
  for (const activity of ACTIVITIES) {
    activities.push(getActivityInfo(activity, users))
  }
  return activities
}

const sort = (array, sortBy) => {
  return array.sort((a, b) => b[sortBy] - a[sortBy])
}

const getActivityInfo = (activity, users) => {
  const releventUsers = users.filter((user) =>
    user.activities.includes(activity.toUpperCase())
  )
  const men = releventUsers.filter((user) => user.sex == "male").length
  const women = releventUsers.filter((user) => user.sex == "female").length
  return {
    name: activity,
    nbOfUsers: releventUsers.length,
    men,
    women,
    averageAge: getAverageAge(releventUsers),
    womenRepresentation: (women / releventUsers.length) * 100,
  }
}

const getAverageAge = (users) => {
  if (!users) return null
  const ages = users.map((user) => getAge(user.dateOfBirth))
  const sum = ages.reduce((a, b) => a + b, 0)
  const average = sum / ages.length || 0
  return Math.round(average)
}

/* export const getAge = (user) => {
  if (!user.dateOfBirth) return null
  const birthday = dayjs(user.dateOfBirth, "YYYY-MM-DD")
  const today = dayjs()
  const age = today.diff(birthday, "year", true)
  //keep one decimal
  const roundedAge = Math.round(age * 10) / 10
  return roundedAge
} */

export const formatStats = (stats) => {
  const sex = {
    title: "Hommes et femmes",
    labels: ["Hommes", "Femmes"],
    numbers: [stats.men, stats.women],
    chart: "pie",
  }

  const usersPerActivity = {
    title: "Nb d'adh??rents par activit??",
    labels: sort(stats.activities, "nbOfUsers").map(
      (activity) => activity.name
    ),
    numbers: sort(stats.activities, "nbOfUsers").map(
      (activity) => activity.nbOfUsers
    ),
    chart: "bar",
  }
  const averageAgePerActivity = {
    title: "Age moyen par activit??",
    labels: sort(stats.activities, "averageAge").map(
      (activity) => activity.name
    ),
    numbers: sort(stats.activities, "averageAge").map(
      (activity) => activity.averageAge
    ),
    chart: "bar",
  }
  const womenPerActivity = {
    title: "Pourcentage de femmes par activit??",
    labels: sort(stats.activities, "womenRepresentation").map(
      (activity) => activity.name
    ),
    numbers: sort(stats.activities, "womenRepresentation").map(
      (activity) => activity.womenRepresentation
    ),
    chart: "bar",
  }

  return [sex, usersPerActivity, averageAgePerActivity, womenPerActivity]
}

export const updateStats = async (users) => {
  console.group()
  check("Updating stats")
  try {
    //get old stats
    //const snapshot = await getDoc(doc(db, "stats", "lastUpdate"))
    //const previousUpdate = snapshot.data()

    //save them as backup
    //await addDoc(collection(db, "stats"), previousUpdate)

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

import { check, success, warning } from "./log"
import { getUsersFromFirestore } from "./getUsersFromFirestore"
import { addDoc, setDoc, doc, getDoc } from "@firebase/firestore"
import { db } from "./firebase"
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
  const sorted = activities.sort((a, b) => b.nbOfUsers - a.nbOfUsers)
  return sorted
}

const getActivityInfo = (activity, users) => {
  const releventUsers = users.filter((user) =>
    user.activities.includes(activity.toUpperCase())
  )
  return {
    name: activity,
    nbOfUsers: releventUsers.length,
    men: releventUsers.filter((user) => user.sex == "male").length,
    women: releventUsers.filter((user) => user.sex == "female").length,
  }
}

export const formatStats = (stats) => {
  const sex = {
    title: "Hommes et femmes",
    labels: ["Hommes", "Femmes"],
    numbers: [stats.men, stats.women],
    chart: "pie",
  }
  const activities = {
    title: "Activités",
    labels: stats.activities.map((activity) => activity.name),
    numbers: stats.activities.map((activity) => activity.nbOfUsers),
    chart: "bar",
  }
  return [sex, activities]
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

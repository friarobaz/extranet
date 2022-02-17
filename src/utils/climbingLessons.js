import { collection, getDoc, setDoc, updateDoc, doc } from "firebase/firestore"
import { merge } from "lodash"
import { db } from "../utils/firebase"
import { check, success, warning } from "../utils/log"
import dayjs from "dayjs"

export const AGE_GROUPS = [
  { min: 6, max: 7 + 1, name: "6-7 ans" },
  { min: 8, max: 10 + 1, name: "8-10 ans" },
  { min: 11, max: 13 + 1, name: "11-13 ans" },
  { min: 14, max: 17 + 1, name: "14-17 ans" },
  { min: 18, max: 200, name: "Adultes" },
]

export const DAYS = [
  {
    weekday: "Lundi",
    startTime: "17h",
    endTime: "18h30",
    ageGroupName: "8-10 ans",
    teacher: "Jules",
    maxNbOfStudents: 10,
    get name() {
      return `${this.weekday} ${this.startTime}`
    },
  },
  {
    weekday: "Mardi",
    startTime: "17h",
    endTime: "18h30",
    ageGroupName: "11-13 ans",
    teacher: "Jules",
    maxNbOfStudents: 12,
    get name() {
      return `${this.weekday} ${this.startTime}`
    },
  },
  {
    weekday: "Mardi",
    startTime: "18h30",
    endTime: "20h00",
    ageGroupName: "14-17 ans",
    teacher: "Jules",
    maxNbOfStudents: 12,
    get name() {
      return `${this.weekday} ${this.startTime}`
    },
  },
  {
    weekday: "Mardi",
    startTime: "20h",
    endTime: "22h",
    ageGroupName: "Adultes",
    teacher: "Jules",
    maxNbOfStudents: 14,
    get name() {
      return `${this.weekday} ${this.startTime}`
    },
  },
  {
    weekday: "Mercredi",
    startTime: "15h",
    endTime: "16h",
    ageGroupName: "6-7 ans",
    teacher: "Jelena",
    maxNbOfStudents: 9,
    get name() {
      return `${this.weekday} ${this.startTime}`
    },
  },
  {
    weekday: "Mercredi",
    startTime: "16h",
    endTime: "17h30",
    ageGroupName: "8-10 ans",
    teacher: "Jelena",
    maxNbOfStudents: 10,
    get name() {
      return `${this.weekday} ${this.startTime}`
    },
  },
  {
    weekday: "Jeudi",
    startTime: "17h",
    endTime: "18h30",
    ageGroupName: "8-10 ans",
    teacher: "Jelena",
    maxNbOfStudents: 10,
    get name() {
      return `${this.weekday} ${this.startTime}`
    },
  },
  {
    weekday: "Jeudi",
    startTime: "18h30",
    endTime: "20h00",
    ageGroupName: "11-13 ans",
    teacher: "Jelena",
    maxNbOfStudents: 12,
    get name() {
      return `${this.weekday} ${this.startTime}`
    },
  },
]
const thisYear = dayjs().format("YYYY")
const lastYear = dayjs().subtract(1, "year").format("YYYY")
const nextYear = dayjs().add(1, "year").format("YYYY")

export const YEARS = [`${thisYear}-${nextYear}`, `${lastYear}-${thisYear}`]

export const makePupil = async (user, year, ageGroup, day) => {
  console.log(
    `Making ${user.firstName} a pupil for year ${year} group ${ageGroup.name}, day ${day.name}`
  )
  await updateDoc(doc(db, "users", user.id), {
    [`climbingLessons.${year}`]: {
      signedup: true,
      ageGroup: ageGroup.name,
      day: day.name,
    },
  })
  console.log("done")
  return
}

export const unsubscribePupil = async (user, year) => {
  console.log(`Unsubscribing ${user.firstName} from year ${year}`)
  delete user.climbingLessons[year]
  await updateDoc(doc(db, "users", user.id), user)
  console.log("done")
  return
}

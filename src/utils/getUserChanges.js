import { check, success, warning, black } from "./log"
import _ from "lodash"

const CAF_FIELDS = [
  "accidentContact",
  "activities",
  "address",
  "banReason",
  "dateOfBirth",
  "diplomas",
  "email",
  "familyLeader",
  "firstName",
  "id",
  "insurance",
  "lastName",
  "licenceType",
  "phoneNumbers",
  "publicKey",
  "roles",
  "sex",
  "signedupOnine",
  "signedupThisYear",
  "signupDate",
  "userId",
]

export const getUserChanges = (apiUser, firestoreUser, log = true) => {
  if (log) check("Looking for changes in user")
  let changes = []
  try {
    for (const field of CAF_FIELDS) {
      if (!_.isEqual(apiUser[field], firestoreUser[field])) {
        changes.push(field)
      }
    }
    if (changes.length == 0) {
      if (log) success("No changes found, user is up to date")
      return null
    } else {
      warning(`Found ${changes.length} change(s) for ID: ${apiUser.id}`)
      console.log(changes)
      return changes
    }
  } catch (error) {
    warning("Error while looking for changes")
    throw error
  }
}

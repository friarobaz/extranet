import { check, success, warning, black } from "./log"
import _ from "lodash"

const LOG_INDENT = 0
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

export const getUserChanges = (apiUser, firestoreUser, log = false) => {
  if (!apiUser || !firestoreUser) return
  if (log) check("Looking for changes in user", LOG_INDENT)
  let changes = []
  for (const field of CAF_FIELDS) {
    if (!_.isEqual(apiUser[field], firestoreUser[field])) {
      changes.push(field)
    }
  }
  if (!changes.length) {
    if (log) success("No changes found, user is up to date", LOG_INDENT)
    return null
  } else {
    warning(`Found ${changes.length} change(s)`, LOG_INDENT)
    console.log(changes)
    return changes
  }
}

import { check, success, warning, black } from "../log"
import _ from "lodash"

const LOG_INDENT = 1

function getObjectDiff(obj1, obj2) {
  const diff = Object.keys(obj1).reduce((result, key) => {
    if (!obj2.hasOwnProperty(key)) {
      result.push(key)
    } else if (_.isEqual(obj1[key], obj2[key])) {
      const resultKeyIndex = result.indexOf(key)
      result.splice(resultKeyIndex, 1)
    }
    return result
  }, Object.keys(obj2))
  return diff
}

export const areIdentical = (a, b, log = true) => {
  if (log) check(`Comparing objects`, LOG_INDENT)
  if (!a && !b) {
    if (log) warning(`No objects to compare`, LOG_INDENT)
    return
  }
  if (!a || !b) {
    if (log) warning(`Only one object found`, LOG_INDENT)
    return false
  }

  const identical = _.isEqual(a, b)

  if (identical) {
    if (log) success(`Objects are identical`, LOG_INDENT)
    return true
  } else {
    //if not identical
    const differences = getObjectDiff(a, b)
    if (log) warning(`Found ${differences.length} differences`, LOG_INDENT)

    // for each difference
    for (const diff of differences) {
      //if deep
      if (typeof a[diff] == "object" && typeof b[diff] == "object") {
        const deepDiff = getObjectDiff(a[diff], b[diff])
        if (log) black(`${diff} >> ${deepDiff}`)
        const table = {
          A: a[diff][deepDiff],
          B: b[diff][deepDiff],
        }
        if (log) console.table(table)
      }

      //if shallow
      else {
        if (log) black(diff)
        const table = {
          A: a[diff],
          B: b[diff],
        }
        if (log) console.table(table)
      }
    } // end for

    return false
  }
}

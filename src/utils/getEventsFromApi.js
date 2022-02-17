import { getDataFromApi } from "./getDataFromApi"
import { check, success, warning } from "./log"

export const getEventsFromApi = async () => {
  console.group()
  const url = `/.netlify/functions/get-events?id=7421`
  check(`Getting events from API`)
  try {
    const data = await getDataFromApi(url)
    //success(`Found ${users.length} users`)
    console.log(data)
    console.groupEnd()
    return data
  } catch (error) {
    warning("Events not found")
    throw error
  }
}

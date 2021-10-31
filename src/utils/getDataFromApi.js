import { getApiPassword } from "./getApiPassword"
import { check, success, warning } from "./log"
const LOG_INDENT = 2

export const getDataFromApi = async (url) => {
  let password, data

  check("Getting password from Firestore", LOG_INDENT)
  try {
    password = await getApiPassword()
    success("Password found", LOG_INDENT)
  } catch (error) {
    warning("Password not found", LOG_INDENT)
    console.error(error)
  }
  //add password to url
  const newUrl = url + `&password=${password}`

  check("Fetching data from API", LOG_INDENT)
  try {
    const response = await fetch(newUrl)
    data = await response.json()
    success("Data retrieved", LOG_INDENT)
    return data
  } catch (error) {
    warning("Failed to fetch data", LOG_INDENT)
    console.error(error)
    return
  }
}

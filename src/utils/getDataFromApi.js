import { getApiPassword } from "./getApiPassword"
import { check, success, warning } from "./log"

export const getDataFromApi = async (url) => {
  console.group()
  let password, data
  check("Fetching data from API")
  try {
    password = await getApiPassword()
    //add password to url
    const newUrl = url + `&password=${password}`
    const response = await fetch(newUrl)
    data = await response.json()
    success("Data retrieved")
    console.groupEnd()
    return data
  } catch (error) {
    warning("Failed to fetch data")
    throw error
  }
}

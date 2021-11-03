import { getApiPassword } from "./getApiPassword"
import { check, success, warning } from "./log"

export const getDataFromApi = async (url, parent_indent = 0) => {
  const indent = parent_indent + 1
  let password, data
  check("Fetching data from API", indent)
  try {
    password = await getApiPassword(indent)
    //add password to url
    const newUrl = url + `&password=${password}`
    const response = await fetch(newUrl)
    data = await response.json()
    success("Data retrieved", indent)
    return data
  } catch (error) {
    warning("Failed to fetch data", indent)
    throw error
  }
}

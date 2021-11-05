import { check, success, warning } from "./log"

export const makeStats = async (users) => {
  console.group()
  check("Making new stats")
  if (!users) throw "No users to make stats"
  try {
    const stats = {
      date: dayjs().format("YYYY-MM-DD"),
      time: dayjs().format("HH:MM:ss"),
      nbOfUsers: users.length,
      women: users.filter((user) => user.sex == "female").length,
      men: users.filter((user) => user.sex == "male").length,
    }
    success("New stats created")
    console.groupEnd()
    return stats
  } catch (error) {
    warning("Could not make new stats")
    throw error
  }
}

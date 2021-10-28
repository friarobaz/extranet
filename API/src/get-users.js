import { getClient, getAuth, getUsers } from "./soap"
import { isPasswordOk } from "./auth"

export const handler = async (event, context) => {
  if (!isPasswordOk(event)) {
    return { statusCode: 401, body: "Unauthorized" }
  }

  const clubId = event.queryStringParameters.id

  if (!clubId) {
    return {
      statusCode: 404,
      body: "Parameter `id` missing",
    }
  }

  const client = await getClient()
  const auth = await getAuth(client)
  const users = await getUsers(client, auth, clubId)

  return {
    statusCode: 200,
    body: JSON.stringify({
      users,
    }),
  }
}

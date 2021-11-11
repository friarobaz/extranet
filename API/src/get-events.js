import { getClient, getAuth, getEvents } from "./soap"
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
  const events = await getEvents(client, auth, clubId)

  return {
    statusCode: 200,
    body: JSON.stringify({
      events,
    }),
  }
}

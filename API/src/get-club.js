import { getClient, getAuth, getClub } from "./soap"

export const handler = async (event, context) => {
  const clubId = event.queryStringParameters.id

  if (!clubId) {
    return {
      statusCode: 404,
      body: "Parameter `id` missing",
    }
  }

  const client = await getClient()
  const auth = await getAuth(client)
  const club = await getClub(client, auth, clubId)

  return {
    statusCode: 200,
    body: JSON.stringify({
      club,
    }),
  }
}

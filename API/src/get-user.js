import { getClient, getAuth, getUser } from "./soap"

export const handler = async (event, context) => {
  //const userId = event.queryStringParameters?.id
  const userId = "742120190080"

  if (!userId) {
    return {
      statusCode: 404,
      body: "Parameter `id` missing",
    }
  }

  const client = await getClient()
  const auth = await getAuth(client)
  const user = await getUser(client, auth, userId)

  return {
    statusCode: 200,
    body: JSON.stringify({
      user,
    }),
  }
}

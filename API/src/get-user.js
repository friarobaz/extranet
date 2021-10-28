import { getClient, getAuth, getUser } from "./soap"

export const handler = async (event, context) => {
  const id = event.queryStringParameters?.id

  if (!id) {
    return {
      statusCode: 404,
      body: "Parameter `id` missing",
    }
  }

  const client = await getClient()
  const auth = await getAuth(client)
  const user = await getUser(client, auth, id)

  return {
    statusCode: 200,
    body: JSON.stringify({
      user,
    }),
  }
}

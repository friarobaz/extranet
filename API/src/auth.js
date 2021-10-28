export const isPasswordOk = (event) =>
  event.queryStringParameters.password === process.env.API_PASSWORD

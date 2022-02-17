const functions = require("firebase-functions")
const admin = require("firebase-admin")
admin.initializeApp()

exports.addAdminRole = functions.https.onCall((data, context) => {
  // check user is not null
  if (!context.auth) {
    return { errorInfo: "Vous devez être connecté pour faire ca" }
  }
  // check request is made by an admin
  if (context.auth.token.admin !== true) {
    return { errorInfo: "If faut être admin pour ajouter un admin" }
  }
  // get user and add admin custom claim
  return admin
    .auth()
    .getUserByEmail(data.email)
    .then((user) => {
      return admin.auth().setCustomUserClaims(user.uid, {
        admin: true,
      })
    })
    .then(() => {
      return {
        message: `${data.email} est maintenant administrateur`,
      }
    })
    .catch((err) => {
      return err
    })
})

exports.removeAdminRole = functions.https.onCall((data, context) => {
  // check user is not null
  if (!context.auth) {
    return { errorInfo: "Vous devez être connecté pour faire ca" }
  }
  // check request is made by an admin
  if (context.auth.token.admin !== true) {
    return { errorInfo: "If faut être admin pour supprimer un admin" }
  }
  // get user and add admin custom claim
  return admin
    .auth()
    .getUserByEmail(data.email)
    .then((user) => {
      return admin.auth().setCustomUserClaims(user.uid, {
        admin: false,
      })
    })
    .then(() => {
      return {
        message: `${data.email} n'est  plus administrateur`,
      }
    })
    .catch((err) => {
      return err
    })
})

exports.sendEmail = functions.https.onCall((dataUnused, context) => {
  const mailgun = require("mailgun-js")
  const DOMAIN = "sandboxa2f29c8a050345d1b5260338db69ffd7.mailgun.org"
  const mg = mailgun({
    apiKey: "9e93c911ec6ad9a4ddc9021d69e1cb35-adf6de59-fecdf81e",
    domain: DOMAIN,
  })
  const data = {
    from: "Mailgun Sandbox <postmaster@sandboxa2f29c8a050345d1b5260338db69ffd7.mailgun.org>",
    to: "friarobaz@gmail.com",
    subject: "Hello",
    text: "Testing some Mailgun awesomness!",
  }
  mg.messages().send(data, function (error, body) {
    console.log(body)
  })
})

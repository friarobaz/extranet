const capitalize = (string) => {
  return string.charAt(0).toUpperCase() + string.toLowerCase().slice(1)
}
const getActivities = (user) => {
  if (!user.activites_pratiquees.item) return null
  if (user.activites_pratiquees.item.length === undefined)
    return user.activites_pratiquees.item.description.$value.toLowerCase()
  const refs = user.activites_pratiquees.item
  const activities = refs.map((ref) => ref.description.$value.toLowerCase())
  if (activities === undefined) return null
  return activities
}
const getLibelles = (array) => {
  if (!array.item) return null
  const getLibelle = (object) => {
    if (object.libelle.$value) return object.libelle.$value
    return object.libelle_libre.$value
  }
  //if only one
  if (array.item.length === undefined) return getLibelle(array.item)
  const libelles = array.item.map((ref) => getLibelle(ref))
  return libelles
}

export const makeUserObjectFromAPI = (userFromAPI) => {
  console.log(`Creating user for id ${userFromAPI.id.$value}`)
  const value = (field) => {
    if (!userFromAPI[field].$value) return null
    return userFromAPI[field].$value
  }
  let newObject = {
    firstName: capitalize(value("prenom")),
    lastName: value("nom").toUpperCase(),
    accidentContact: {
      name: value("accident_qui"),
      phoneNumber: value("accident_tel"),
    },
    activities: getActivities(userFromAPI),
    activities_full: userFromAPI.activites_pratiquees,
    address: {
      line1: value("adresse1"),
      line2: value("adresse2"),
      line3: value("adresse3"),
      line4: value("adresse4"),
      zipCode: value("codepostal"),
      city: value("ville"),
    }, //end adress
    insurance: {
      acr: {
        subscibed: value("assurance_acr") == 1 ? true : false,
        date: value("date_assurance_acr"),
      },
      ap: {
        subscibed: value("assurance_ap") == 1 ? true : false,
        date: value("date_assurance_ap"),
      },
      monde: {
        subscibed: value("assurance_monde") == 1 ? true : false,
        date: value("date_assurance_monde"),
      },
      paralpinisme: {
        subscibed: value("assurance_paralpinisme") == 1 ? true : false,
        date: value("date_assurance_paralpinisme"),
      },
    }, //end insurance
    licenceType: value("categorie"),
    familyLeader: value("chef_famille"),
    signupDate: value("date_inscription"),
    dateOfBirth: value("date_naissance"),
    diplomas: getLibelles(userFromAPI.diplomes),
    diplomas_full: userFromAPI.diplomes,
    email: value("email"),
    roles: getLibelles(userFromAPI.fonctions),
    roles_full: userFromAPI.fonctions,
    id: value("id"),
    userId: value("adherent"),
    clubId: value("idclub"),
    signedupOnline: value("inscrit_par_internet") == 1 ? true : false,
    banReason: value("motif_radiation"),
    phoneNumbers: [value("portable"), value("tel")],
    sex: value("qualite") == "M" ? "male" : "female",
    clubActivites_full: userFromAPI.activites_club,
    publicKey: value("cle_publique"),
  } //end new object
  console.log(newObject)
  return newObject
}

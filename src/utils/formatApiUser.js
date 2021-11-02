import _ from "lodash"

const getActivities = (user) => {
  //if no activities
  if (!user.activites_pratiquees.item) return null

  //if only one
  if (user.activites_pratiquees.item.length === undefined)
    return user.activites_pratiquees.item.description.$value.toUpperCase()

  const refs = user.activites_pratiquees.item
  const activities = refs.map((ref) => ref.description.$value.toUpperCase())
  if (activities === undefined) return null
  return activities
}

const getLibelle = (object) => {
  if (object.libelle.$value) return object.libelle.$value
  return object.libelle_libre.$value
}

const getLibelles = (array) => {
  if (!array.item) return null

  //if only one
  if (array.item.length === undefined) return getLibelle(array.item)

  const libelles = array.item.map((ref) => getLibelle(ref))
  return libelles
}

const getDiplomas = (user) => {
  //if no diplomas
  if (!user.diplomes.item) return null

  //if only one
  if (user.diplomes.item.length === undefined) {
    const diploma = {
      name: user.diplomes.item.libelle.$value,
      date: user.diplomes.item.obtention.$value,
      code: user.diplomes.item.diplome.$value,
    }
    return diploma
  }

  //if multiple diplomas
  let diplomas = []
  for (const diploma of user.diplomes.item) {
    diplomas.push({
      name: diploma.libelle.$value,
      date: diploma.obtention.$value,
      code: diploma.diplome.$value,
    })
  }
  return diplomas
}

export const formatApiUser = (userFromAPI) => {
  //console.log(`Formatting user`)
  const value = (field) => {
    if (!userFromAPI[field].$value) return null
    return userFromAPI[field].$value
  }
  let newObject = {
    firstName: value("prenom").toUpperCase(),
    lastName: value("nom").toUpperCase(),
    name: value("prenom").toUpperCase() + " " + value("nom").toUpperCase(),
    accidentContact: {
      name: value("accident_qui"),
      phoneNumber: value("accident_tel"),
    },
    activities: getActivities(userFromAPI),
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
    signedupThisYear: value("date_inscription") != "0000-00-00",
    dateOfBirth: value("date_naissance"),
    diplomas: getDiplomas(userFromAPI),
    email: value("email"),
    roles: getLibelles(userFromAPI.fonctions),
    id: value("id"),
    userId: value("adherent"),
    clubId: value("idclub"),
    signedupOnline: value("inscrit_par_internet") == 1 ? true : false,
    banReason: value("motif_radiation"),
    phoneNumbers: [value("portable"), value("tel")],
    sex: value("qualite") == "M" ? "male" : "female",
    publicKey: value("cle_publique"),
  } //end new object
  //console.log(newObject)
  //console.log("Done formatting")
  return newObject
}

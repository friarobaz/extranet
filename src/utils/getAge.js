export const getAge = (dateOfBirth) => {
  if (!dateOfBirth) throw "No date of birth input, can't figure out age"
  const birthday = dayjs(dateOfBirth, "YYYY-MM-DD")
  const today = dayjs()
  const age = today.diff(birthday, "year", true)
  //keep one decimal
  const roundedAge = Math.round(age * 10) / 10
  return roundedAge
}

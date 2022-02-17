
<script>
  import { httpsCallable } from "firebase/functions"
    import { functions } from '../utils/firebase'
console.log('hellolol')
const sendEmail = httpsCallable(functions, 'sendEmail');
sendEmail().then(result => {
           console.log(result)
        }).catch(err=>{
            console.error(err)
        })

</script>





























<!-- <script>
import { collection, getDocs, query, where, orderBy, limit } from "firebase/firestore"
import { db } from "../utils/firebase"
import { check, success, warning } from "../utils/log"
import {AGE_GROUPS, YEARS} from '../utils/climbingLessons'
import {makePupil} from '../utils/climbingLessons'
import {getUserFromFirestore} from '../utils/getUserFromFirestore'

let selectedYears = YEARS[0]
let selectedAgeGroup = AGE_GROUPS[0].name
export const queryUsersFromFirestore = async (years, ageGroup) => {
  console.group()
  check(`Getting users from Firestore`)
  const users = []
  try {
    const q = query(
            collection(db, "users"),
            where(`climbingLessons.${years}.signedup`, '==', true),
            where(`climbingLessons.${years}.ageGroup`, '==', ageGroup),
            //orderBy('name'),
            limit(10)
        )
        const usersSnapshot = await getDocs(q);
    usersSnapshot.forEach((user) => {
        console.log(user.data().name)
        users.push(user.data())
    })
    success(`Found ${users.length} users`)
    console.log(users)
    console.groupEnd()
    return users
  } catch (error) {
    warning("Users not found")
    console.error(error)
    return
  }
}



const refresh = async () => {
  queryUsersFromFirestore(selectedYears, selectedAgeGroup)
}

console.log('test')


</script>

<select bind:value={selectedAgeGroup}>
		{#each AGE_GROUPS as ageGroup}
			<option value={ageGroup.name}>
				{ageGroup.name}
			</option>
		{/each}
</select>

<select bind:value={selectedYears}>
		{#each YEARS as year}
			<option value={year}>
				{year}
			</option>
		{/each}
</select>

<button on:click={refresh}>Refresh</button>

 -->
<script>
    import { collection, addDoc, getDoc, query, where, getDocs } from "firebase/firestore"; 
    import {db} from '../utils/firebase'
    import {makeUserObjectFromAPI} from '../utils/makeUserObjectFromAPI'

    
    import { getApiPassword } from '../utils/get-api-password'
    export let params = {id:null}
    const clubId = params.id
    

    const isClimber = (user) => {
        const activities = getActivities(user)
        console.log(activities)
        return activities.includes("escalade")
    }

    const getJules = async () => {
        const url = `/.netlify/functions/get-user?id=742120190080&password=bazinga`
        const response = await fetch(url)
        const data = await response.json()
        const user = data.user
        return user
    }

    const getUsersFromAPI = async () => {
        const password = await getApiPassword()
        const url = `/.netlify/functions/get-users?id=${clubId}&password=${password}`
        const response = await fetch(url)
        const data = await response.json()
        const users = data.users
        const result = users
        console.log(result)
        return result
    }
    

    const getUsersFromFirestore = async () => {
        const q = query(collection(db, "users"), where("firstName", "!=", null));
        const querySnapshot = await getDocs(q);
        let users = []
        querySnapshot.forEach((doc) => {
            users.push(doc.data())
        })
        return users
    }

    const copyDatabaseToFirestore = async () => {
        const users = await getUsers()
        //const jules = await getJules()
        //const users = [jules]
        for (const user of users) {
            //const docRef = await addDoc(collection(db, "users"), makeUserObjectFromAPI(user))
            console.log("Document written with ID: ", docRef.id)
        }
    }

    const test = async () => {
        const users = await getUsersFromFirestore()
        let climbers = 0
        for (const user of users) {
            if (user.activities.includes("escalade")) {
                climbers ++
            }
        }
        console.log(`There are ${climbers} climbers`)
    }

    //copyDatabaseToFirestore()
    //test()

    //let promise = getUsers()
</script>

<!-- USERS
{#await promise}
	<p>...waiting</p>
{:then users}
    <ul>
        {#each users as user}
            <li>{user.nom.$value} {user.prenom.$value} {isClimber(user)}</li>
        {/each}
    </ul>
{:catch error}
	<p style="color: red">{error.message}</p>
{/await} -->
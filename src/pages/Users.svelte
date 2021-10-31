<script>
    import { collection, addDoc, getDoc, query, where, getDocs, orderBy, setDoc, doc } from "firebase/firestore"; 
    import {db} from '../utils/firebase'
    import {makeUserObjectFromAPI} from '../utils/makeUserObjectFromAPI'
    import { getUserFromApi } from '../utils/getDataFromApi'

    
    import { getApiPassword } from '../utils/getApiPassword'
    export let params = {id:null}
    const clubId = params.id

    const ACTIVITIES = ['alpinisme', 'canyon', 'cascade de glace', 'escalade', 'marche nordique', 'randonnee', 'raquettes', 'ski alpin', 'ski nordique', 'ski de randonnee', 'slackline', 'speleologie', 'surf des neiges', 'telemark', 'trail', 'velo de montagne', 'via ferrata', 'sports aeriens' ]
    

    const isClimber = (firestoreUser) => {
        const activities = firestoreUser.activities
        return activities.includes("escalade")
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

    const getUsersByActivity = async (activity) => {
        const q = query(
            collection(db, "users"),
            where("activities", "array-contains", activity),
            where("signupDate", '!=', '0000-00-00')
        );
        const querySnapshot = await getDocs(q);
        let users = []
        querySnapshot.forEach((doc) => {
            users.push(doc.data())
        })
        return users
    }

    const getRecentUsers = async () => {
        const q = query(
            collection(db, "users"),
            where("signupDate", '!=', '0000-00-00')
        );
        const querySnapshot = await getDocs(q);
        let users = []
        querySnapshot.forEach((doc) => {
            users.push(doc.data())
        })
        return users
    }

    const compareUserBetweenAPIandFirestore = async (userId) => {

    }


    const copyDatabaseToFirestore = async () => {
        const users = await getUsersFromAPI()
        //const jules = await getJules()
        //const users = [jules]
        let x = 0
        for (const user of users) {
            //const docRef = await addDoc(collection(db, "users"), makeUserObjectFromAPI(user))
            //await setDoc(doc(db, "users", user.id.$value), makeUserObjectFromAPI(user));
            //console.log("Document written with ID: ", docRef.id)
            x++
        }
        console.log(x)
    }

    const usersByActivity = async () => {
        const recentUsers = await getRecentUsers()
        let usersByActivity = []
        for (const activity of ACTIVITIES) {
            const users = await getUsersByActivity(activity)
            const count = users.length
            usersByActivity.push({name:activity, count:count})
        }
        let sorted = usersByActivity.sort(function(a, b){return a.count - b.count});
        return {usersByActivity:sorted, total:recentUsers.length}
    }
    //copyDatabaseToFirestore()
    //let promise = usersByActivity()

</script>

<!-- USERS
{#await promise}
	<p>...waiting</p>
{:then response}
    <ul>
        {#each response.usersByActivity as activity}
            <li>{activity.name} : {activity.count} ({Math.round(activity.count/response.total*100)}%)</li>
        {/each}
    </ul>
{:catch error}
	<p style="color: red">{error.message}</p>
{/await} -->

<style>
    li{
        text-align: right;
    }
</style>
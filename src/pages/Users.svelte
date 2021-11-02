<script>
    import { collection, getDoc, query, where, getDocs, orderBy, doc } from "firebase/firestore"
    import {db} from '../utils/firebase'
    
    const ACTIVITIES = ['alpinisme', 'canyon', 'cascade de glace', 'escalade', 'marche nordique', 'randonnee', 'raquettes', 'ski alpin', 'ski nordique', 'ski de randonnee', 'slackline', 'speleologie', 'surf des neiges', 'telemark', 'trail', 'velo de montagne', 'via ferrata', 'sports aeriens' ]
    

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

    const queryRecentUsers = async (field='clubId', operator='==', value='7421') => {
        const q = query(
            collection(db, "users"),
            where("signupDate", '!=', '0000-00-00'),
            where(field, operator, value)
        );
        const querySnapshot = await getDocs(q);
        let users = []
        querySnapshot.forEach((doc) => {
            users.push(doc.data())
        })
        return users
    }
    const queryUsers = async (field='clubId', operator='==', value='7421') => {
        const q = query(
            collection(db, "users"),
            where(field, operator, value)
        );
        const querySnapshot = await getDocs(q);
        let users = []
        querySnapshot.forEach((doc) => {
            users.push(doc.data())
        })
        return users
    }
    const getAllRecentUsers = async () => {
        const q = query(
            collection(db, "users"),
            where("signupDate", '!=', '0000-00-00'),
        )
        const querySnapshot = await getDocs(q);
        let users = []
        querySnapshot.forEach((doc) => {
            users.push(doc.data())
        })
        return users
    }


   /*  const usersByActivity = async () => {
        const recentUsers = await getRecentUsers()
        let usersByActivity = []
        for (const activity of ACTIVITIES) {
            const users = await getUsersByActivity(activity)
            const count = users.length
            usersByActivity.push({name:activity, count:count})
        }
        let sorted = usersByActivity.sort(function(a, b){return a.count - b.count});
        return {usersByActivity:sorted, total:recentUsers.length}
    } */
    

    let promise = getAllRecentUsers()

</script>

USERS
{#await promise}
	<p>...waiting</p>
{:then users}
    <ul>
        {#each users as user}
            <li class:female={user.sex=='female'}>
                <div>{user.firstName} {user.lastName}</div>
            </li>
            
        {/each}
    </ul>
{:catch error}
	<p style="color: red">{error.message}</p>
{/await}

<style>
    li{
        text-align: right;
    }
    .female{
        color: rgb(128, 0, 122);
    }
</style>
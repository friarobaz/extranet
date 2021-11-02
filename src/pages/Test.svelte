<script>
    import { collection, getDoc, query, where, getDocs, orderBy, doc, limit } from "firebase/firestore"
    import {db} from '../utils/firebase'
    import { getUserFromFirestore } from "../utils/getUserFromFirestore"
    import _ from "lodash"
import { getUsersFromApi } from "../utils/getUsersFromApi";
    export let params = {id:null}
    const userId = params.id

    const queryUsers = async (field='clubId', operator='==', value='7421') => {
        const q = query(
            collection(db, "users"),
            where(field, operator, value),
        );
        const querySnapshot = await getDocs(q);
        let users = []
        querySnapshot.forEach((doc) => {
            users.push(doc.data())
        })
        return users
    }

    const test = async (word, recent) => {
        let users = []
        const getFunc = () => {
            if(recent) return where('signedupThisYear', '==', true)
            return where('name', '>=', word)
        }
        const q = query(
            collection(db, "users"),
            where('name', '>=', word),
            where('name', '<=', word+ '\uf8ff'),
            getFunc(),
            orderBy('name'),
            limit(10)
        )
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            users.push(doc.data())
        })
        return users
    }

    $: usersToDisplay = []
    $: recent = true
    let input = ''
    
    $: if(input.length>=2){
        test(input.toUpperCase(), recent).then(x => usersToDisplay=x)
    }else{
        usersToDisplay = []
    }

    function handleClick() {
        console.log('clicked')
    }
    //run()


</script>

<form>
    A jour :<input type="checkbox" bind:checked={recent}><br>
    <input type="text" bind:value={input} autofocus>
    
</form>


Resultats: {usersToDisplay.length} <br>

<ul>
    {#each usersToDisplay as user, i}
    <li style={`opacity:${(10-i)/10}`}><a href={`#/user/${user.id}`}>{_.capitalize(user.firstName)} {user.lastName}</a></li>
    {/each}
</ul>


<!-- {#await promise}
	<p>waiting for the promise to resolve...</p>
{:then users}
	<ul>
        {#each users as user}
            <li>{user.firstName} {user.lastName}</li>
        {/each}
    </ul>
{:catch error}
	<p>Something went wrong: {error.message}</p>
{/await} -->

<style>
    .more{
        color:grey;
    }
</style>


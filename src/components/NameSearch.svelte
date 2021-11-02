<script>
    import { collection, getDoc, query, where, getDocs, orderBy, doc, limit } from "firebase/firestore"
    import {db} from '../utils/firebase'
    import _ from "lodash"

    const updateUserList = async (string, recent) => {
        let userList = []
        const getFunc = () => {
            if(recent) return where('signedupThisYear', '==', true)
            return where('name', '>=', string)
        }
        const q = query(
            collection(db, "users"),
            where('name', '>=', string),
            where('name', '<=', string+ '\uf8ff'),
            getFunc(),
            orderBy('name'),
            limit(10)
        )
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            userList.push(doc.data())
        })
        return userList
    }

    $: usersToDisplay = []
    $: recent = true
    let input = ''
    
    $: if(input.length>=2){
        updateUserList(input.toUpperCase(), recent).then(userList => usersToDisplay=userList)
    }else{
        usersToDisplay = []
    }

</script>

<form>
    A jour :<input type="checkbox" bind:checked={recent}><br>
    <label for="name">Nom :</label>
    <input type="text" id='name' bind:value={input} autofocus>
</form>


Resultats: {usersToDisplay.length} <br>

<ul>
    {#each usersToDisplay as user, i}
    <li style={`opacity:${(10-i)/10}`}><a href={`#/user/${user.id}`}>{_.capitalize(user.firstName)} {user.lastName}</a></li>
    {/each}
</ul>

<style>
    
</style>


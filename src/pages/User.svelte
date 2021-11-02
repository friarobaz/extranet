<script>
    import { getUserFromFirestore } from "../utils/getUserFromFirestore"
    export let params = {id:null}
    const userId = params.id
    let promise = getUserFromFirestore(userId)
</script>

{#await promise}
	<p>Attendez deux secondes...</p>
{:then user}
<div>ID: {user.id}</div>
<div>{user.firstName} {user.lastName}</div>
<div>{user.signupDate}</div>
	
{:catch error}
	<p>Error: {error.message}</p>
{/await}




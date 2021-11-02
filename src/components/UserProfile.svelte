<script>
    import { getUserFromFirestore } from "../utils/getUserFromFirestore"
    export let userId = null
    let promise = getUserFromFirestore(userId)
</script>

{#if userId}
	{#await promise}
	<p>Attendez deux secondes...</p>
    {:then user}
    <div>ID: {user.id}</div>
    <div>{user.firstName} {user.lastName}</div>
    <div>{user.signupDate}</div>
        
    {:catch error}
        <p>Error: {error.message}</p>
    {/await}
{/if}



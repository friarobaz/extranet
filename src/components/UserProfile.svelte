<script>
    import { getUserFromFirestore } from "../utils/getUserFromFirestore"
    import _ from "lodash"
    export let userId = null
    $: user = null
    $: error = null
    let f
    $: if(user) {f = user.sex == 'female'}
    getUserFromFirestore(userId).then((usr)=>{
        user = usr
        console.log('success')
    }).catch(e=>error = e)
</script>

{#if userId}
	{#if user}
        <div>ID: {user.id}</div>
        <div>{_.capitalize(user.firstName)} {user.lastName}</div>
        <div>Inscrit{#if f}e{/if} le : {user.signupDate}</div>
    {:else}
        {#if error}
            <div style="color:red">{error}</div>
        {:else}
            ...
        {/if}
    {/if}
{:else}
    Pas d'ID !
{/if}

<!-- 
{#await promise}
	<p>Attendez deux secondes...</p>
    {:then user}
    <div>ID: {user.id}</div>
    <div>{_.capitalize(user.firstName)} {user.lastName}</div>
    <div>{user.signupDate}</div>
        
    {:catch error}
        <p>Error: {error.message}</p>
    {/await} -->
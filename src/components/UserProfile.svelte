<script>
    import { getUserFromFirestore } from "../utils/getUserFromFirestore"
    import ErrorMessage from "./ErrorMessage.svelte";
    import _ from "lodash"
    export let userId = null
    $: user = null
    $: error = null
    let f
    $: if(user) {f = user.sex == 'female'}
    getUserFromFirestore(userId, 0, true).then((usr)=>{
        user = usr
    }).catch(e=>{error = e})
</script>

{#if userId}
	{#if user}
        <div>ID: {user.id}</div>
        <div>{_.capitalize(user.firstName)} {user.lastName}</div>
        <div>Inscrit{#if f}e{/if} le : {user.signupDate}</div>
        <div>Email: {user.email}</div>
    {:else}
        {#if error}
            <ErrorMessage error={error}/>
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
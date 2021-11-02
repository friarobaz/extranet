<script>
    import UserProfile from "../components/UserProfile.svelte"
    import NameSearch from "../components/NameSearch.svelte"
    export let params = {id:null}
    $: id = params.id
</script>

{#if id}
	<UserProfile bind:userId={id}/>
{:else}
    <NameSearch />
{/if}




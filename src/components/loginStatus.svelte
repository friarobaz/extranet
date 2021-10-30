<script>
    import LogoutButton from './LogoutButton.svelte'
    export let user = undefined
</script>

{#if user}
	<div>{user.email} <LogoutButton /></div>
    
{:else}
<div>
    Vous n'êtes pas connectés.
    <a href="#/login">Se connecter</a>
</div>
	
{/if}
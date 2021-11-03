<script>
    import LogoutButton from './LogoutButton.svelte'
    import {currentUser, loggedin} from '../utils/stores'
</script>

{#if $loggedin}
	<div>{$currentUser.email} <LogoutButton /></div>
{:else}
<div>
    Vous n'êtes pas connectés.
    <a href="#/login">Se connecter</a>
</div>
	
{/if}
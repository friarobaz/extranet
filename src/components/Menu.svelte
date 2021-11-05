<script>
    import{loggedin, admin, verified} from '../utils/stores'
    import{warning} from '../utils/log'
    const pages = [
        {name: 'Accueil', url: '#/home', auth:'public'},
        {name: 'Se connecter', url: '#/login', auth:'public'},
        {name: 'Créer un compte', url: '#/signup', auth:'public'},
        {name: 'Réinitialiser votre mot de passe', url: '#/resetPassword', auth:'public'},
        {name: 'Utilisateur', url: '#/user', auth:'verified'},
        {name: 'Club', url: '#/club', auth:'verified'},
        {name: 'Vérifier email', url: '#/verifyEmail', auth:'loggedin'},
        {name: 'Users', url: '#/users', auth:'verified'},
        {name: 'Update', url: '#/updateFirestore', auth:'admin'},
        {name: 'Rendre admin', url: '#/makeAdmin', auth:'admin'},
        {name: 'Mes profils', url: '#/myProfiles', auth:'verified'},
        {name: 'Statistiques', url: '#/stats', auth:'public'},
        {name: 'Test', url: '#/test', auth:'public'},
    ]
    $:isAuthorized = (page) => {
        if(page.auth=='public') return true
        if(page.auth=='loggedin') return $loggedin
        if(page.auth=='verified') return $verified
        if(page.auth=='admin') return $admin
        warning('Could not find authorisation, look in Menu.svelte')
    }
</script>

<ul>
	{#each pages as page}
        {#if isAuthorized(page)}
            <li><a href="{page.url}">{page.name}</a></li>
        {:else}
            <li class='disabled' on:click={()=>{alert('Connectez vous pour accéder à ces foncionnalités')}}><a href="{page.url}">{page.name}</a></li>
        {/if}
	{/each}
</ul>

<style>
    .disabled a{
        color: grey;
        cursor: not-allowed;
    }
    .disabled:hover a{
        text-decoration: underline;
    }
</style>
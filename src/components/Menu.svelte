<script>
    const pages = [
        {name: 'Accueil', url: '#/home', public: true},
        {name: 'Se connecter', url: '#/login', public: true},
        {name: 'Créer un compte', url: '#/signup', public: true},
        {name: 'Réinitialiser votre mot de passe', url: '#/resetPassword', public: true},
        {name: 'Utilisateur', url: '#/user/742120190080', public: false},
        {name: 'Club', url: '#/club', public: false},
        {name: 'Vérifier email', url: '#/verifyEmail', public: false},
        {name: 'Users', url: '#/users', public: false},
        {name: 'Update', url: '#/updateFirestore', public: false},
        {name: 'Test', url: '#/test', public: false},
    ]
    export let user = null
</script>

<ul>
	{#each pages as page}
        {#if user || page.public}
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
<script>
    const pages = [
        {name: 'Accueil', url: '/'},
        {name: 'Login', url: '#/login'},
        {name: 'Utilisateur', url: '#/user/742120190080'},
        {name: 'Club', url: '#/club/7421'},

    ]
</script>

<ul>
	{#each pages as page}
		<li><a href="{page.url}">{page.name}</a></li>
	{/each}
</ul>

<style>

</style>
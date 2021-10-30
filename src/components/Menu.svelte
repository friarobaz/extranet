<script>
    const pages = [
        {name: 'Accueil', url: '/'},
        {name: 'Login', url: '#/login'},
        {name: 'Utilisateur', url: '#/user'},
        {name: 'Club', url: '#/club'},

    ]
</script>

<ul>
	{#each pages as page}
		<li><a href="{page.url}">{page.name}</a></li>
	{/each}
</ul>

<style>

</style>
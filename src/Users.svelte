<script>    
    const clubId = '7421'
    const url = `/.netlify/functions/get-users?id=${clubId}&password=${password}`

    const getUsers = async () => {
        const response = await fetch(url)
        const data = await response.json()
        return data.users
    }

    let promise = getUsers()
</script>


{#await promise}
	<p>...waiting</p>
{:then users}
    <ul>
        {#each users as user}
            <li>{user.nom.$value}</li>
        {/each}
    </ul>
{:catch error}
	<p style="color: red">{error.message}</p>
{/await}
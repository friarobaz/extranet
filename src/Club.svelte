<script>    

    const clubId = '7421'
    const url = `/.netlify/functions/get-club?id=${clubId}&password=${password}`
    
    const getClub = async () => {
        const response = await fetch(url)
        const data = await response.json()
        return {
            name:data.club.nomcomp.$value
        }
    }

    let promise = getClub()
</script>


{#await promise}
	<p>...waiting</p>
{:then club}
	<p>{club.name}</p>
{:catch error}
	<p style="color: red">{error.message}</p>
{/await}
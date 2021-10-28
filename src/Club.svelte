<script>    
    const clubId = '7421'
    const id = clubId
    const url = `/.netlify/functions/get-club?id=${id}`

    const getClub = async () => {
        const response = await fetch(url)
        const data = await response.json()
        console.log(data.club)
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
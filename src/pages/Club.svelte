<script>    
    import { getApiPassword } from '../utils/getApiPassword'
    
    
    const getClub = async () => {
        const password = await getApiPassword()
        const url = `/.netlify/functions/get-club?id=7421&password=${password}`
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
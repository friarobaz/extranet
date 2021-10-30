<script>    
    import { getApiPassword } from '../utils/get-api-password'
    export let params = {id:null}
    const userId = params.id
    
    const getUser = async () => {
        const password = await getApiPassword()
        const url = `/.netlify/functions/get-user?id=${userId}&password=${password}`
        const response = await fetch(url)
        const data = await response.json()
        return {
            firstName: data.user.prenom.$value,
            lastName: data.user.nom.$value
        }
    }

    let promise = getUser()
</script>


{#await promise}
	<p>...waiting</p>
{:then user}
	<p>{user.firstName} {user.lastName}</p>
{:catch error}
	<p style="color: red">{error.message}</p>
{/await}
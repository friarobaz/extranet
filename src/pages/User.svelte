<script>    
    import { getApiPassword } from '../utils/get-api-password'
    export let params = {id:null}
    const userId = params.id

    const getActivities = (user) => {
        let refs = user.activites_pratiquees.item
        let activities = refs.map(ref=>ref.description.$value.toLowerCase())
        return activities
    }
    
    const getUser = async () => {
        const password = await getApiPassword()
        const url = `/.netlify/functions/get-user?id=${userId}&password=${password}`
        const response = await fetch(url)
        const data = await response.json()
        const user = data.user
        console.log(user)
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
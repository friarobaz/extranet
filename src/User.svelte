<script>    
    import { password } from './api-password.js'
    const userId = '742120190080'
    const url = `/.netlify/functions/get-user?id=${userId}&password=${password}`

    const getUser = async () => {
        const response = await fetch(url)
        const data = await response.json()
        console.log(data.user)
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
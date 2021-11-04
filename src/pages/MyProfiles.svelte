<script>
    import { getProfiles } from '../utils/getProfiles'
    import { currentUser } from '../utils/stores'
    import UserProfile2 from '../components/UserProfile2.svelte'

    let email = $currentUser.email
    let profiles = []

    const run = async () => {
        profiles = await getProfiles(email)
    }
    run()
</script>

<div>
    <h1>Mes profils</h1>
    <input type="text" bind:value={email}>
    <button on:click={run}>RUN</button>
    
    <ul>
        {#each profiles as profile}
            <li><UserProfile2 {profile}/></li>
        {/each}
    </ul>
</div>

<style>

    li{
        padding:10px;
    }
</style>
<script>
    export let profile = null
    import _ from "lodash"
    const f = (profile.sex == 'female')
</script>

{#if profile}
    <div>ID: {profile.id}</div>
    <div>{_.capitalize(profile.firstName)} {profile.lastName}</div>
    <div>Inscrit{#if f}e{/if} le : {profile.signupDate}</div>
    <div>Email: {profile.email}</div>
{/if}


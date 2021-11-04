<script>
    export let password = ''
    let focus = false

    const handleFocus = ()=>{
        if (focus) return
        //if first time focused
        password = ''
        focus = true
    }
</script>

<label>Mot de passe :
    <input type="password" bind:value={password} required on:focus={handleFocus} class:default={!focus}/>
</label>

<style>
    .default{
        color:lightgrey
    }
    input{
        color:black
    }
</style>
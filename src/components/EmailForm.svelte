<script>
    export let email = 'votre adresse email'
    let focus = false

    const handleFocus = ()=>{
        if (focus) return
        //if first time focused
        email = ''
        focus = true
    }
</script>

<label>Adresse email :
    <input type="email" bind:value={email} required id="email" on:focus={handleFocus} class:default={!focus}/>
</label>

<style>
    .default{
        color:lightgrey
    }
    input{
        color:black
    }
</style>
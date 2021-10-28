<script>    
    const uri = '/.netlify/functions/get-club'

    const getData = async () => {
        const response = await fetch(uri)
        const data = await response.json()
        console.log(data.club)
    }

</script>
<div>
    <h2>Preferences</h2>
    Message: <input type='text'>
    <button on:click={getData}>Send Request</button>
    <div></div>
</div>
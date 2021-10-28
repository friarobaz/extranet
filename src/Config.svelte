<script>    
    const clubId = '7421'
    const userId = '742120190080'
    const id = userId
    const url = `/.netlify/functions/get-user?id=${id}`

    const getData = async () => {
        const response = await fetch(url)
        const data = await response.json()
        console.log(data.user)
    }

</script>
<div>
    <h2>Preferences</h2>
    Message: <input type='text'>
    <button on:click={getData}>Send Request</button>
    <div></div>
</div>
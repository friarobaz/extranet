<script>
    import { getAuth, signOut } from "firebase/auth"
    const auth = getAuth()
    const handleClick = (e) =>{
        e.preventDefault()
        console.log('signing out')
        signOut(auth)
    }
</script>

<button on:click={handleClick}>Se déconnecter</button>
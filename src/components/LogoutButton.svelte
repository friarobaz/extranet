<script>
    import { getAuth, signOut } from "firebase/auth"
    import {check, success, warning} from '../utils/log'
    const auth = getAuth()
    const handleClick = (e) =>{
        e.preventDefault()
        check('Signing out')
        try {
            signOut(auth)
            success(`Logged out`)
        } catch (error) {
            warning('Could not sign out')
            throw error
        }
    }
</script>

<button on:click={handleClick}>Se déconnecter</button>
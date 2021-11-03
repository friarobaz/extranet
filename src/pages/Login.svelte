<script>
    import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
    import EmailForm from "../components/EmailForm.svelte"
    import PasswordForm from "../components/PasswordForm.svelte"
    import ErrorMessage from "../components/ErrorMessage.svelte"
    import {info, check, success, warning} from '../utils/log'
    const auth = getAuth();
    let email
    let password = ''
    let errorCode = null
    
    const handleClick = (e) => {
        e.preventDefault()
        check(`trying to loggin : ${email}`)
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            success(`Logged in as ${email}`)
            console.log(userCredential.user)
            email = ''
            password = ''
            errorCode = null
        })
        .catch((error) => {
            warning('Could not login')
            errorCode = error.code
            throw error
        });
    }  
</script>

<form>
    <h3>Se connecter</h3>
    <EmailForm bind:email={email}/>
    <PasswordForm bind:password={password}/>
    <br>
    <button on:click={handleClick}>Se connecter</button>
    {#if errorCode}
        <ErrorMessage code={errorCode}/>
    {/if}
</form>
<script>
    import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
    import EmailForm from "../components/EmailForm.svelte"
    import PasswordForm from "../components/PasswordForm.svelte"
    import ErrorMessage from "../components/ErrorMessage.svelte"
    const auth = getAuth();
    let email
    let password = ''
    let error = null
    
    const handleClick = (e) => {
        e.preventDefault()
        console.log(`trying to loggin : ${email}`)
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log(`Logged in as ${email}`)
            console.log(userCredential.user)
            email = ''
            password = ''
        })
        .catch((e) => {
            console.error(e)
            error = e.code
        });
    }  
</script>

<form>
    <h3>Se connecter</h3>
    <EmailForm bind:email={email}/>
    <PasswordForm bind:password={password}/>
    <br>
    <button on:click={handleClick}>Se connecter</button>
    {#if error}
        <ErrorMessage code={error}/>
    {/if}
</form>
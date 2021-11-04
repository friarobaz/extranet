<script>
    import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
    import EmailForm from "../components/EmailForm.svelte"
    import PasswordForm from "../components/PasswordForm.svelte"
    import ErrorMessage from "../components/ErrorMessage.svelte"
    const auth = getAuth();
    let email
    let password = ''
    let error = null
    let userCreated = false
    
    const handleClick = (e) => {
        e.preventDefault()
        console.log(`trying to create user : ${email}`)
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log(`Made new user`)
            userCreated = true
            console.log(userCredential.user)
            email = ''
            password = ''
        })
        .catch((e) => {
            console.error(e)
            error = e
        });
    }  
</script>

<form>
    <h3>Créer un compte</h3>
    <EmailForm bind:email={email}/>
    <PasswordForm bind:password={password}/>
    <br>
    <button on:click={handleClick}>Créer un compte</button>
    <h4 class:hidden={!userCreated}>
        Inscription réussie.
    </h4>
    {#if error}
        <ErrorMessage error={error}/>
    {/if}
</form>
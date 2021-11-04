<script>
    import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
    import EmailForm from "../components/EmailForm.svelte"
    import PasswordForm from "../components/PasswordForm.svelte"
    import ErrorMessage from "../components/ErrorMessage.svelte"
    import {info, check, success, warning} from '../utils/log'
    const auth = getAuth();
    let email
    let password = ''
    let error = null
    
    const handleClick = (e) => {
        e.preventDefault()
        check(`trying to loggin : ${email}`)
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            success(`Logged in as ${email}`)
            console.log(userCredential.user)
            email = ''
            password = ''
            error = null
        })
        .catch((err) => {
            warning('Could not login')
            error = err
            throw err
        });
    }  
</script>

<form>
    <h3>Se connecter</h3>
    <EmailForm bind:email={email}/>
    <PasswordForm bind:password={password}/>
    <br>
    <button on:click={handleClick}>Se connecter</button>
    <ErrorMessage error={error}/>
</form>
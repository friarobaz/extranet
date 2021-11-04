<script>
import { getAuth, sendPasswordResetEmail } from "firebase/auth"
import ErrorMessage from '../components/ErrorMessage.svelte'
import EmailForm from '../components/EmailForm.svelte'
const auth = getAuth()
let email
let emailSent = false
let error = null

const handleClick = async (e) => {
    e.preventDefault()
    console.log(`trying to send email to ${email}`)
    const actionCodeSettings = {
        url: 'https://extranet-caf.netlify.app/',
        handleCodeInApp: true
    }
    try {
        await sendPasswordResetEmail(auth, email, actionCodeSettings)
        email = ''
        console.log('email sent')
        emailSent = true
        error = null
    } catch (e) {
        emailSent = false
        console.error(e)
        error = e
    } 
    // Obtain code from user.
    //await confirmPasswordReset(email, code);
}
</script>


<form>
    <h3>Réinitialisez votre mot de passe</h3>
    <EmailForm bind:email={email}/>
    <br>
    <button on:click={handleClick}>Envoyer</button>
    <h4 class:hidden={!emailSent}>
        Un email vous a été envoyé, consultez votre boite mail.
    </h4>
    {#if error}
        <ErrorMessage error={error}/>
    {/if}
</form>

<style>
    
</style>
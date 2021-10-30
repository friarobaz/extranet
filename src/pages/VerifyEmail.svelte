<script>
    import { sendEmailVerification } from "firebase/auth"
    
    export let user = null
    const actionCodeSettings = {
    url: 'https://extranet-caf.netlify.app/',
    handleCodeInApp: true
    }
    const handleClick = async (e) => {
        e.preventDefault()
        console.log('Trying to send email to')
        await sendEmailVerification(user, actionCodeSettings);
// Obtain code from the user.
await applyActionCode(auth, code);
    }

</script>

Vous êtes connectés mais votre adresse mail n'est pas vérifiée.<br>
CLiquez ici pour la verifier

<button on:click={handleClick}>Envoyer le mail de verification</button>
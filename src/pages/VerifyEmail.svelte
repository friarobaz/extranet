<script>
    import { sendEmailVerification } from "firebase/auth"
    import {currentUser} from '../utils/stores'
    
    const actionCodeSettings = {
    url: 'https://extranet-caf.netlify.app/',
    handleCodeInApp: true
    }
    const handleClick = async (e) => {
        e.preventDefault()
        console.log(`Trying to send email to ${$currentUser.email}`)
        await sendEmailVerification($currentUser, actionCodeSettings);
// Obtain code from the user.
//await applyActionCode(auth, code);
    }

</script>


Vous êtes connectés mais votre adresse mail n'est pas vérifiée.<br>
CLiquez ici pour la verifier

<button on:click={handleClick}>Envoyer le mail de verification</button>
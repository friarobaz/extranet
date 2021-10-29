<script>
    import { getAuth, signInWithEmailAndPassword, signOut, sendPasswordResetEmail, confirmPasswordReset } from "firebase/auth";
    const auth = getAuth();
    let email = ''
    let password = ''
    let code = ''
    
    const handleLogin = (e) => {
        e.preventDefault()
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log('Logged in')
            const user = userCredential.user;
            console.log(user)
            email = ''
            password = ''
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage, errorCode)
        });
    }    
    const handleLogout = (e) => {
        e.preventDefault()
        console.log('signing out')
        signOut(auth)
        
    }    

    const handleEmail = async (e) => {
        e.preventDefault()
        const actionCodeSettings = {
        url: 'https://extranet-caf.netlify.app/',
        handleCodeInApp: true
        };
        await sendPasswordResetEmail(auth, email, actionCodeSettings);
        // Obtain code from user.
        //await confirmPasswordReset(email, code);

}

</script>

<h4>Log in</h4><br />

<form>
    <input type="text" bind:value={code} >
<div>
    <input type="email" bind:value={email} required />
    <label for="signup-email">Email address</label>
</div>
<div>
    <input type="password" bind:value={password} required />
    <label for="signup-password">Password</label>
</div>
<button on:click={handleLogin}>LOGIN</button>
<button on:click={handleLogout}>LOG OUT</button>
<button on:click={handleEmail}>SEND EMAIL</button>
</form>

<script>
    import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
    const auth = getAuth();
    let email = ''
    let password = ''
    
    const handleClick = (e) => {
        e.preventDefault()
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
            console.log('Made new user')
            const user = userCredential.user;
            console.log(user)
            email = ''
            password = ''
            })
            .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
            })
    }     

</script>

<h4>Sign up</h4><br />

<form>
<div>
    <input type="email" bind:value={email} required />
    <label for="signup-email">Email address</label>
</div>
<div>
    <input type="password" bind:value={password} required />
    <label for="signup-password">Choose password</label>
</div>
<button on:click={handleClick}>Sign up</button>
</form>

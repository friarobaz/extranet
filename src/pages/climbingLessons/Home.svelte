<script>
    import Subscribe from "./Subscribe.svelte";
    import EmailForm from "../../components/EmailForm.svelte"
    import Login from "../Login.svelte"
    import Signup from "../SignUp.svelte"
    import {currentUser, loggedin, verified, admin} from '../../utils/stores'
    let email
</script>

{#if !$loggedin}
    <Login />
    <h3>Pas encore de compte ? Créez en un en 1 minute !</h3>
    <Signup />
{:else}
    
{/if}


<!-- <Subscribe /> -->


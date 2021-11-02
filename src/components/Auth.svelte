<script>
    import { getAuth, onAuthStateChanged } from "firebase/auth";
    import {replace, location} from 'svelte-spa-router'
    import Routes from './Routes.svelte'
    import Menu from '../components/Menu.svelte'
    import LoginStatus from '../components/loginStatus.svelte'
    import {currentUser} from '../utils/stores'

    let user, email, verified
    $: email = user ? user.email : null
    $: verified = user ? user.emailVerified : null
    onAuthStateChanged(getAuth(), (userObj)=>{
		console.log('auth state changed')
    console.log(userObj)
		user = userObj
    $currentUser = userObj
      if(userObj){
        userObj.getIdTokenResult()
      .then((idTokenResult) => {
     // Confirm the user is an Admin.
     if (!!idTokenResult.claims.admin) {
       // Show admin UI.
       console.log('is an admin')
     } else {
       // Show regular user UI.
       console.log('is NOT an admin')
     }
  })
  .catch((error) => {
    console.log(error);
  });
      }




    replace($location) //refresh
	})
</script>

user: {email}
verified: {verified}
<hr>
<LoginStatus bind:user={user} />
<Menu bind:user={user}/>
<hr>
<Routes bind:user={user}/>


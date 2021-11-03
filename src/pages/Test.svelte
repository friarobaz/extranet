<script>
    import { httpsCallable } from "firebase/functions"
    import { functions } from '../utils/firebase'

    const addAdminRole = httpsCallable(functions, 'addAdminRole');
    

    const handleClick = () => {
        addAdminRole({ email: 'friarobaz@gmail.com' }).then(result => {
        console.log(result);
    })
    }
    
    /* firebase.auth().currentUser.getIdTokenResult()
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
  }); */

  
</script>

<button on:click={handleClick}>MAKE ADMIN</button>
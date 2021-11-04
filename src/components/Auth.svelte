<script>
    import { getAuth, onAuthStateChanged } from "firebase/auth";
    import {replace, location} from 'svelte-spa-router'
    import Routes from './Routes.svelte'
    import Menu from '../components/Menu.svelte'
    import LoginStatus from '../components/loginStatus.svelte'
    import {currentUser, loggedin, verified, admin} from '../utils/stores'
    import {info, check, success, warning} from '../utils/log'
    
    let userStoreUpToDate = false
    onAuthStateChanged(getAuth(), (usr)=>{
      info('👤 Auth state changed')
      $currentUser = usr
      $loggedin = !!usr
      $verified = usr ? usr.emailVerified : false
      if(usr){
        usr.getIdTokenResult().then(res => $admin = !!res.claims.admin)
      }else{
        $admin = false
      }
      userStoreUpToDate = true
      if(!usr) replace($location) //refresh
	  })
</script>
user: {$currentUser}
{#if $loggedin}
  email: {$currentUser.email}
{/if}

verified: {$verified}
admin: {$admin}
<hr>
<LoginStatus />
<Menu />
<hr>

{#if userStoreUpToDate}
  <Routes />
{/if}



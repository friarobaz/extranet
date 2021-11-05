<script>
    import { wrap } from "svelte-spa-router/wrap"
    import Router, {push} from 'svelte-spa-router'
    import Home from '../pages/Home.svelte'
    import Login from '../pages/Login.svelte'
    import SignUp from "../pages/SignUp.svelte";
    import ResetPassword from "../pages/ResetPassword.svelte";
    import VerifyEmail from "../pages/VerifyEmail.svelte";
    import Club from "../pages/Club.svelte";
    import Users from "../pages/Users.svelte";
    import User from "../pages/User.svelte";
    import {currentUser, loggedin, verified, admin} from '../utils/stores'
    import UpdateFirestore from "../pages/UpdateFirestore.svelte";
    import {check, success, warning} from '../utils/log'
import MakeAdmin from "../pages/MakeAdmin.svelte";
import MyProfiles from "../pages/MyProfiles.svelte";
import Stats from '../pages/Stats.svelte'
import Test from '../pages/Test.svelte'
    
    const isLoggedIn = () =>{
      if (!$loggedin) {
        warning('You cant visit this page if not logged in, redirecting')
        push("/login")
        return false
      }
      success('User logged in, access allowed')
      return true
	  }
    const isVerified = () =>{
      if (!$verified) {
        warning('You cant visit this page if not verified, redirecting')
        push("/verifyEmail")
        return false
      }
      //verified
      success('User verified, access allowed')
      return true
	  }
    const isAdmin = () =>{
      if (!$admin) {
        warning('You need to be an admin to visit this page')
        push("/login")
        return false
      }
      //verified
      success('User is an admin, access allowed')
      return true
	  }


    const pages = [{
      url: '/home', component: Home, conditions : []
    },
    {
      url: '/login',component: Login, conditions : []
    },
    {
      url: '/signup',component: SignUp, conditions : []
    },
    {
      url: '/resetPassword',component: ResetPassword, conditions : []
    },
    {
      url: '/verifyEmail',component: VerifyEmail, conditions : [isLoggedIn]
    },
    {
      url: '/club',component: Club, conditions : [isVerified]
    },
    {
      url: '/users',component: Users, conditions : [isVerified]
    },
    {
      url: '/user/:id?',component: User, conditions : [isVerified]
    },
    {
      url: '/updateFirestore',component: UpdateFirestore, conditions : [isAdmin]
    },
    {
      url: '/makeAdmin',component: MakeAdmin, conditions : [isAdmin]
    },
    {
      url: '/myProfiles',component: MyProfiles, conditions : [isVerified]
    },
    {
      url: '/stats',component: Stats, conditions : []
    },
    {
      url: '/test',component: Test, conditions : []
    },
    
    ]

    const makeRoutes = () => {
      let routes = {}
      for (const page of pages) {
        routes[page.url] = wrap({ 
          component:page.component,
          conditions : page.conditions
        })
      }
      return routes
    }
    const routes = makeRoutes()
</script>
<Router {routes}/>
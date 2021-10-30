<script>
	import {push, pop, replace, location} from 'svelte-spa-router'
	import Router from 'svelte-spa-router'
	import {wrap} from 'svelte-spa-router/wrap'
	import { getAuth, onAuthStateChanged } from "firebase/auth";
	import User from './pages/User.svelte'
	import Users from './pages/Users.svelte'
	import Club from './pages/Club.svelte'
	import SignUp from './pages/SignUp.svelte'
	import Login from './pages/Login.svelte'
	import ResetPassword from './pages/ResetPassword.svelte'
	import Home from './pages/Home.svelte'
	import Menu from './components/Menu.svelte'
	import LogoutButton from './components/LogoutButton.svelte';
	import checkAuth from './utils/checkAuth'

	const routes = {
		'/': Home,
		'/login': Login,
		'/signup': SignUp,
		'/resetpassword': ResetPassword,
		'/club/:id' : wrap({component: Club, conditions: [checkAuth()]}),
		'/users/:id' : wrap({component: Users, conditions: [checkAuth()]}),
		'/user/:id': wrap({component: User, conditions: [checkAuth()]})
		//'*': NotFound,
	}

	const auth = getAuth()
	let loggedIn = true

	onAuthStateChanged(auth, (user)=>{
		console.log('auth state changed')
		if (user) {
			loggedIn = true
			console.log(user.uid)
		}else{
			loggedIn = false
			console.log('REDIRECTING')
			push('/login-or-signup')
		}
	})

	
	

</script>


<p>The current page is: {$location}</p>
{#if loggedIn}
	Logged in <LogoutButton />
{:else}
	Logged out
{/if}
	<br><br>
<Menu />
<main>
	<Router {routes}/>
	
	<!-- <ResetPassword /> -->
	<br><br>
	<!-- <Login /> -->
	<br>
	<!-- <SignUp /> -->
	<br>
	<!-- <User />
	<Club /> -->
	<!-- <Users /> -->
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
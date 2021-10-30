<script>
	import { getAuth, onAuthStateChanged } from "firebase/auth";
	import Router from 'svelte-spa-router'
	import User from './pages/User.svelte'
	import Users from './pages/Users.svelte'
	import Club from './pages/Club.svelte'
	import SignUp from './pages/SignUp.svelte'
	import Login from './pages/Login.svelte'
	import ResetPassword from './pages/ResetPassword.svelte'
	import Home from './pages/Home.svelte'
	import Menu from './components/Menu.svelte'

	const routes = {
		'/': Home,
		'/login': Login,
		'/signup': SignUp,
		'/resetpassword': ResetPassword,
		'/user/:id' : User,
		'/club/:id' : Club,
		'/users/:id' : Users,
		//'*': NotFound,
	}

	
	const auth = getAuth()
	let loggedIn = false

	onAuthStateChanged(auth, (user)=>{
		if (user) {
			loggedIn = true
			console.log(user.uid)
		}else{
			loggedIn = false
		}
	})

</script>
<Menu />
<main>
	<Router {routes}/>
	{#if loggedIn}
	Logged in{:else}
	Logged out{/if}
	<br><br>
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
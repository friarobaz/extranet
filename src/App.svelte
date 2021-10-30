<script>
	import {wrap} from 'svelte-spa-router/wrap'
	import {push} from 'svelte-spa-router'
	import Router from 'svelte-spa-router'
	import { getAuth, onAuthStateChanged } from "firebase/auth";
	import User from './pages/User.svelte'
	import Users from './pages/Users.svelte'
	import Club from './pages/Club.svelte'
	import SignUp from './pages/SignUp.svelte'
	import Login from './pages/Login.svelte'
	import ResetPassword from './pages/ResetPassword.svelte'
	import Home from './pages/Home.svelte'
	import Menu from './components/Menu.svelte'
	import LoginStatus from './components/loginStatus.svelte';
	const auth = getAuth()
	import VerifyEmail from './pages/VerifyEmail.svelte';
	import Auth from './components/Auth.svelte'
	import Routes from './components/Routes.svelte'

	


	
</script>
<main>
	<Auth />
</main>


<style>
	main {
		text-align: center;
		display: grid;
		justify-content: center;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
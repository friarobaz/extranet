<script>
	import { getAuth, onAuthStateChanged } from "firebase/auth";
	import User from './User.svelte';
	import Users from './Users.svelte';
	import Club from './Club.svelte';
	import SignUp from './SignUp.svelte'
	import Login from './Login.svelte'
	
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

<main>
	{#if loggedIn}
	Logged in{:else}
	Logged out{/if}
	<Login />
	<br>
	<SignUp />
	<br>
	<User />
	<Club />
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
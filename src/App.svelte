<script>
	import Auth from './components/Auth.svelte'
	
	
	import { getUsersFromApi } from './utils/getUsersFromApi'
	import { getUserFromApi } from './utils/getUserFromApi'


	import { doc, getDoc } from "firebase/firestore"
	import {db} from './utils/firebase'
	import { check, success, warning } from "./utils/log"

	const getUserFromFirestore = async (userId) => {
		check(`Getting user from Firestore ID: ${userId}`)
        const docRef = doc(db, "users", userId.toString());
		const docSnap = await getDoc(docRef);

		if (docSnap.exists()) {
			const user = docSnap.data()
			success(`User found: ${user.firstName} ${user.lastName}`)
			//console.log(user)
			return user
		} else {
			warning('User not found')
			return
		}
    }
	const run = async () => {
		await getUserFromApi(742120190080)
		console.log('############################')
		await getUserFromFirestore(742120190080)
	}

	run()
	
	
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
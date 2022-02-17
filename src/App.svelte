<script>
	import {firebaseApp} from './utils/firebase'
	import Auth from './components/Auth.svelte'
	
	
	/* import { getUserFromApi } from './utils/getUserFromApi'
	import { updateFirestore } from './utils/updateFirestore'
	import { getUserChanges } from './utils/getUserChanges'

	import {getUsersFromFirestore} from './utils/getUsersFromFirestore'
import { getUserFromFirestore } from './utils/getUserFromFirestore';
import { formatApiUser } from './utils/formatApiUser';

	const run = async () => {
		//await getUsersFromFirestore()
		const api = await getUserFromApi(742120190080)
		const formatted = formatApiUser(api)
		const firebase = await getUserFromFirestore(742120190080)
		
		getUserChanges(formatted, firebase)
	} */

	//run()
	//isUserUpToDate(742120190080)
	//updateUser(742120190080)
	//updateFirestore()
	//getUserChanges()
	//run()
	
	
</script>
<main>
	<Auth />
</main>


<style>
	
</style>
<script>
    import { updateFirestore } from "../utils/updateFirestore"
    import ErrorMessage from '../components/ErrorMessage.svelte'

    let errorCode
    const handleClick = async () => {
        try {
            await updateFirestore()
        } catch (error) {
            errorCode = error.code
            throw error
        }
        
    }
</script>

<button on:click={handleClick}>Mise à jour de la base de donnée Firestore</button>

<ErrorMessage code={errorCode}/>






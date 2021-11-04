<script>
    import { updateFirestore } from "../utils/updateFirestore"
    import ErrorMessage from '../components/ErrorMessage.svelte'

    let error = null
    const handleClick = async () => {
        try {
            await updateFirestore()
        } catch (err) {
            error = err
            throw err
        }
        
    }
</script>

<button on:click={handleClick}>Mise à jour de la base de donnée Firestore</button>

<ErrorMessage error={error}/>






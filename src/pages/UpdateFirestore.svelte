<script>
    import { updateFirestore, updateStats } from "../utils/updateFirestore"
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

    const handleClick2 = async () => {
        try {
            await updateStats()
        } catch (err) {
            error = err
            throw err
        }
    }

</script>

<button on:click={handleClick}>Mise à jour de la base de donnée Firestore</button>


<button on:click={handleClick2}>Mise a jour des stats</button>

<ErrorMessage error={error}/>






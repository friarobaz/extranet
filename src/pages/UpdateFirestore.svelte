<script>
    import { updateFirestore } from "../utils/updateFirestore"

    const handleClick = () => {
        updateFirestore()
    }
</script>

<button on:click={handleClick}>Mise à jour de la base de donnée Firestore</button>
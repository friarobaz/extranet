<script>
    import { db } from '../utils/firebase'
    import { doc, getDoc } from "firebase/firestore"
    import { updateStats } from "../utils/updateFirestore"
    import Chart from '../components/Chart.svelte'

    let stats = null
    const getStats = async () => {
        const docRef = doc(db, "stats", "lastUpdate")
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
            stats = docSnap.data()
        }
        console.log(stats)
        return stats
    }

    const handleClick2 = async ()=>{
        try {
            updateStats()
        } catch (error) {
            throw error
        }
    }
    
</script>

<div>
    <h1>Statistiques</h1>
    <button on:click={getStats}>Get stats</button>
    <button on:click={handleClick2}>Update</button>
    
    {#if stats}
        <ul>
            <li>Date : {stats.date}</li>
            <li>Heure : {stats.time}</li>
            <li>Nombre d'utilisateurs : {stats.nbOfUsers}</li>
            <li>Hommes : {stats.men}</li>
            <li>Femmes : {stats.women}</li>
        </ul>
        <Chart men={stats.men} women={stats.women}/>
    {/if}
</div>


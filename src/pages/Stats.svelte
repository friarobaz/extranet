<script>
    import { db } from '../utils/firebase'
    import { doc, getDoc } from "firebase/firestore"
    import { formatStats } from '../utils/stats'
    import PieChart from '../components/Charts/PieChart.svelte'
    import BarChart from '../components/Charts/BarChart.svelte'

    
    let recentUsers = 0
    const getStats = async () => {
        const docRef = doc(db, "stats", "lastUpdate")
        const docSnap = await getDoc(docRef)
        let stats = null
        if (docSnap.exists()) {
            stats = docSnap.data()
        }
        console.log(stats)
        recentUsers = stats.recentUsers
        return formatStats(stats)
    }

    let promise = getStats()


</script>


<h1>Statistiques</h1>
<div>Adhérents cette année: {recentUsers}</div>
{#await promise}
    <p>Patientez...</p>
{:then stats} 
    {#each stats as stat}
        <div class='chart'>
            {#if stat.chart == 'pie'}
                <div style='max-width:200px'>
                    <PieChart data={stat} />
                </div>
            {:else if stat.chart == 'bar'}
                <div style='max-width:1000px'>
                    <BarChart data={stat} />
                </div>
            {:else}
                pas de chart connue
            {/if}
        </div>
    {/each}
{/await}


<style>
    .chart{
        /* height: 2000px; */
        /* background: sandybrown; */
        width: 100vw;
    }
</style>
<script>
    import { getUserFromApi } from "../../../utils/getUserFromApi"
    let id = 7421
    let promise
   /*  let upToDate
    const checkId = async () => {
        upToDate = undefined
        const user = await getUserFromApi(id)
        upToDate = user.date_inscription.$value != "0000-00-00"      
        console.log(upToDate)
    } */

    const handleSubmit = () => {
        promise = getUserFromApi(id)
    }

</script>

<div>
    <h3>J'étais licencié au CAF de Faverges l'année dernière</h3>
    <p>Dans ce cas il faudra passer par l'espace licencié. Connectez vous à votre espace puis cliquez sur <b>"Ma licence / mes options"</b> et laissez vous guider.</p>
    <a href="https://extranet-clubalpin.com/monespace/?section=monespace" target="_new">
        Cliquez ici pour accéder à votre espace licencié
    </a>
</div>

<div>
    <h3>Je n'étais pas licencié au CAF de Faverges l'année dernière</h3>

    <ul>
        <li>
            <a href="https://extranet-clubalpin.com/app/webeff/we_crv2_step01.php?IDCLUB=7421&Hchk=TsGBcRtU0xxnMB8OuEXBBLey6xG2q3" target="_new">
                Je veux m'inscrire seul
            </a>
        </li>
        <li>
            <a href="https://extranet-clubalpin.com/app/webeff/we_fam_step01.php?IDCLUB=7421&Hchk=TsGBcRtU0xxnMB8OuEXBBLey6xG2q3" target="_new">
                Je veux inscrire plusieurs membres de ma famille en même temps
            </a>
        </li>
    </ul>
    <br>
    <p>
        Si votre conjoint (ou parent) est déja inscrit au CAF de Faverges vous pouvez profiter d'une réduction pour votre adhésion.
        Dans ce cas c'est à votre conjoint de faire votre adhésion à partir de son espace licencié.
        <br>
        <a href="https://extranet-clubalpin.com/monespace/?section=monespace" target="_new">
            Cliquez ici pour accéder à votre espace licencié
        </a>
    </p>
</div>
<div>
    <h3>J'ai déjà une licence à jour</h3>
    <p>Dans ce cas vous pouvez passer à l'étape suivante.</p>
    <p>Pour vérifier si votre licence est à jour, entrez votre numéro de licence ci-dessous et cliquez sur "Vérifier"</p>
    <form on:submit={handleSubmit}>
        <input type="number" bind:value={id}>
        <button>Vérifier</button>
    </form>
    {#await promise}
	    <p>...patientez</p>
    {:then user}
        {#if user}
            {#if user.date_inscription.$value != "0000-00-00" }
                <p>{user.prenom.$value} {user.nom.$value} est à jour</p> 
            {:else}
               <p>{user.prenom.$value} {user.nom.$value} n'est pas à jour</p> 
            {/if}
        {:else}
            {#if user === null}
                <p>Utilisateur non trouvé</p>
            {/if}
        {/if} 
    {:catch error}
        <p style="color: red">{error.message}</p>
    {/await}
</div>

<style>
    
        li {
            list-style-type: disc;
            list-style-position: inside;
        }
        a {
            /* font-size: large; */
            font-weight: 600;
        }

        div {
            border : 1px solid black;
            margin : 10px;
            padding : 20px;
        }

        h3{
            margin-bottom: 5px;
        }
    
</style>
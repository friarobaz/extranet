<script>
    import NameSearch from '../../components/NameSearch.svelte'
    import Licence from "./subscriptionProcess/Licence.svelte"
    let steps = [
        {
            name: "Prendre une licence au CAF de Faverges",
            status: false,
            hidden: false,
            component: Licence
        },
        {
            name: "Créer un compte sur l'espace Ecole d'escalade",
            status: false,
            hidden: true,
        },
        {
            name: "Envoyer un certificat medical",
            status: false,
            hidden: true,
        },
        {
            name: "Proceder au reglement des cours",
            status: true,
            hidden: true,
        },
        {
            name: "Choisir son jour et créneau horaire",
            status: false,
            hidden: true,
        },
    ]
    const toggle = (step) => {
        //if visible, hide it
        if(!step.hidden){
            step.hidden = true
        }else{//if hidden, show it and hide all others
            for (const step of steps) {
                step.hidden = true
            }
            step.hidden = false
        }
        //refresh...        
        steps = steps
        }

    let id = 7421
    const checkSteps = async () => {
        console.log("checking"+id)

    }
</script>

<h1>Ecole d'escalade</h1>

<h1>Inscription</h1>
<p>L'inscription à l'ecole d'escalade se passe en {steps.length} étapes. CLiquez sur chaque étape pour plus de détails.</p>
<!-- <p>Pour vérifier l'avancement de votre inscription, entrez votre numéro de license, il doit commencer par 7421.</p>
<form on:submit|preventDefault={checkSteps}>
    <input type="number" bind:value={id}><button action="submit">Vérifier</button>
</form> -->



<ol>
    {#each steps as step}
        <li style="list-style: decimal">
            <h2 on:click={toggle(step)}>{step.name}</h2>
            
            <div  hidden={step.hidden}>
                <svelte:component this={step.component} />
            </div>
            
            
            
        </li>
    {/each}
</ol>
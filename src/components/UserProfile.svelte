<script>
    import { getUserFromFirestore } from "../utils/getUserFromFirestore"
    import ErrorMessage from "./ErrorMessage.svelte";
    import {AGE_GROUPS, YEARS, DAYS} from '../utils/climbingLessons'
    import {makePupil, unsubscribePupil} from '../utils/climbingLessons'
    import { getAge } from "../utils/getAge";
    import _ from "lodash"
    import dayjs from "dayjs";

    const getDefaultAgeGroup = (age, ageGroups) => {
        for (const ageGroup of ageGroups) {
            if(age<=ageGroup.max && age>=ageGroup.min) return ageGroup
        }
    }
    
    const getAvailableDays = (ageGroup, days) => {
        if(!ageGroup || !days) return []
        let availableDays = []
        for (const day of days) {
            if (day.ageGroupName === ageGroup.name) availableDays.push(day)
        }
        //if selected day is not part of available days, set first choice as default
        if (!availableDays.includes(selectedDay)) {
            selectedDay = availableDays[0]
        }
        return availableDays
    }

    export let userId = null
    //$: user = null
    $: error = null
    let user, female, age, selectedYear, selectedAgeGroup, selectedDay
    $: availableDays = getAvailableDays(selectedAgeGroup, DAYS)

    const run = async () => {
        user = await getUserFromFirestore(userId, true)
        age = getAge(user.dateOfBirth)
        female = user.sex === 'female'
        selectedAgeGroup = getDefaultAgeGroup(age, AGE_GROUPS)
    }
    run()

    const subscribe = async ()=>{
        //console.log(selectedYear, selectedAgeGroup.name, selectedDay.name, user.firstName)
        await makePupil(user, selectedYear, selectedAgeGroup, selectedDay)
        await getUserFromFirestore(userId,true)
    }
    const unsubscribe = async ()=>{
        await unsubscribePupil(user, selectedYear)
        await getUserFromFirestore(userId,true)
    }
</script>

<!-- {#if userId}
	{#if user}
        <div>ID: {user.id}</div>
        <div>{_.capitalize(user.firstName)} {user.lastName}</div>
        <div>Inscrit{#if f}e{/if} le : {user.signupDate}</div>
        <div>Email: {user.email}</div>
        <div>Age: {age} ans</div>
        <select bind:value={selectedAgeGroup.name}>
            {#each AGE_GROUPS as ageGroup}
                <option value={ageGroup.name}>
                    {ageGroup.name}
                </option>
            {/each}
	    </select>
        <select>
            {#each DAYS as day}
                {#if selectedAgeGroup.name == AGE_GROUPS[day.ageGroup].name}
                    <option value={day.name}>
                        {day.name}
                    </option>
                {:else}
                    <option value={day.name} disabled>
                        {day.name}
                    </option>
                {/if}
            {/each}
	    </select>

        <button on:click|preventDefault={subscribe}>Inscrire</button>
        <button on:click|preventDefault={cancel}>Désinscrire</button>
        <br>
        <a href="/#/user"><button>RETOUR</button></a>
        
    {:else}
        {#if error}
            <ErrorMessage error={error}/>
        {:else}
            ...
        {/if}
    {/if}
{:else}
    Pas d'ID !
{/if} -->


{#await user}
	<p>Attendez deux secondes...</p>
    {:then user}
    {#if user}
    
        <div>ID: {user.id}</div>
        <div>{_.capitalize(user.firstName)} {user.lastName}</div>
        <div>{age} ans</div>
        <div>Inscrit{#if female}e{/if} le : {dayjs(user.signupDate).format('D MMMM YYYY')}</div>

        <select bind:value={selectedYear}>
            {#each YEARS as year}
                <option value={year}>
                    {year}
                </option>
            {/each}
	    </select>

        <select bind:value={selectedAgeGroup}>
            {#each AGE_GROUPS as ageGroup}
                <option value={ageGroup}>
                    {ageGroup.name}
                </option>
            {/each}
	    </select>
        {#if availableDays}
            <select disabled={availableDays.length===1} bind:value={selectedDay}>
                {#each availableDays as day}
                        <option value={day} selected>
                            {day.name}
                        </option>
                    
                {/each}
	        </select>
        {/if}
        <!-- <select bind:value={selectedDay}>
            {#each DAYS as day}
                {#if day.ageGroupName === selectedAgeGroup.name}
                    <option value={day}>
                        {day.name}
                    </option>
                {:else}
                    <option value={day} disabled>
                        {day.name}
                    </option>
                {/if}
            {/each}
	    </select> -->
        
        <br>
        <button on:click|preventDefault={subscribe}>Inscrire</button>
        <button on:click|preventDefault={unsubscribe}>Désinscrire</button>
        <br>
        <a href="/#/user"><button>RETOUR</button></a>
     
    {:else}
    <div>Aucun utilisateur trouvé</div>
    {/if}
    
        
    {:catch error}
        <p>Error: {error.message}</p>
    {/await}
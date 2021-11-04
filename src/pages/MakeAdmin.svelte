<script>
    import { httpsCallable } from "firebase/functions"
    import { functions } from '../utils/firebase'
    import ErrorMessage from '../components/ErrorMessage.svelte'

    const addAdminRole = httpsCallable(functions, 'addAdminRole');
    const removeAdminRole = httpsCallable(functions, 'removeAdminRole');
    let email = ''
    let error = null
    let error2 = null
    let waitingMessage = ''

    const handleAdd = () => {
        waitingMessage = 'Merci de patientez...'
        error = null
        addAdminRole({ email: email }).then(result => {
            waitingMessage = ''
            console.log(result.data);
            if(result.data.errorInfo) {
              error = result.data.errorInfo
            }else{
             console.log('No erros ?')
            }
        }).catch(err=>{
            waitingMessage = ''
            error2 = err
            console.error(err)
        })
    }
    const handleRemove = () => {
        waitingMessage = 'Merci de patientez...'
        error = null
        removeAdminRole({ email: email }).then(result => {
            waitingMessage = ''
            console.log(result.data);
            if(result.data.errorInfo) {
                error = result.data.errorInfo
            }else{
                console.log('No erros ?')
            }
        }).catch(err=>{
            waitingMessage = ''
            error2 = err
            console.error(err)
        })
    }
  
</script>

<input type="text" bind:value={email}>
<button on:click={handleAdd}>MAKE ADMIN</button>
<button on:click={handleRemove}>REMOVE ADMIN</button>
<div>{waitingMessage}</div>
<ErrorMessage error={error} />
<ErrorMessage error={error2} />
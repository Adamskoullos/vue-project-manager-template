import { ref } from '@vue/reactivity'
import { fStore } from '../firebase/config'

const useDocument = (collection, id) => {
    
    let error = ref(null)
    let isPending = ref(false)

    let docRef = fStore.collection(collection).doc(id)

    const deleteDoc = async () => {
        isPending = true
        error.value = null
        
        try{
            const res = await docRef.delete()
            isPending = false
            return res
        }
        catch(err){
            error.value = 'Unable to delete the project'
            isPending = false
            console.log(err.message)
        }
    }

    return { deleteDoc, error, isPending }
}

export default useDocument



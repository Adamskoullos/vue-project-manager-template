import { ref } from '@vue/reactivity'
import { fStore } from '../firebase/config'


const useCollection = (collection) => {
    const error = ref(null)
    const isPending = ref(false)

    const addDoc = async (doc) => {
        error.value = null
        isPending.value = true
        try{
            const res = await fStore.collection(collection).add(doc)
            isPending.value = false
            return res
        }
        catch(err){
            console.log(err.message)
            isPending.value = false
            error.value = 'Unable to send this message'
        }
    }
    return { addDoc, error, isPending }
}

export default useCollection 


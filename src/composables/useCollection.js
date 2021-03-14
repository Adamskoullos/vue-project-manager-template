const { ref } = require("@vue/reactivity")
import { fStore } from '../firebase/config'


const useCollection = (collection) => {
    const error = ref(null)

    const addDoc = async (doc) => {
        error.value = null
        try{
            await fStore.collection(collection).add(doc)
        }
        catch(err){
            console.log(err.message)
            error.value = 'Unable to send this message'
        }
    }
    return { addDoc, error }
}

export default useCollection 
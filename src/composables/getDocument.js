import { ref } from "@vue/reactivity"
import { watchEffect } from "@vue/runtime-core"
import { fStore } from "../firebase/config"



const getDocument = (collection, id) => {
    const document = ref(null)
    const error = ref(null)

    let docRef = fStore.collection(collection).doc(id)

    const unsub = docRef.onSnapshot((doc) => {
        if(doc.data()){
            document.value = {...doc.data(), id: doc.id}
            error.value = null
        } else{
            error.value = 'That project does not exist'
        }

    }, (err) => {
        console.log(err.message)
        error.value = 'Could not fetch data'
        document.value = null
    })
    // unsub method to prevent multiple onSnapshot events running at the same time
    watchEffect((onInvalidate) => {
        onInvalidate(() => unsub())
    })

    return { document, error }
}

export default getDocument


import { ref } from "@vue/reactivity"
import { watchEffect } from "@vue/runtime-core"
import { fStore } from "../firebase/config"



const getCollection = (collection) => {
    const documents = ref(null)
    const error = ref(null)

    let collectionRef = fStore.collection(collection).orderBy('createdAt',"desc")

    const unsub = collectionRef.onSnapshot((snap) => {
        let results = []
        snap.docs.forEach(doc => {
            doc.data().createdAt && results.push({ ...doc.data(), id: doc.id })
        })
        documents.value = results
        error.value = null
    }, (err) => {
        console.log(err.message)
        error.value = 'Could not fetch data'
        documents.value = null
    })
    // unsub method to prevent multiple onSnapshot events running at the same time
    watchEffect((onInvalidate) => {
        onInvalidate(() => unsub())
    })

    return { documents, error }
}

export default getCollection
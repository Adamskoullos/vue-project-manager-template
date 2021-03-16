import { ref } from "@vue/reactivity"
import { fStorage } from "../firebase/config"

const { user } = getUser()

const useStorage = async () => {
    const error = ref(null)
    const url = ref(null)
    const filePath = ref(null)

    const uploadImage = (file) => {
        filePath.value = `projectImages/${user.value.uid}/${file.name}`
        const storageRef = fStorage.ref(filePath.value)
        try{
            const res = await storageRef.put(file)
            url.value = res.ref.getDownloadURL()
        }
        catch(err){
            console.log(err.message)
            error.value = err.message
        }
    }

    return { error, url, filePath, uploadImageS }
}

export default { useStorage }


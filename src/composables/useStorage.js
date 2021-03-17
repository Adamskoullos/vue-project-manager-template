import { ref } from "@vue/reactivity"
import { fStorage } from "../firebase/config"
import getUser from '@/composables/getUser'

const { user } = getUser()

const useStorage = () => {
    const error = ref(null)
    const url = ref(null)
    const filePath = ref(null)

    const uploadImage = async (file) => {
        filePath.value = `projectImages/${user.value.uid}/${file.name}`
        const storageRef = fStorage.ref(filePath.value)
        try{
            const res = await storageRef.put(file)
            url.value = await res.ref.getDownloadURL()
        }
        catch(err){
            console.log(err.message)
            error.value = err.message
        }
    }

    const deleteImage = async (path) => {
        const storageRef = fStorage.ref(path)
        try{
            await storageRef.delete()
        }
        catch(err){
            error.value = err.message
            console.log(error.value)
        }
    } 

    return { error, url, filePath, uploadImage, deleteImage }
}

export default useStorage 


import { ref } from "@vue/reactivity"
import { fAuth } from "../firebase/config"

const error = ref(null)
const isPending = ref(false)

const logout = async () => {
    error.value = null
    isPending.value = true
    try{
        await fAuth.signOut()
        isPending.value = false
    }
    catch(err) {
        error.value = err.message
        isPending.value = false
        console.log(error.value)
    }
}

const useLogout = () => {
    return { error, logout, isPending }
}

export default useLogout
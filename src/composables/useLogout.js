import { ref } from "@vue/reactivity"
import { fAuth } from "../firebase/config"

const error = ref(null)

const logout = async () => {
    error.value = null
    try{
        await fAuth.signOut()
    }
    catch(err) {
        error.value = err.message
        console.log(error.value)
    }
}

const useLogout = () => {
    return { error, logout }
}

export default useLogout
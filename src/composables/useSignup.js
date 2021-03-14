import { ref } from "@vue/reactivity"
import { fAuth } from "../firebase/config"

const error = ref(null)

const signup = async (email, password, displayName) => {
    error.value = null
    try{
        const res = await fAuth.createUserWithEmailAndPassword(email, password)
        if(!res){
            throw new Error('Could not complete the signup, please try again')
        }
        await res.user.updateProfile({ displayName })
        error.value = null

        return res

    } 
    catch(err){
        console.log(err.message)
        error.value = err.message
    }
}

const useSignup = () => {
    return { error, signup }
}

export default useSignup
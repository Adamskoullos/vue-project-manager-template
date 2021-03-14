import { ref } from "@vue/reactivity"
import { fAuth } from "../firebase/config"

const user = ref(fAuth.currentUser)

fAuth.onAuthStateChanged(_user => {
    user.value = _user
})

const getUser = () => {
    return { user } 
}

export default getUser
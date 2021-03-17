<template>
  <form @submit.prevent="handleSubmit">
      <h3>Sign up</h3>
      <input type="text" placeholder="Display Name" v-model="displayName" required>
      <input type="email" placeholder="Email" v-model="email" required>
      <input type="password" placeholder="Password" v-model="password" required>
      <div v-if="error" class="error">{{ error }}</div>
      <button v-if="!isPending">Sign up</button>
      <button v-if="isPending" disabled>Loading...</button>
  </form>
</template>

<script>

import useSignup from '@/composables/useSignup'
import { ref } from '@vue/reactivity'
import { useRouter } from 'vue-router'

export default {
    setup(){
        const displayName = ref('')
        const email = ref('')
        const password = ref('')
        const router = useRouter()
        
        const { error, signup, isPending } = useSignup()

        const handleSubmit = async () => {
            const res = await signup(email.value, password.value, displayName.value )
            if(!error.value){
                router.push({ name: 'Projects' })
            }
            return res
        }

        return { error, isPending, handleSubmit, displayName, email, password }
    }
}
</script>

<style>

</style>
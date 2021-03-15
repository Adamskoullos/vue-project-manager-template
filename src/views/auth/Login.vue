<template>
  <form @submit.prevent="handleSubmit">
      <h3>Login</h3>
      <input type="email" placeholder="Email" v-model="email" required>
      <input type="password" placeholder="Password" v-model="password" required>
      <div v-if="error" class="error">{{ error }}</div>
      <button v-if="!isPending">Login</button>
      <button v-if="isPending" disabled>Loading...</button>
  </form>
</template>

<script>
import { ref } from '@vue/reactivity'
import useLogin from '@/composables/useLogin'
import { useRouter } from 'vue-router'

export default {
    setup(){
        const email = ref('')
        const password = ref('')
        const router = useRouter()
        const { error, login, isPending } = useLogin()

        const handleSubmit = async () => {
            const res = await login(email.value, password.value)
            if(!error.value){
                router.push({ name: 'Home' })
            }
        }

        return { isPending, error, handleSubmit, email, password }
    }
}
</script>

<style>

</style>


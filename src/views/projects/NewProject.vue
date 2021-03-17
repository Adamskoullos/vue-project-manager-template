<template>
    <div>
        <form @submit.prevent="handleSubmit">
            <h4>Create new project</h4>
            <input type="text" placeholder="Project Title" v-model="title" required>
            <textarea placeholder="Description" v-model="description" required></textarea>
            <label for="">Upload project image</label>
            <input type="file" @change="handleChange">
            <div class="error">{{ fileError }}</div>
            <div class="error">{{ error }}</div>
            <button v-if="!isPendingLocal">Create</button>
            <button v-if="isPendingLocal" disabled>Adding project...</button>
        </form>
    </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import useStorage from '@/composables/useStorage'
import getUser from '@/composables/getUser'
import useCollection from '@/composables/useCollection'
import { timestamp } from '@/firebase/config.js'
import { useRouter } from 'vue-router'

export default {
    setup(){
        const { url, filePath, uploadImage } = useStorage()
        const { user } = getUser()
        const { addDoc, error } = useCollection('projects')
        const router = useRouter()

        const title = ref('')
        const description = ref('')
        const imageFile = ref(null)
        const fileError = ref(null)

        const isPendingLocal = ref(false)

        const handleSubmit = async () => {
            if(imageFile.value){
                isPendingLocal.value = true
                await uploadImage(imageFile.value)
                const res = await addDoc({
                    title: title.value,
                    description: description.value,
                    userId: user.value.uid,
                    userName: user.value.displayName,
                    coverUrl: url.value,
                    filePath: filePath.value,
                    tasks: [],
                    createdAt: timestamp()
                })
                isPendingLocal.value = false
                if(!error.value){
                    router.push({ name: 'ProjectDetails', params:{ id: res.id } })
                    console.log()
                }
            }
            imageFile.value = null
            title.value = ''
            description.value = ''
            fileError.value = null
        }

        const fileTypes = ['image/png','image/jpeg']

        const handleChange = (e) => {
            let selected = e.target.files[0]
            if(selected && fileTypes.includes(selected.type)){
                imageFile.value = selected
                fileError.value = null
            }else{
                imageFile.value = null
                fileError.value = 'Please select an image file (jpg or png)'
            }
        }


        return { title, description, handleSubmit, handleChange, imageFile, fileError, error, isPendingLocal }
    }
}
</script>

<style scoped>
form {
    background: white;
  }
  input[type="file"] {
    border: 0;
    padding: 0;
  }
  label {
    font-size: 12px;
    display: block;
    margin-top: 30px;
  }
  button {
    margin-top: 20px;
  }
</style>
<template>
    <form @submit.prevent="addNewProject">
        <h4>Create new project</h4>
        <input type="text" placeholder="Project Title" v-model="title" required>
        <textarea placeholder="Description" v-model="description" required></textarea>
        <label for="">Upload project image</label>
        <input type="file" @change="handleChange">
        <div class="error">{{ fileError }}</div>
        <button>Add new project</button>
    </form>
</template>

<script>
import { ref } from '@vue/reactivity'
export default {
    setup(){
        const title = ref('')
        const description = ref('')
        const coverImage = ref(null)
        const fileTypes = ['image/png','image/jpeg']
        const fileError = ref(null)

        const addNewProject = () => {
            // add project to db and route to...
        }


        const handleChange = (e) => {
            const selected = e.target.files[0]
            if(selected && fileTypes.includes(selected.type)){
                // Add image to storage, resize and display as cover image
                coverImage.value = selected
                fileError.value = null
                console.log(coverImage.value)
            }else{
                coverImage.value = null
                fileError.value = 'Please select an image file (jpg or png)'
            }
        }


        return { title, description, addNewProject, handleChange, coverImage, fileError }
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
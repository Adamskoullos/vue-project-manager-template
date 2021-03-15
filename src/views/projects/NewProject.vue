<template>
    <form @submit.prevent="addNewProject">
        <h4>New Project</h4>
        <input type="text" placeholder="Project Title" v-model="title" required>
        <textarea placeholder="Description" v-model="description" required></textarea>
        <label for="">Upload project image</label>
        <input type="file">
        <div class="error"></div>
        <button>Add new project</button>
    </form>
</template>

<script>
import { ref } from '@vue/reactivity'
export default {
    setup(){
        const title = ref('')
        const description = ref('')

        const addNewProject = () => {
            // add project to db and route to...
        }

        return { title, description, addNewProject }
    }
}
</script>

<style>
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
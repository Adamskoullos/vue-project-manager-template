<template>
  <div class="add-task">
      <button v-if="!addTask" @click="addTask = true">Add Tasks</button>
      <form v-if="addTask" @submit.prevent="handleAddTask">
          <input type="text" placeholder="Add task" v-model="task" required>
          <button>Add</button>
      </form>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import { fStore } from '../firebase/config'

export default {
    props: ['project'],
    setup(){
        const task = ref('')
        const addTask = ref(false)
        const handleAddTask = async () => {
            const newTask = {
                task: task.value,
                completed: false,
                Id: Math.floor(Math.random()*1000000000)
            }
            console.log(newTask)
        }

        return { task, addTask, handleAddTask }
    }
}
</script>

<style scoped>
.add-task{
    max-width: 100%;
    margin-top: 40px;
}
form{
    max-width: 100%;
    text-align: left;
}
</style>
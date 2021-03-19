<template>
  <div class="add-task">
      <button v-if="!addTask" @click="addTask = true">Add Tasks</button>
      <form v-if="addTask" @submit.prevent="handleAddTask">
          <input type="text" placeholder="Add task" v-model="task" required>
          <div class="task-buttons">
              <button class="task-buttons-add">Add</button>
            <button class="task-buttons-close" v-if="addTask" @click="addTask = false">Close</button>
          </div>
      </form>
      
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import useDocument from '@/composables/useDocument'

export default {
    props: ['project'],
    setup(props){
        const { updateTasks, isPending } = useDocument('projects', props.project.id)
        const task = ref('')
        const addTask = ref(false)
        
        const handleAddTask = async () => {
            addTask.value = true
            const newTask = {
                task: task.value,
                completed: false,
                id: Math.floor(Math.random()*1000000000)
            }
            await updateTasks({
                tasks: [...props.project.tasks, newTask]
            })
            task.value = ''
            addTask.value = false
            
        }

        return { task, addTask, handleAddTask, isPending }
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
.task-buttons{
    display: flex;
    justify-content:flex-start;
}
.task-buttons-close{
    margin-left: 10px;
}
</style>
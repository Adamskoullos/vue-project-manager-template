<template>
  <div class="error" v-if="error">{{ error }}</div>
  <div v-if="document" class="document-details">

    <!-- Project information -->
    <div class="document-info">
      <div class="cover">
        <img :src="document.coverUrl">
      </div>
        <h2>{{ document.title }}</h2>
        <p class="username">Project lead: {{ document.userName }}</p>
        <p class="description">{{ document.description }}</p>
        <button v-if="ownership && !isPending" @click="handleDelete">Delete Project</button>
        <button v-if="isPending">Deleting...</button>
    </div>

    <!-- task list -->
    <div class="task-list">
      <h2>Tasks</h2>
      <div v-for="task in document.tasks" :key="task.id" class="single-task">
        <div class="task" :class="{ complete: task.completed }">
          <div class="actions">
            <div class="details">
              <p>{{ task.task }}</p>
            </div>
            <div class="icons" v-if="ownership">
              <span class="material-icons" @click="handleDeleteTask(task.id)">delete</span> 
              <span class="material-icons" @click="handleTaskComplete(task.id)">done</span>
            </div>
          </div>
        </div>
      </div>
      <AddTask v-if="ownership" :project="document"/>
    </div>
  </div>
</template>

<script>
import useStorage from '@/composables/useStorage'
import useDocument from '@/composables/useDocument'
import getDocument from '@/composables/getDocument'
import getUser from '@/composables/getUser'
import { computed } from '@vue/runtime-core'
import { useRouter } from 'vue-router'
import AddTask from '@/components/AddTask.vue'

export default {
    props: ['id'],
    components: { AddTask },
    setup(props){
        const { deleteImage } = useStorage()
        const { updateTasks, deleteDoc, isPending } = useDocument('projects', props.id)
        const { document, error } = getDocument('projects', props.id)
        const { user } = getUser()
        const router = useRouter()

        const ownership = computed(() => {
            return document.value && user.value && user.value.uid == document.value.userId
        })

        const handleDelete = async () => {
            isPending.value = true
            await deleteDoc()
            await deleteImage(document.value.filePath)
            isPending.value = false
            router.push({ name: 'Projects' })
        }

        const handleTaskComplete = async (id) => {
            const tasks = document.value.tasks.map(task => {
              if (task.id == id){
                task.completed = !task.completed
              }
              return task
            })
            await updateTasks({
              tasks: tasks
            })
        }

        const handleDeleteTask = async (id) => {
            const tasks = document.value.tasks.filter(task => task.id != id)
            await updateTasks({
              tasks: [...tasks]
            })
        }

        return { document, error, ownership, handleDelete, isPending, handleTaskComplete, handleDeleteTask }
    }

}
</script>

<style>
 .document-details {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 80px;
  }
  .cover {
    overflow: hidden;
    border-radius: 20px;
    position: relative;
    padding: 100px;
  }
  .cover img {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    
    min-width: 100%;
    min-height: 100%;
    max-width: 200%;
    max-height: 200%;
  }
  .document-info {
    text-align: center;
  }
  .document-info h2 {
    text-transform: capitalize;
    font-size: 28px;
    margin-top: 20px;
  }
  .document-info p {
    margin-bottom: 20px;
  }
  .username {
    color: #999;
  }
  .description {
    text-align: left;
  }
  .task {
    margin: 20px auto;
    background: white;
    padding: 10px 20px;
    border-radius: 4px;
    box-shadow: 1px 2px 3px rgba(0,0,0,0.05);
    border-left: 4px solid #e90074;
  }
  h2 {
    cursor: pointer;
  }
  .actions{
      display: flex;
      align-items: center;
      justify-content: space-between;
  }
  .icons{
    min-width: 75px;
  }
  .material-icons {
    font-size: 24px;
    margin-left: 10px;
    color: #bbb;
    cursor: pointer;
  }
  .material-icons:hover {
    color: #777;
  }
  .complete{
    border-left: 4px solid rgb(7, 177, 7); 
}
</style>
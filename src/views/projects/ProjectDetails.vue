<template>
  <div class="error" v-if="error">{{ error }}</div>
  <div v-if="document" class="document-details">

    <!-- playlist information -->
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
        const { deleteDoc, isPending } = useDocument('projects', props.id)
        const { document, error } = getDocument('projects', props.id)
        const { user } = getUser()
        const router = useRouter()

        const ownership = computed(() => {
            return document.value && user.value && user.value.uid == document.value.userId
        })

        const handleDelete = async () => {
            await deleteDoc()
            await deleteImage(document.value.filePath)
            router.push({ name: 'Projects' })
        }

        return { document, error, ownership, handleDelete, isPending }
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
    padding: 160px;
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
</style>
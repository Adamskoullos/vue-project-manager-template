<template>
  <div class="wrapper">
        <div class="projects-window">
            <div v-if="error" class="error">Cannot access projects from the database</div>
            <div v-if="documents" class="projects">
                <ProjectsList :projects="documents"/>
            </div>
        </div>
    </div>
</template>

<script>
import getCollection from '@/composables/getCollection'
import getUser from '@/composables/getUser'
import ProjectsList from '@/components/ProjectsList'

export default {
  components: { ProjectsList },
  setup(){
    const { user } = getUser()
    const { documents } = getCollection('projects', ['userId', '==', user.value.uid])

    return { documents }
  }
}
</script>

<style>

</style>
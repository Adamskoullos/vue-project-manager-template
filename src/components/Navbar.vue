<template>
    <div class="navbar">
      <nav>
          <img src="" alt="">
          <h1><router-link :to="{ name: 'Home' }" >AppName</router-link></h1>
          <div class="links">
              <div v-if="!user">
                  <router-link class="btn" :to="{ name: 'Login' }">Login</router-link>
                  <router-link class="btn" :to="{ name: 'Signup' }">Sign up</router-link>
              </div>
              <div v-if="user">
                  <router-link class="btn" :to="{ name: 'Projects' }">Team Projects</router-link>
                  <router-link class="btn" :to="{ name: 'UserProjects' }">My Projects</router-link>
                  <router-link class="btn" :to="{ name: 'NewProject' }">New Project</router-link>
                  <span class="user-name">{{ user.displayName }}</span>
                  <button v-if="!isPending" @click="handleLogout">Logout</button>
                  <button v-if="isPending" disabled>Logging out...</button>
              </div>
          </div>
      </nav>
    </div>
</template>

<script>
import useLogout from '../composables/useLogout'
import getUser from '../composables/getUser'
import { useRouter } from 'vue-router'

export default {
    setup(){
        const { user } = getUser()        
        const { error, logout, isPending } = useLogout()
        const router = useRouter()

        const handleLogout = async () => {
            await logout()
            router.push({name: 'Login' })
        }

        return { error, isPending, handleLogout, user }
    }
}
</script>

<style scoped>
  .navbar {
    padding: 16px 10px;
    margin-bottom: 60px;
    background: white;
  }
  nav {
    display: flex;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
  }
  nav img {
    max-height: 60px;
  }
  nav h1 {
    margin-left: 20px;
  }
  nav .links {
    margin-left: auto;
  }
  nav .links a, button {
    margin-left: 16px;
    font-size: 14px;
  }
  a.router-link-active{
    background: rgb(207, 207, 207);
  }
  .user-name{
    font-size: 16px;
    margin-left: 16px;
    padding-left: 16px;
    border-left: 1px solid #eee;
  }
</style>
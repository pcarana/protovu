<template>
  <div>
    <top-menu></top-menu>
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import topMenu from './components/topMenu.vue';
import home from './components/home.vue';
import register from './components/register.vue';
import search from './components/search.vue';


export default {
  components: {
    'top-menu':topMenu,
    'home' : home,
    'register' : register,
    'search' : search
  },
  name: 'app',
  data () {
    return {

    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>

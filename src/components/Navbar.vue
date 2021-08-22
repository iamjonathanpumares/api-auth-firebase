<template>
  <div class="navbar navbar-dark bg-dark">
    <router-link to="/" class="navbar-brand">APP</router-link>
    <div class="d-flex">
        <router-link 
          to="/" 
          class="btn btn-dark"
          v-if="usuarioAutenticado">Tareas</router-link>
        <router-link 
          to="/ingreso" 
          class="btn btn-dark"
          v-if="!usuarioAutenticado">Ingresar</router-link>
        <router-link 
          to="/registro" 
          class="btn btn-dark"
          v-if="!usuarioAutenticado">Registrar</router-link>
        <button 
          v-if="usuarioAutenticado" 
          class="btn btn-dark"
          @click="cerrarSesion">Cerrar sesión</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['usuarioAutenticado'])
  },
  methods: {
    ...mapActions(['cerrarSesion'])
  }
}
</script>
<template>
  <h1>Ingreso de usuarios</h1>
  <form @submit.prevent="procesarFormulario">
    <input type="email" placeholder="email" class="form-control my-2" v-model.trim="email">
    <input type="password" placeholder="password" class="form-control my-2" v-model.trim="pass1">
    <button class="btn btn-primary" :disabled="bloquear">Ingresar</button>
  </form>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      email: '',
      pass1: '',
    }
  },
  computed: {
    bloquear() {
      if (!this.email.includes('@')) {
        return true
      }
      if (this.pass1.length > 5) {
        return false
      }
      return true
    }
  },
  methods: {
    ...mapActions(['ingresoUsuario']),
    procesarFormulario() {
      this.ingresoUsuario({ email: this.email, password: this.pass1 })
      this.email = ''
      this.pass1 = ''
    }
  }
}
</script>
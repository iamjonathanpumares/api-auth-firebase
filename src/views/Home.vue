<template>
  <form @submit.prevent="procesarFormulario">
    <Input :tarea="tarea"/>
  </form>
  <ListaTareas/>
</template>

<script>
import { mapActions } from 'vuex'
import Input from '../components/Input'
import ListaTareas from '../components/ListaTareas'
const shortid = require('shortid')

export default {
  name: 'Home',
  components: {
    Input,
    ListaTareas
  },
  data() {
    return {
      tarea: {
        id: '',
        nombre: '',
        categorias: [],
        estado: '',
        numero: 0
      }
    }
  },
  methods: {
    ...mapActions(['setTareas', 'cargarLocalStorage']),
    procesarFormulario() {
      console.log(this.tarea)
      if (this.tarea.nombre.trim() === '') {
        console.log('Campo vacío')
        return
      }
      console.log('No esta vacío')

      // Generar id
      this.tarea.id = shortid.generate()

      // Enviar los datos
      this.setTareas(this.tarea)

      this.tarea = {
        id: '',
        nombre: '',
        categorias: [],
        estado: '',
        numero: 0
      }
    }
  },
  created() {
    this.cargarLocalStorage()
  }
}
</script>

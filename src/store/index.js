import { createStore } from 'vuex'
import router from '../router'

export default createStore({
  state: {
    tareas: [],
    tarea: {
      nombre: '',
      categorias: [],
      estado: '',
      numero: 0
    },
    user: null
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload
    },
    cargar(state, payload) {
      state.tareas = payload
    },
    set(state, payload) {
      state.tareas.push(payload)
    },
    eliminar(state, payload) {
      state.tareas = state.tareas.filter(item => item.id !== payload)
    },
    tarea(state, payload) {
      if (!state.tareas.find(item => item.id === payload)) {
        router.push('/')
        return 
      }
      state.tarea = state.tareas.find(item => item.id === payload)
    },
    update(state, payload) {
      state.tareas = state.tareas.map(item => item.id === payload.id ? payload : item)
      router.push('/')
    }
  },
  actions: {
    cerrarSesion({ commit }) {
      commit('setUser', null)
      router.push('/ingreso')
      localStorage.removeItem('usuario')
    },
    async ingresoUsuario({ commit }, usuario) {
      try {
        const BASE_URL_AUTH = process.env.VUE_APP_BASE_URL_AUTH
        const AUTH_KEY = process.env.VUE_APP_AUTH_KEY
        const res = await fetch(`${BASE_URL_AUTH}:signInWithPassword?key=${AUTH_KEY}`, {
          method: 'POST',
          body: JSON.stringify({
            email: usuario.email,
            password: usuario.password,
            returnSecureToken: true
          })
        })
        const userDB = await res.json()
        console.log('userDB', userDB)
        if (userDB.error) {
          console.log(userDB.error)
          return
        }
        commit('setUser', userDB)
        router.push('/')
        localStorage.setItem('usuario', JSON.stringify(userDB))
      } catch (error) {
        console.log(error)
      }
    },
    async registrarUsuario({ commit }, usuario) {
      try {
        const BASE_URL_AUTH = process.env.VUE_APP_BASE_URL_AUTH
        const AUTH_KEY = process.env.VUE_APP_AUTH_KEY
        const res = await fetch(`${BASE_URL_AUTH}:signUp?key=${AUTH_KEY}`, {
          method: 'POST',
          body: JSON.stringify({
            email: usuario.email,
            password: usuario.password,
            returnSecureToken: true
          })
        })
        const userDB = await res.json()
        console.log(userDB)
        if (userDB.error) {
          console.log(userDB.error)
          return
        }
        commit('setUser', userDB)
        router.push('/')
        localStorage.setItem('usuario', JSON.stringify(userDB))
      } catch (error) {
        console.log(error)
      }
    },
    async cargarLocalStorage({ commit, state }) {
      if (localStorage.getItem('usuario')) {
        commit('setUser', JSON.parse(localStorage.getItem('usuario')))
      }
      else {
        commit('setUser', null)
        return
      }
      try {
        const BASE_URL = process.env.VUE_APP_BASE_URL
        const res = await fetch(`${BASE_URL}/tareas/${state.user.localId}.json?auth=${state.user.idToken}`)
        const dataDB = await res.json()
        const arrayTareas = []

        for (let id in dataDB) {
          arrayTareas.push(dataDB[id])
        }
        
        commit('cargar', arrayTareas)
      } catch (error) {
        console.log(error)
      }
    },
    async setTareas({ commit, state }, tarea) {
      try {
        const BASE_URL = process.env.VUE_APP_BASE_URL
        const res = await fetch(`${BASE_URL}/tareas/${state.user.localId}/${tarea.id}.json?auth=${state.user.idToken}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(tarea)
        })

        const dataDB = await res.json()
      } catch (error) {
        console.log(error)
      }
      commit('set', tarea)
    },
    async deleteTareas({ commit, state }, id) {
      try {
        const BASE_URL = process.env.VUE_APP_BASE_URL
        const res = await fetch(`${BASE_URL}/tareas/${state.user.localId}/${id}.json?auth=${state.user.idToken}`, {
          method: 'DELETE'
        })
        commit('eliminar', id)
      } catch (error) {
        console.log(error)
      }
    },
    setTarea({ commit }, id) {
      commit('tarea', id)
    },
    async updateTarea({ commit, state }, tarea) {
      try {
        const BASE_URL = process.env.VUE_APP_BASE_URL
        const res = await fetch(`${BASE_URL}/tareas/${state.user.localId}/${tarea.id}.json?auth=${state.user.idToken}`, {
          method: 'PATCH',
          body: JSON.stringify(tarea)
        })
        const dataDB = await res.json()
        commit('update', dataDB)
      } catch (error) {
        console.log(error)
      }
    }
  },
  getters: {
    usuarioAutenticado(state) {
      return !!state.user
    }
  },
  modules: {
  }
})

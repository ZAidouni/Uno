<template>
  <div class="login-container">
    <h2>LOGIN</h2>
    <input v-model="user.email" type="email" placeholder="Email">
    <input v-model="user.password" type="password" placeholder="Mot de passe">
    <button @click="login">Se connecter</button>
    <router-link to="/forgot-password">Mot de passe oublié ?</router-link>

    <!-- Ajoutez votre loader ici. Il sera affiché lorsque isLoading est true. -->
    <div v-if="isLoading">Loading...</div>

    <!-- Message d'erreur ici -->
    <div v-if="errorMessage">{{ errorMessage }}</div>
  </div>
</template>

<script>
import axios from 'axios';


export default {
  data() {
    return {
      user: {
        email: '',
        password: '',
      },
      errorMessage: '',
      isLoading: false,
    };
  },
  async created() {
    if (localStorage.getItem('token')) {
      this.$router.push('/home');
    }
  },
  methods: {
    async login() {
      this.isLoading = true;
      try {
        const response = await axios.post(`${process.env.VUE_APP_API_URL}/api/v1/users/login`, this.user);
        if (response.status === 200) {
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('user', JSON.stringify(response.data.data.user));
          this.$router.push('/home');
        }
      } catch (error) {
        this.errorMessage = error.response.data.message || 'Une erreur inconnue est survenue.';
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: flex-start;
  align-items: center;
  background: rgba(15, 13, 13, 0.2);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 1em;
}
.login-container button {
  background: #f9a826;
  border: none;
  border-radius: 16px;
  padding: 0.5em 1em;
  color: #fff;
  font-weight: bold;
  font-size: 1em;
  cursor: pointer;
}
.login-container button:hover {
  background: #f9a826cc;
}
.login-container input {
  border: none;
  border-radius: 16px;
  padding: 0.5em 1em;
  font-size: 1em;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: #fff;
}
.login-container input:focus {
  outline: none;
}
.login-container h2 {
  color: #fff;
  font-size: 2em;
  font-weight: bold;
}
.login-container a {
  color: #fff;
  font-size: 0.8em;
  text-decoration: none;
}
.login-container a:hover {
  text-decoration: underline;
}

</style>

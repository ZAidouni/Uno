<template>
  <NavBar/>
  <div class="forgot-password-container">
    <h1>Reset Password</h1>
    <input v-model="user.email" type="email" placeholder="Email">
    <button @click="forgotPassword">Reset Password</button>

    <!-- Add your loader here. It will be displayed when isLoading is true. -->
    <div v-if="isLoading">Loading...</div>

    <!-- Error message here -->
    <div v-if="errorMessage">{{ errorMessage }}</div>
  </div>
</template>

<script>
import axios from 'axios';
import NavBar from './NavBar.vue';

export default {
  components: {
    NavBar,
  },
  data() {
    return {
      user: {
        email: '',
      },
      errorMessage: '',
      isLoading: false,
    };
  },
  methods: {
    async forgotPassword() {
      this.isLoading = true;
      try {
        const response = await axios.post(`${process.env.VUE_APP_API_URL}/api/v1/users/forgotPassword`, this.user);
        if (response.status === 200) {
          console.log(response.data);
          this.errorMessage = 'Un lien de réinitialisation de mot de passe a été envoyé à votre adresse e-mail.';
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
body {
  background: url('https://source.unsplash.com/random') no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}

.forgot-password-container {
  width: 500px;
  margin: auto;
  margin-top: 100px;
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  padding: 20px;
  color: #fff;
  text-align: center;
}

h1 {
  color: white;
}

input,
button {
  margin: 10px 0;
  padding: 10px;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  width: 100%;
}

button {
  background: rgba(255, 145, 0, 0.3);
  cursor: pointer;
  transition: 0.3s ease;
  border-radius: 10px;
}

button:hover {
  background: rgba(0, 0, 0, 0.5);
  color: white;
}
</style>
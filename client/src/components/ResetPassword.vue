<template>
  <NavBar />
  <div class="reset-password-container">
    <input v-model="user.password" type="password" placeholder="New password">
    <input v-model="user.passwordConfirm" type="password" placeholder="Confirm the new password">
    <button @click="resetPassword">Reset password</button>

    <!-- Add your loader here. It will be displayed when isLoading is true. -->
    <div v-if="isLoading">Loading...</div>

    <!-- Error message here -->
    <div v-if="errorMessage">{{ errorMessage }}</div>
  </div>
</template>

<script>
import axios from 'axios';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import NavBar from './NavBar.vue';

export default {
  components: {
    NavBar,
  },
  data() {
    return {
      user: {
        password: '',
        passwordConfirm: '',
      },
      errorMessage: '',
      isLoading: false,
    };
  },
  methods: {
    async resetPassword() {
      this.isLoading = true;
      try {
        const response = await axios.patch(`${process.env.VUE_APP_API_URL}/api/v1/users/resetPassword/${this.$route.params.token}`, this.user);
        if (response.status === 200) {
          console.log(response.data);
          this.errorMessage = 'Votre mot de passe a été réinitialisé avec succès.';
          // Vous pouvez rediriger l'utilisateur vers la page de connexion ici
          toast("Mot de passe mis à jour avec succes", {
            autoClose: 3000,
          });
          this.$router.push('/');
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

.form-container {
  width: 500px;
  margin: auto;
  margin-top: 30px;
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 10px;
  margin-bottom: 60px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  padding: 20px;
  color: black;
}

form {
  display: flex;
  flex-direction: column;
}

input,
select,
button {
  margin: 10px 0;
  padding: 10px;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: black;
  border-radius: 10px;
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
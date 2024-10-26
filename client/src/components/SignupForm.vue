<template>
  <div class="signup-container">
    <h2>Sign UP</h2>
    <input v-model="user.firstName" placeholder="Prénom">
    <input v-model="user.lastName" placeholder="Nom">
    <input v-model="user.email" type="email" placeholder="Email">
    <input v-model="user.password" type="password" placeholder="Mot de passe">
    <input v-model="user.passwordConfirm" type="password" placeholder="Confirmer le mot de passe">
    <button @click="signup">Sign Up</button>

    <!-- Ajoutez votre loader ici. Il sera affiché lorsque isLoading est true. -->
    <div v-if="isLoading">Loading...</div>

    <!-- Message d'erreur ici -->
    <div v-if="errorMessage">{{ errorMessage }}</div>
  </div>
</template>

<script>
import axios from 'axios';
import { toast } from 'vue3-toastify';

export default {
  data() {
    return {
      user: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        passwordConfirm: '',
      },
      errorMessage: '',
      isLoading: false,
    };
  },
  methods: {
    async signup() {
      this.isLoading = true;
      try {
        const response = await axios.post(`${process.env.VUE_APP_API_URL}/api/v1/users/signup`, this.user);

        // La requête a réussi, rediriger l'utilisateur vers la page d'accueil
        if (response.status === 201) {
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('user', JSON.stringify(response.data.data.user));
          this.$router.push('/home');
          toast.success('Votre compte a été créé avec succès !');
        } else {
          // Gérer les autres codes de statut ici si nécessaire
          this.errorMessage = response.data.message;
        }
      } catch (error) {
        // Gérer les erreurs ici
        if (error.response && error.response.data && error.response.data.message) {
          this.errorMessage = error.response.data.message;
        } else {
          this.errorMessage = 'Une erreur est survenue, veuillez réessayer plus tard.';
        }
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>


<style scoped>
.signup-container {
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

.signup-container button {
  background: #f9a826;
  border: none;
  border-radius: 16px;
  padding: 0.5em 1em;
  color: #fff;
  font-weight: bold;
  font-size: 1em;
  cursor: pointer;
}

.signup-container button:hover {
  background: #f9a826cc;
}

.signup-container input {
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

.signup-container input:focus {
  outline: none;
}

.signup-container h2 {
  color: #fff;
  font-size: 2em;
  font-weight: bold;
}

.signup-container a {
  color: #fff;
  font-size: 0.8em;
  text-decoration: none;
}

.signup-container a:hover {
  text-decoration: underline;
}</style>
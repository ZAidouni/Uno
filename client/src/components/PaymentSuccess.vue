<template>
  <div class="payment-page">
    <svg width="300px" height="300px" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="48" fill="white" fill-opacity="0.01" />
      <path
        d="M24 4L29.2533 7.83204L35.7557 7.81966L37.7533 14.0077L43.0211 17.8197L41 24L43.0211 30.1803L37.7533 33.9923L35.7557 40.1803L29.2533 40.168L24 44L18.7467 40.168L12.2443 40.1803L10.2467 33.9923L4.97887 30.1803L7 24L4.97887 17.8197L10.2467 14.0077L12.2443 7.81966L18.7467 7.83204L24 4Z"
        fill="#2F88FF" stroke="#000000" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M17 24L22 29L32 19" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
    <h1>Paiement réussi !</h1>
    <div>Vous allez être rediriger sur la page d'accueil...</div>
    <!-- Vous pouvez remplacer le texte ci-dessus par une animation de chargement si vous le souhaitez -->
  </div>
</template>

<script>
import axios from 'axios';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
  data() {
    return {
      isLoading: false
    };
  },
  async created() {
    try {
      this.isLoading = true;
      const token = localStorage.getItem('token');
      const headers = {
        'Authorization': 'Bearer ' + token,
      };
      const response = await axios.put(`${process.env.VUE_APP_API_URL}/api/v1/users/me`, { status: 'premium' }, { headers });
      console.log(response);
      setTimeout(() => {
        this.$router.push('/home'); // Remplacez 'HomePage' par le nom ou la route de votre page d'accueil
      }, 4000); // Attend 3 secondes avant de rediriger
      this.isLoading = false;
    } catch (error) {
      console.error(error);
      this.isLoading = false;
      toast('Erreur lors de la mise à jour du statut', {
        autoClose: 2000
      });
    }
  }
}
</script>
<style>
.payment-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
</style>
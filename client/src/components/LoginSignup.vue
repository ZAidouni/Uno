<template>
  <div class="home-container">
    <div class="image-container">
      <!-- Votre image ici -->
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/UNO_Logo.svg/2560px-UNO_Logo.svg.png"
        alt="Image de jeu" />
      <h2>
        Play Uno with your friends
      </h2>
    </div>
    <div class="form-container">
      <div v-if="isLogin">
        <login-component></login-component>
        <p>New here ? <button @click="toggleView">Sign Up</button></p>
      </div>
      <div v-else>
        <signup-component></signup-component>
        <p>Already a member ? <button @click="toggleView">Login</button></p>
      </div>
    </div>
  </div>
</template>

<script>
import LoginComponent from './LoginForm.vue'
import SignupComponent from './SignupForm.vue'

export default {
  components: {
    LoginComponent,
    SignupComponent
  },
  data() {
    return {
      isLogin: true
    };
  },
  methods: {
    toggleView() {
      this.isLogin = !this.isLogin;
    }
  }
};
</script>

<style scoped>
.home-container {
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
}

.image-container {
  background-size: cover;
  width: 50%;

}

.image-container img {
  width: 400px;
  height: auto;
  object-fit: cover;
}

.form-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.form-container button {
  background-color: #f1f1f1;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  color: #333;
  margin-left: 20px;
}

.form-container button:hover {
  background-color: #ddd;
}



.form-container p {
  margin-top: 20px;
}
</style>
<template>
  <nav>
    <router-link to="/home">
      <div class="logo">
        <div class="uno-circle"></div>
        <div class="uno-logo">
          <p>
            UNO
          </p>
        </div>
      </div>
    </router-link>
    <!-- You can add more links here -->

    <!-- Dropdown Menu -->
    <div class="dropdown-content">
      <router-link to="/profile">
        <font-awesome-icon icon="fa-solid fa-user-pen" />
      </router-link>
      <a @click="logout">
        <font-awesome-icon icon="fa-solid fa-right-from-bracket" />
      </a>
    </div>
  </nav>
</template>

<script>
import axios from 'axios';
import 'vue3-toastify/dist/index.css';

export default {
  methods: {
    async logout() {
      try {
        const response = await axios.get(process.env.VUE_APP_API_URL + '/api/v1/users/logout');
        if (response.data.status === 'success') {
          // Remove JWT token from localStorage
          localStorage.removeItem('token');
          // Redirect to login page
          this.$router.push('/');
        }
      } catch (error) {
        console.error('Error during logout:', error);
      }
    }
  }
}
</script>

<style>
.dropdown-content {
  display: flex;
  color: black;
  justify-content: space-evenly;
  border-radius: 50%;
  gap: 30px;
  align-items: center;
}

nav .uno-logo p {
  background: linear-gradient(to bottom, yellow, white);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  -webkit-text-stroke-width: .2px;
  -webkit-text-stroke-color: white;
  text-shadow: 2px 2px 0px rgba(0, 0, 0, 0.487);
  transform: rotate(-45deg);
  font-size: 16px;
  font-weight: bold;
}

nav .uno-circle {
  position: absolute;
  width: 40px;
  height: 60px;
  background-color: red;
  transform: rotate(45deg) translate(-16px, -15px);
  border-radius: 50%;
  z-index: 1;
}

nav .uno-logo {
  position: relative;
  z-index: 2;
}

.dropdown-content a {
  border-radius: 10px;
}

.dropdown-content a svg {
  color: black;
  /* padding: 12px 16px; */
  margin: auto;
  text-decoration: none;
  padding: 10px;
  display: flex;
  cursor: pointer;
}

.dropdown-content a svg:nth-child(2) {
  color: red;
}

.dropdown-content a:hover {
  background-color: #ddd;
}

.dropdown:hover .dropbtn {
  background-color: #3e8e41;
}

nav {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 0 0 15px 15px;
  padding: 10px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

nav a {
  text-decoration: none;
  font-weight: 500;
}
</style>
<template>
  <NavBar/>
  <div class="form-container">
    <h1>Create a New User</h1>
    <form @submit.prevent="submitForm">
      <input type="text" v-model="user.firstName" placeholder="First Name" required>
      <input type="text" v-model="user.lastName" placeholder="Last Name" required>
      <input type="email" v-model="user.email" placeholder="Email" required>
      <input type="password" v-model="user.password" placeholder="Password" required>
      <input type="password" v-model="user.passwordConfirm" placeholder="Confirm Password" required>
      <input type="date" v-model="user.date_of_birth" placeholder="Date of Birth" required>
      <select v-model="user.role">
        <option disabled value="">Please select a role</option>
        <option>admin</option>
        <option>user</option>
      </select>
      <button type="submit">Submit</button>
    </form>
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
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        passwordConfirm: '',
        date_of_birth: '',
        role: '',
      },
    };
  },
  methods: {
    async submitForm() {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.post(
          `${process.env.VUE_APP_API_URL}/api/v1/users`,
          this.user,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log(response);
        // Redirect back to Admin Page
        this.$router.push('/admin');
      } catch (error) {
        console.error(error);
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
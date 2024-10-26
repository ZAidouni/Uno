<template>
  <div>
    <NavBar />
    <div class="edit-container">
      <div class="update-section">
        <div @click="() => {
          return showProfil = !showProfil
        }">
          <h1>Update Profile</h1>
        </div>
        <form v-show="showProfil" @submit.prevent="updateProfile">
          <div class="line-form">
            <label>
              First Name : *
            </label>
            <input type="text" v-model="firstName" required />
          </div>
          <div class="line-form">
            <label>
              Last Name :
            </label>
            <input type="text" v-model="lastName" required />
          </div>
          <div class="line-form">
            <label>
              Date of birth :
            </label>
            <input type="date" v-model="date_of_birth" required />
          </div>
          <button type="submit">Mettre à jour le profil</button>
        </form>
      </div>

      <div class="update-section">
        <!-- formulaire de mise à jour du mot de passe -->
        <div @click="() => {
        return showPassword = !showPassword
      }">
          <h1>Change Password</h1>
        </div>
        <form v-show="showPassword" @submit.prevent="updateProfile">
          <div class="line-form">
            <label>
              Current password :
            </label>
            <input type="password" v-model="passwordCurrent" required />
          </div>
          <div class="line-form">
            <label>
              New password :
            </label>
            <input type="password" v-model="password" required />
          </div>
          <div class="line-form">
            <label>
              Confirm new password&nbsp;:
            </label>
            <input type="password" v-model="passwordConfirm" required />
          </div>
          <button type="submit">Update your password</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import NavBar from './NavBar.vue';

export default {
  data() {
    return {
      firstName: '',
      lastName: '',
      date_of_birth: '',
      passwordCurrent: '',
      password: '',
      passwordConfirm: '',
      showProfil: false,
      showPassword: false
    }
  },
  components: {
    NavBar
  },
  async created() {
    let token = localStorage.getItem('token');
    if (token) {
      const headers = {
        'Authorization': 'Bearer ' + token
      };
      try {
        const response = await axios.get(`${process.env.VUE_APP_API_URL}/api/v1/users/me`, { headers });
        this.firstName = response.data.data.user.firstName;
        this.lastName = response.data.data.user.lastName;
        this.date_of_birth = response.data.data.user.date_of_birth;
        //console.log(response);
      } catch (error) {
        console.error(error);
        alert('Erreur lors de la récupération des informations du profil');
      }
    }
  },
  methods: {
    async updateProfile() {
      console.log('front updateProfile');
      let token = localStorage.getItem('token');

      if (token) {
        const headers = {
          'Authorization': 'Bearer ' + token
        };
        try {
          const response = await axios.patch(`${process.env.VUE_APP_API_URL}/api/v1/users/me`, {
            firstName: this.firstName,
            lastName: this.lastName,
            date_of_birth: this.date_of_birth
          }, { headers });
          if (response.status === 200) {
            // alert('Profil mis à jour avec succès');
            toast("Profil mis à jour avec succès", {
              autoClose: 3000,
            });
            //this.$router.push('/home');
          }
        } catch (error) {
          console.error(error);
          alert('Erreur lors de la mise à jour du profil');
        }
      }
    },
    async updatePassword() {
      let token = localStorage.getItem('token');

      if (token) {
        const headers = {
          'Authorization': 'Bearer ' + token
        };
        try {
          const response = await axios.patch(`${process.env.VUE_APP_API_URL}/api/v1/users/updateMyPassword`, {
            passwordCurrent: this.passwordCurrent,
            password: this.password,
            passwordConfirm: this.passwordConfirm
          }, { headers });
          if (response.status === 200) {
            toast("Mot de passe mis à jour avec succès", {
              autoClose: 1000,
            });
            this.passwordCurrent = '';
            this.password = '';
            this.passwordConfirm = '';
          }
        } catch (error) {
          console.error(error);
          //alert('Erreur lors de la mise à jour du mot de passe');
          toast("Erreur lors de la mise à jour du mot de passe", {
            autoClose: 1000,
          });
        }
      }
    }
  }
}
</script>

<style scoped>
.edit-container {
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

.update-section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 1em;
  margin: 1rem auto;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}

h1 {
  margin: 3rem !important;
}

.line-form {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin: 1rem;
}

.line-form label {
  width: 50%;
  text-align: left;
}

.line-form input {
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 1em;
}

button {
  width: 50%;
  margin: 1rem;
  padding: 1rem;
  border-radius: 16px;
  border: none;
  background: rgba(247, 154, 4, 0.2);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}

button:hover {
  background: rgba(247, 154, 4, 0.4);
  transition: all 0.3s ease-in-out;
}

.update-section:hover {
  background: rgba(100, 76, 76, 0.2);
  transition: all 0.3s ease-in-out;
}
</style>
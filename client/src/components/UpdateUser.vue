<template>
    <NavBar />
    <div>
        <div v-if="loading">Loading...</div>

        <div v-else class="form-container">
            <h1>Update User</h1>
            <form @submit.prevent="updateUser">
                <label for="firstName">First Name:</label>
                <input id="firstName" v-model="user.firstName" required />
                <br>
                <label for="lastName">Last Name:</label>
                <input id="lastName" v-model="user.lastName" required />
                <br>
                <label for="email">Email:</label>
                <input id="email" v-model="user.email" required />
                <br>
                <label for="role">Role:</label>
                <select v-model="user.role">
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>
                <br>
                <!-- You can add other fields here -->

                <button type="submit">Update</button>
            </form>
        </div>

    </div>
</template>

<script>
import axios from 'axios';
import NavBar from './NavBar.vue';
// import jwtDecode from 'jwt-decode';

export default {
    components: {
        NavBar
    },
    name: "UpdateUser",
    data() {
        return {
            user: {},
            loading: true,
        };
    },
    methods: {
        async loadUser() {
            const token = localStorage.getItem('token');
            const userId = this.$route.params.id;
            try {
                const response = await axios.get(`${process.env.VUE_APP_API_URL}/api/v1/users/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                this.user = response.data.data.user; // Assurez-vous que cela correspond à la structure de vos données retournées
            } catch (error) {
                console.error(error);
            } finally {
                this.loading = false;
            }
        },
        async updateUser() {
            const token = localStorage.getItem('token');
            const userId = this.$route.params.id;
            try {
                await axios.patch(`${process.env.VUE_APP_API_URL}/api/v1/users/${userId}`, this.user, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                // Rediriger l'administrateur vers la page Admin après la mise à jour
                this.$router.push('/admin');
            } catch (error) {
                console.error(error);
            }
        },
    },
    async created() {
        await this.loadUser();
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
    border: 1px solid rgba(255, 255, 255, 0.18);
    padding: 20px;
    margin-bottom: 60px;
    color: black;
}

form {
    display: flex;
    flex-direction: column;
}

label {
    margin: 10px 0;
}

input,
button,
select,
option {
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
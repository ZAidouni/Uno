<template>
    <NavBar />
    <div class="admin-container">
        <h1>Admin Dashboard</h1>
        <button class="add-user-btn" @click="createUser">Add new user</button>
        <div v-if="loading">Loading...</div>
        <table v-else>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Prénom</th>
                    <th>Nom</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Update</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in users" :key="user._id">
                    <td>{{ user._id }}</td>
                    <td>{{ user.firstName }}</td>
                    <td>{{ user.lastName }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{ user.role }}</td>
                    <td>
                        <button @click="goToUpdatePage(user._id)">Update</button>
                    </td>
                    <td>
                        <button @click="deleteUser(user._id)">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import NavBar from './NavBar.vue';

export default {
    name: "AdminPage",
    components: {
        NavBar,
    },
    data() {
        return {
            users: [],
            loading: true,
        };
    },
    methods: {
        async loadUsers() {
            const token = localStorage.getItem('token');
            const decodedToken = jwtDecode(token);
            if (decodedToken.role === 'admin') {
                try {
                    const response = await axios.get(`${process.env.VUE_APP_API_URL}/api/v1/users/`, {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    this.users = response.data.data.users;
                } catch (error) {
                    console.error(error);
                } finally {
                    this.loading = false;
                }
            }
        },
        async deleteUser(id) {
            try {
                const token = localStorage.getItem('token');
                await axios.delete(`${process.env.VUE_APP_API_URL}/api/v1/users/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                // Recharger les utilisateurs après avoir supprimé un utilisateur
                this.loadUsers();
            } catch (error) {
                console.error(error);
            }
        },
        goToUpdatePage(id) {
            this.$router.push(`/update-user/${id}`);
        },
        createUser() {
            this.$router.push('/createUser');
        },
    },
    async created() {
        await this.loadUsers();
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

.admin-container {
    width: 90%;
    margin: 3rem auto;
    background: rgba(255, 255, 255, 0.1);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.18);
    padding: 20px;
    color: white;
    /* overflow: scroll; */
}

h1 {
    text-align: center;
    padding: 20px;
}

table {
    width: 100%;
    border-collapse: collapse;
}

thead {
    background-color: rgba(0, 0, 0, 0.1);
}

th,
td {
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.add-user-btn {
    margin-bottom: 20px;
}

button {
    padding: 5px 10px;
    border: none;
    border-radius: 5px;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.3);
    cursor: pointer;
    transition: 0.3s ease;
}

button:hover {
    background-color: rgba(0, 0, 0, 0.5);
}
</style>
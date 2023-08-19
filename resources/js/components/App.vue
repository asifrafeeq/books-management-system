<template>
    <main>
         <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <div class="container-fluid">
                <router-link to="/" class="navbar-brand" href="#">Books Management System</router-link>
                <div class="collapse navbar-collapse">
                    <div class="navbar-nav">
                        <router-link exact-active-class="active" to="/" class="nav-item nav-link">Home</router-link>
                        <router-link exact-active-class="active" to="/books" class="nav-item nav-link">Books</router-link>
                        <router-link v-if="authenticated" to="#" class="nav-item nav-link" @click="logout">Logout</router-link>

                    </div>
                </div>
            </div>
        </nav>
        <div class="container mt-5">
            <div v-if="!authenticated">
                <!-- Display the login form when not authenticated -->
                <component :is="loginOrRegister"></component>
            </div>
            <div v-else>
                <!-- Display the main content when authenticated -->
                <router-view></router-view>
            </div>
        </div>
    </main>
</template>

<script>
import LoginForm from '@/components/LoginForm.vue';
import RegisterForm from '@/components/RegisterForm.vue';


export default {
    data() {
        return {
            authenticated: false,
            loginOrRegister: 'LoginForm', // Default to login form
        };
    },
    created() {
        const authToken = localStorage.getItem('authToken');
        if (authToken) {
            this.authenticated = true;
        }
    },

    // ... other methods ...
    methods: {
        switchForm(formType) {
            this.loginOrRegister = formType;
        },

         logout() {
        localStorage.removeItem('authToken');
        this.authenticated = false;
        }

    },
    components: {
        LoginForm,
        RegisterForm,
    },
};
</script>



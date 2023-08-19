<template>
    <form @submit.prevent="login">
        <h2>Login</h2>
         <div class="form-group">
	            <label>Email</label>
	            <input v-model="loginData.email" type="email" class="form-control" required>
	        </div>
	        <div class="form-group">
	            <label>Password</label>
	            <input v-model="loginData.password" type="password" class="form-control" required>
	        </div>
        <button type="submit" class="btn btn-success mt-3">Login</button>
    </form>
</template>

<script>
import { routes } from '@/routes';
import axios from 'axios';

export default {

	data() {
    return {
	        loginData: {
	            email: '',
	            password: '',
		        },
		    };
		},

    methods: {
	         login() {
			    axios.post('/api/login', this.loginData)
			        .then(response => {
			            localStorage.setItem('authToken', response.data.token);
			            this.authenticated = true;
			            console.log(response.data.message);
			            this.$router.push({ name: 'home' });
			             window.location.reload();
			        })
			        .catch(error => {
			            console.error(error.response.data.message);
			        });
			},



    }
};
</script>

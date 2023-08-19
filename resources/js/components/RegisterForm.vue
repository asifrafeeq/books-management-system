<template>
    <form @submit.prevent="register">
        <h2>Register</h2>
         <div class="form-group">
            <label>Name</label>
            <input v-model="registerData.name" type="text" class="form-control" required>
        </div>
        <div class="form-group">
            <label>Email</label>
            <input v-model="registerData.email" type="email" class="form-control" required>
        </div>
        <div class="form-group">
            <label>Password</label>
            <input v-model="registerData.password" type="password" class="form-control" required>
        </div>
        <button type="submit" class="btn btn-success">Register</button>
    </form>
</template>

<script>
export default {
    methods: {
         register() {
            axios.post('/api/register', this.registerData)
                .then(response => {
                    console.log(response.data.message);
                })
                .catch(error => {
                    console.error(error.response.data.message);
                });
        },
    }
};
</script>

<script setup lang="ts">
import { ref } from 'vue'
import { AuthService } from '@/entities/auth'
import router from '../../router';

const email = ref(`mock@gmail.com`);
const password = ref(`11111111`);
const passwordRepeat = ref(password);
const authService = AuthService.inject();


async function signup() {
    authService.signup({
        email: email.value,
        password: password.value,
        passwordRepeat: passwordRepeat.value
    }).then(() => {
    });
}
</script>

<template>
    <input type="text"
           name="email"
           id="email"
           v-model="email">
    <input type="password"
           name="password"
           id="password"
           v-model="password">
    <input type="password"
           name="passwordRepeat"
           id="passwordRepeat"
           v-model="passwordRepeat">

    <button @click="signup()">signup</button>
</template>

<style scoped>
</style>

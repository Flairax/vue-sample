<script setup lang="ts">
import { ref } from 'vue'
import router from '../../router'
import { AUTH } from '@/entities'
// import { rote } from 'vue-router';

const email = ref(`mock@gmail.com`)
const password = ref(`1111`)

async function login() {
  AUTH.login({
    email: email.value,
    password: password.value
  }).then(() => {})
}
</script>

<template>
  <input type="text" name="email" id="email" v-model="email" />
  <input type="password" name="password" id="password" v-model="password" />

  <button @click="login()">Login</button>
</template>

<style scoped></style>

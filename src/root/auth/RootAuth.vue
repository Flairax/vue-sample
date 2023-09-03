<script setup lang="ts">
import { watch } from 'vue';
import { AuthService } from '../../entities/auth';
import SignIn from './SignIn.vue';
import SignUp from './SignUp.vue';
import { HttpState } from '@/components';
import { ref } from 'vue'
import { watchEffect } from 'vue';

const authService = AuthService.inject();
const tabs: Record<string, any> = {
    signin: SignIn,
    signup: SignUp
}

const tab = ref(`signin`);

console.log(authService);

watchEffect(() => {
    console.log(authService.state.value);

});

</script>

<template>
    <div>
        <div>
            <button @click="tab = `signin`">Sign in</button>
            <button @click="tab = `signup`">Sign up</button>
        </div>
    </div>
    <component :is="tabs[tab]"></component>

    <HttpState :request="authService">
        <template v-slot="{ data }">
            <div>{{ JSON.stringify(data) }}</div>
        </template>
    </HttpState>
</template>

<style scoped>
</style>

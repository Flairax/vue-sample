<script setup lang="ts">
import { HttpState } from '@/components';
import { AUTH } from '@/entities';
import { ref } from 'vue';
import SignIn from './SignIn.vue';
import SignUp from './SignUp.vue';

const tabs: Record<string, any> = {
    signin: SignIn,
    signup: SignUp
}

const tab = ref(`signin`);

</script>

<template>
    <div>
        <div>
            <button @click="tab = `signin`">Sign in</button>
            <button @click="tab = `signup`">Sign up</button>
        </div>
    </div>
    <component :is="tabs[tab]"></component>

    <HttpState :request="AUTH">
        <template v-slot="{ data }">
            <div>{{ JSON.stringify(data) }}</div>
        </template>
    </HttpState>
</template>

<style scoped>
</style>

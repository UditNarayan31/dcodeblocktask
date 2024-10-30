<template>
  <div class="mx-auto w-50">
    <h2 class="mt-n5">Login</h2>
    <v-select  density="compact" label="Select Role" v-model="roles" :items="['User', 'Admin']"></v-select>
    <v-text-field density="compact" v-model="email" label="Email" required></v-text-field>
    <v-text-field density="compact" v-model="password" label="Password" type="password" required></v-text-field>
    <p>Don't have account! Please Register Here <v-btn class="text-capitalize" flat
        @click="router.push('/register')">Register</v-btn> </p> <br>
    <v-btn @click="loginUser" class="text-capitalize" color="primary">Login</v-btn>

  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'vue-router';
import EventBus from '@/eventbus';

const router = useRouter();
const email = ref('');
const password = ref('');
const roles = ref('User')


const loginUser = async () => {
  try {
    if (roles.value === 'User') {
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email.value, password.value);
      localStorage.setItem('user', JSON.stringify(auth.currentUser));
      router.push('/profile');
    } else if (roles.value === 'Admin') {
      if (email.value === 'admin@gmail.com' && password.value === 'admin') {

        EventBus.adminlogin = true

        router.push('/adminview');
      } else {
        alert('Admin Email/Passworld Invalid')
      }

    }

  } catch (error) {
    alert(error.message);
  }
};


</script>

<style scoped></style>
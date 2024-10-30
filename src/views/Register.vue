<template>
  <div class="mx-auto w-50">
    <h2 class="mt-n10">User Register</h2>
    <v-text-field density="compact" v-model="username" label="Username *" required></v-text-field>
    <v-text-field density="compact" v-model="email" label="Email *" required></v-text-field>
    <v-text-field density="compact" v-model="phone" label="Phone Number *" required></v-text-field>
    <v-text-field density="compact" v-model="address" label="Address *" required></v-text-field>
    <v-text-field density="compact" v-model="password" label="Password *" type="password" required></v-text-field>
    <v-text-field density="compact" v-model="confirmPassword" label="Confirm Password *" type="password"
      required></v-text-field>
    <p>Already have account! Please Login Here <v-btn class="text-capitalize" flat
        @click="router.push('/login')">Login</v-btn> </p><br>
    <v-btn @click="registerUser" class="text-capitalize mt-n6" color="primary">Register</v-btn>

  </div>
</template>

<script setup>
import { ref } from 'vue';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'vue-router';
import { getDatabase, ref as dbRef, set } from 'firebase/database';
const router = useRouter();
const username = ref('');
const email = ref('');
const phone = ref('');
const address = ref('');
const password = ref('');
const confirmPassword = ref('');

const registerUser = async () => {
  // Check if any required field is empty
  if (!username.value || !email.value || !phone.value || !address.value || !password.value || !confirmPassword.value) {
    alert("Please fill in all fields.");
    return;
  }

  // Check if passwords match
  if (password.value !== confirmPassword.value) {
    alert("Passwords do not match.");
    return;
  }

  try {
    const auth = getAuth();
    const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);
    const user = userCredential.user;

    const database = getDatabase();
    await set(dbRef(database, 'users/' + user.uid), {
      username: username.value,
      email: email.value,
      phone: phone.value,
      address: address.value,
    });

    localStorage.setItem('user', JSON.stringify(auth.currentUser));
    router.push('/login');
  } catch (error) {
    alert(error.message);
  }
};

</script>

<style scoped></style>
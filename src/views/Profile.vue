<template>
  <div class="mx-auto w-50 pa-5">
    <h2>User Profile</h2>

    <v-card v-if="userData">
      <v-card-text>
        <p><strong>Username:</strong> {{ userData.username }}</p>
        <p><strong>Email:</strong> {{ userData.email }}</p>
        <p><strong>Phone Number:</strong> {{ userData.phone }}</p>
        <p><strong>Address:</strong> {{ userData.address }}</p>
      </v-card-text>
    </v-card>
    <p v-else>Loading...</p>
    <v-btn class="mt-2" @click="logout" color="primary">Logout</v-btn>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref as dbRef, get } from 'firebase/database';
import { useRouter } from 'vue-router';

const router = useRouter();
const userData = ref(null);

// Fetch user data from Firebase Realtime Database
const fetchUserData = async (userId) => {
  try {
    const database = getDatabase();
    const userRef = dbRef(database, `users/${userId}`);
    console.log('Fetching data from:', `users/${userId}`); // Log the reference path
    const snapshot = await get(userRef);
    console.log(snapshot);
    if (snapshot.exists()) {
      console.log('Data fetched successfully:', snapshot.val()); // Log the fetched data
      userData.value = snapshot.val();
    } else {
      console.log('No data available at this path');
    }
  } catch (error) {

  }
};

// Monitor authentication state and fetch user data when authenticated
const checkUserAuth = () => {
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      fetchUserData(user.uid); // Fetch user data with the user's UID
    } else {
      router.push('/login'); // Redirect to login if user is not authenticated
    }
  });
};

// Logout function
const logout = async () => {
  try {
    const auth = getAuth();
    await signOut(auth);
    router.push('/login'); // Redirect to login after logout
  } catch (error) {
    console.error('Logout failed:', error);
  }
};

// Fetch user data when the component is mounted
onMounted(() => {
  checkUserAuth();
});
</script>

<style scoped>
/* Add your styles here */
</style>
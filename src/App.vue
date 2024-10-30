<script setup>
import { RouterLink, RouterView } from 'vue-router';
import { onMounted, ref, watch } from 'vue';
import { computed } from 'vue';
import EventBus from './eventbus';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import router from './router';

const cartItemCount = ref(0);
const drawer = ref(null);
const user = ref(null);
const isAdmin = ref(false);
const auth = getAuth();
const isAuthenticated = computed(() => !!user.value);

onMounted(() => {

  onAuthStateChanged(auth, (currentUser) => {
    user.value = currentUser;
  });
});

// Watch EventBus.lengthval for changes
watch(
  () => EventBus.lengthval,
  (newMessage) => {
    cartItemCount.value = newMessage;
  }
);

// Watch EventBus.adminlogin for changes
watch(
  () => EventBus.adminlogin,
  (newVal) => {
    isAdmin.value = newVal;
  }
);

// Logout function
const logout = async () => {
  try {
    await signOut(auth);
    user.value = null; // Clear user data after logout
    router.push('/login');
  } catch (error) {
    console.error('Logout failed:', error);
  }
};
</script>

<template>
  <div class="mt-5">
    <v-card>
      <v-layout flat>
        <v-navigation-drawer v-model="drawer" temporary>
          <v-list-item v-if="isAuthenticated" :title="user.email">


          </v-list-item>

          <v-divider></v-divider>

          <v-list density="compact" nav>
            <RouterLink to="/profile" v-if="isAuthenticated" class="route-link" active-class="v-list-item--active">
              <v-list-item title="Profile" value="profile"></v-list-item>
            </RouterLink>
            <RouterLink to="/adminview" class="route-link" active-class="v-list-item--active">
              <v-list-item title="Dashboard" v-if="isAdmin" value="Dashboard"></v-list-item>
            </RouterLink>
            <RouterLink to="/" class="route-link" active-class="v-list-item--active">
              <v-list-item title="Home" value="home"></v-list-item>
            </RouterLink>
            <RouterLink to="/about" class="route-link" active-class="v-list-item--active">
              <v-list-item title="About" value="about"></v-list-item>
            </RouterLink>
            <RouterLink to="/assign3" class="route-link" active-class="v-list-item--active">
              <v-list-item title="Assignment3" value="assign3"></v-list-item>
            </RouterLink>
            <RouterLink to="/products" class="route-link" active-class="v-list-item--active">
              <v-list-item title="Products" value="product"></v-list-item>
            </RouterLink>
            <RouterLink to="/cart" class="route-link" active-class="v-list-item--active">
              <v-list-item value="cart"><span>Cart <span>{{ cartItemCount }}</span></span></v-list-item>
            </RouterLink>
            <RouterLink class="route-link" active-class="v-list-item--active" to="/login"
              v-if="!isAuthenticated && !isAdmin">
              <v-list-item title="Login" value="login"></v-list-item>
            </RouterLink>

            <v-list-item @click="logout" title="Logout" value="logout" v-if="isAuthenticated"></v-list-item>

          </v-list>
        </v-navigation-drawer>

        <v-btn class="ml-2" @click.stop="drawer = !drawer" flat>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            class="feather feather-menu">
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </v-btn>


      </v-layout>
      <div class="pa-5">
        <RouterView />
      </div>
    </v-card>


  </div>
</template>

<style>
.route-link {
  text-decoration: none;
}
</style>

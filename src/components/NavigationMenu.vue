<template>
  <v-card>

   
    <!-- <v-layout>
      <v-navigation-drawer image="https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg" theme="dark" permanent>
        <v-list nav>
          <RouterLink to="/" class="fontcolor">
            <v-list-item prepend-icon="mdi-email" title="Home" value="Home"></v-list-item>
          </RouterLink>
          <RouterLink to="/about" class="fontcolor">
            <v-list-item prepend-icon="mdi-account-supervisor-circle" title="About" value="About"></v-list-item>
          </RouterLink>
          <RouterLink to="/products" class="fontcolor">
            <v-list-item prepend-icon="mdi-clock-start" title="Products" value="Products"></v-list-item>
          </RouterLink>
          <RouterLink to="/cart" class="fontcolor">

            <v-list-item prepend-icon="mdi-clock-start" title="Cart" value="Cart">
              <span>{{ cartItemCount }}</span>
            </v-list-item>

          </RouterLink>
        </v-list>
      </v-navigation-drawer>
    
    </v-layout> -->
  </v-card>
</template>
<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { ref, watch } from 'vue'
import EventBus from '@/eventbus';


const cartItemCount = ref(0)

const drawer = ref(null)

watch(() =>
  EventBus.lengthval, (newMessage) => {
    cartItemCount.value = newMessage
  }
)
</script>

<style scoped>
.fontcolor {
  color: white;
}
</style>

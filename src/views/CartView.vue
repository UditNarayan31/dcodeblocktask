<template>
    <div class="mainbodycart">
        <div class="pa-5" v-if="cartItems.length == 0">Your Cart Is Empty</div>
        <ul class="pa-5">
            <li v-for="(item, i) in cartItems" :key="i">
                {{ item.name }} - ${{ item.price }} (Quantity: {{ item.quantity }})
                <v-btn @click="removeFromCart(item)">
                    Remove
                </v-btn>
            </li>
        </ul>
       
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import EventBus from '@/eventbus';

const cartItems = ref([]);



// Load cart items from EventBus or local storage on component mount
onMounted(() => {
    const storedCart = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems.value = storedCart;
    EventBus.cart = storedCart;
});

// Watch for changes in EventBus.cart to update cartItems
watch(
    () => EventBus.cart,
    (newCart) => {
        cartItems.value = newCart;
    },
    { deep: true, immediate: true }
);

const removeFromCart = (product) => {
    cartItems.value = cartItems.value.filter(item => item.id !== product.id);
    updateCartState();
};


const updateCartState = () => {
    // Update EventBus and local storage
    EventBus.cart = cartItems.value;
    localStorage.setItem('cartItems', JSON.stringify(cartItems.value));
    EventBus.lengthval = cartItems.value.reduce((acc, item) => acc + item.quantity, 0);
};


</script>

<style>
.mainbodycart {
    position: relative;
    left: 20px;
}
</style>

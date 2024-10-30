<template>
    <div class="ml-10">
        <v-row>
            <v-col cols="12" sm="3" v-for="(item, i) in products" :key="i">
                <v-card>
                    <v-img height="150px" src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg" cover></v-img>

                    <v-card-title>
                        {{ item.name }}
                    </v-card-title>

                    <v-card-subtitle>
                        INR {{ item.price }}
                    </v-card-subtitle>

                    <v-card-actions>
                        <v-btn @click="addToCart(item)" :disabled="isInCart(item)" class="text-capitalize">
                            <span v-if="isInCart(item)">
                                Added
                            </span>
                            <span v-else>
                                Add to Cart
                            </span>
                        </v-btn>
                    </v-card-actions>

                </v-card>
            </v-col>
        </v-row>

    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import EventBus from '@/eventbus';

const cartProduct = ref([]);

// Load cart items from local storage when the component is mounted
onMounted(() => {
    const storedCart = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartProduct.value = storedCart;
    EventBus.cart = storedCart;
    updateCartLength();
});

const addToCart = (data) => {
    const existingProduct = cartProduct.value.find(item => item.id === data.id);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cartProduct.value.push({ ...data, quantity: 1 });
    }
    updateCartState();
};

const removeFromCart = (product) => {
    cartProduct.value = cartProduct.value.filter(item => item.id !== product.id);
    updateCartState();
};

const updateCartState = () => {
    localStorage.setItem('cartItems', JSON.stringify(cartProduct.value));
    EventBus.cart = cartProduct.value;
    updateCartLength();
};

const updateCartLength = () => {
    EventBus.lengthval = cartProduct.value.reduce((acc, item) => acc + item.quantity, 0);
};

const products = ref([
    { id: 1, name: 'Product A', price: 50 },
    { id: 2, name: 'Product B', price: 30 },
    { id: 3, name: 'Product C', price: 20 },
    { id: 4, name: 'Product D', price: 50 },
    { id: 5, name: 'Product E', price: 30 },
    { id: 6, name: 'Product F', price: 20 },
]);

const isInCart = (product) => {
    return cartProduct.value.some(item => item.id === product.id);
};
</script>

<style>

</style>
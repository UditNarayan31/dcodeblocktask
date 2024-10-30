import { reactive } from 'vue';


const EventBus = reactive({
    lengthval: 0, 
    adminlogin:false,
    cart: [], // Store cart items here
})

export default EventBus
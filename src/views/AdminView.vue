<template>
    <div class="admin-container mx-auto w-75 pa-5">
        <h2>Registered Users</h2>
        <div class="mt-2" v-if="users.length">
            <v-table>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Address</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in users" :key="user.uid">
                        <td>
                            <input v-if="editUserId === user.uid" v-model="editUser.username" />
                            <span v-else>{{ user.username }}</span>
                        </td>
                        <td>{{ user.email }}</td> <!-- Email field is non-editable -->
                        <td>
                            <input v-if="editUserId === user.uid" v-model="editUser.phone" />
                            <span v-else>{{ user.phone }}</span>
                        </td>
                        <td>
                            <input v-if="editUserId === user.uid" v-model="editUser.address" />
                            <span v-else>{{ user.address }}</span>
                        </td>
                        <td>
                            <v-btn class="text-capitalize" v-if="editUserId === user.uid" @click="saveUser(user.uid)"
                                color="success">Save</v-btn>
                            <v-btn class="text-capitalize" v-else @click="editUserDetails(user)"
                                color="primary">Edit</v-btn>
                        </td>
                        <td>
                            <v-btn class="text-capitalize" @click="deleteUser(user.uid)" color="error">Delete</v-btn>
                        </td>
                    </tr>
                </tbody>
            </v-table>
        </div>
        <p v-else>Loading users...</p>
        <v-btn @click="logout" class="mt-2" color="primary">Logout</v-btn>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { getDatabase, ref as dbRef, get, set, remove } from 'firebase/database';
import { useRouter } from 'vue-router';
import { getAuth, signOut } from 'firebase/auth';
import EventBus from '@/eventbus';

const router = useRouter();
const users = ref([]);
const editUser = ref({}); // Store the user details to edit
const editUserId = ref(null); // Track the currently edited user's ID

// Fetch all users from Firebase Realtime Database
const fetchAllUsers = async () => {
    try {
        const database = getDatabase();
        const usersRef = dbRef(database, 'users');
        const snapshot = await get(usersRef);

        if (snapshot.exists()) {
            const data = snapshot.val();
            users.value = Object.keys(data).map(uid => ({
                uid,
                ...data[uid]
            }));
        } else {
            console.warn('No users found');
        }
    } catch (error) {
        console.error('Error fetching users:', error);
    }
};

// Method to edit user details
const editUserDetails = (user) => {
    editUser.value = { username: user.username, address: user.address, phone: user.phone };
    editUserId.value = user.uid;
};

// Method to save the edited user details
const saveUser = async (uid) => {
    try {
        const database = getDatabase();
        const userRef = dbRef(database, `users/${uid}`);
        const updatedUser = {
            ...users.value.find(u => u.uid === uid), // Keep original data for non-editable fields
            ...editUser.value // Update editable fields
        };
        await set(userRef, updatedUser); // Update user data in the database
        // Update the local users array
        const index = users.value.findIndex(u => u.uid === uid);
        if (index !== -1) {
            users.value[index] = { uid, ...updatedUser };
        }
        // Reset editing state
        editUserId.value = null;
        editUser.value = {};
    } catch (error) {
        console.error('Error saving user:', error);
    }
};

// Method to delete a user
const deleteUser = async (uid) => {
    try {
        const database = getDatabase();
        const userRef = dbRef(database, `users/${uid}`);
        await remove(userRef); // Delete the user from the database
        // Remove the user from the local users array
        users.value = users.value.filter(user => user.uid !== uid);
    } catch (error) {
        console.error('Error deleting user:', error);
    }
};

// Logout function
const logout = async () => {
    try {
        const auth = getAuth();
        await signOut(auth);
        localStorage.removeItem('user');
        EventBus.adminlogin = false;
        router.push('/login');
    } catch (error) {
        console.error('Logout failed:', error);
    }
};

// Fetch all users when the component is mounted
onMounted(() => {
    fetchAllUsers();
    if (EventBus.adminlogin === false) {
        router.push('/login');
    }
});
</script>

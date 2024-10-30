<template>
    <div>
        <h2>Dynamic Form Builder with Validation</h2>

        <v-row>
            <v-col cols="12" sm="6">
                <v-form ref="form" v-model="formValid" class="mt-5">
                    <!-- Full Name Field -->
                    <v-text-field density="compact" dense v-model="formData.text" label="Full Name"
                        :rules="[rules.required]" required></v-text-field>

                    <!-- Email Field -->
                    <v-text-field density="compact" v-model="formData.email" label="Email"
                        :rules="[rules.required, rules.email]" required></v-text-field>

                    <!-- Phone Number Field -->
                    <v-text-field density="compact" v-model="formData.phone" label="Phone Number" type="tel"
                        :rules="[rules.required, rules.phone]" required></v-text-field>

                    <!-- Dropdown Field -->
                    <v-select density="compact" v-model="formData.dropdown" :items="['Male', 'Female', 'Other']"
                        label="Gender" :rules="[rules.required]" required></v-select>

                    <!-- Checkbox Field -->
                    <v-checkbox density="compact" v-model="formData.checkbox"
                        label="I agree to the terms and conditions" :rules="[rules.required]" required></v-checkbox>

                    <!-- Submit Button -->
                    <v-btn @click="submitForm" color="primary">Submit</v-btn>
                </v-form>
            </v-col>
            <v-col cols="12" sm="6">
                <h3 class="my-2">Submitted Data</h3>
                <div v-if="submittedData.length">
                    <v-list dense>
                        <v-list-item v-for="(data, index) in submittedData" :key="index">
                            <v-list-item-content>
                                <div><strong>Full Name:</strong> {{ data.text }}</div>
                                <div><strong>Email:</strong> {{ data.email }}</div>
                                <div><strong>Phone:</strong> {{ data.phone }}</div>
                                <div><strong>Gender:</strong> {{ data.dropdown }}</div>
                                <div><strong>Agreed to Terms:</strong> {{ data.checkbox ? 'Yes' : 'No' }}</div>
                            </v-list-item-content>
                            <v-list-item-action class="mt-3">
                                <v-btn class="text-capitalize" color="blue" @click="editData(index)">
                                    Edit
                                </v-btn>
                                <v-btn class="text-capitalize ml-3" color="red" @click="deleteData(index)">
                                    Delete
                                </v-btn>
                            </v-list-item-action>
                        </v-list-item>
                    </v-list>
                </div>
                <p v-else class="my-2">No data submitted yet.</p>
            </v-col>
        </v-row>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const formValid = ref(false);
const formData = ref({
    text: '',
    email: '',
    phone: '',
    dropdown: '',
    checkbox: false,
});

const submittedData = ref([]);
const editingIndex = ref(null);

// Validation rules
const rules = {
    required: value => !!value || 'This field is required',
    email: value => /.+@.+\..+/.test(value) || 'Enter a valid email',
    phone: value => /^\d{10}$/.test(value) || 'Enter a valid 10-digit phone number',
};

// Form submission handler
const submitForm = () => {
    if (formValid.value) {
        if (editingIndex.value !== null) {
            // Update the existing data
            submittedData.value[editingIndex.value] = { ...formData.value };
            editingIndex.value = null;
        } else {
            // Add new data to the list
            submittedData.value.push({ ...formData.value });
        }
        formData.value = []
        // Clear the form
        // resetForm();
        alert('Form Submitted Successfully!');
    } else {
        alert('Please fill in all required fields correctly.');
    }
};

// Edit an existing data entry
const editData = (index) => {
    formData.value = { ...submittedData.value[index] };
    editingIndex.value = index;
};

// Delete an existing data entry
const deleteData = (index) => {
    submittedData.value.splice(index, 1);
};

// Reset form
const resetForm = () => {
    formData.value = {
        text: '',
        email: '',
        phone: '',
        dropdown: '',
        checkbox: false,
    };
};
</script>

<style scoped></style>

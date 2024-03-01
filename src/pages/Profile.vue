<template>
    <v-form :class="{'profile-form-left-30vw': !drawerStore.visible, 'profile-form-left-21vw': drawerStore.visible}">
        <h3 class="profile-title">Profile</h3>
        <v-text-field 
            :rules="requiredFieldRules"
            variant="outlined" 
            placeholder="First Name" 
            v-model="updateDto.firstName" />
        <v-text-field
            :rules="requiredFieldRules"
            variant="outlined"
            placeholder="Last Name"
            v-model="updateDto.lastName" />
        <v-text-field
            :rules="requiredFieldRules"
            variant="outlined"
            placeholder="Email"
            v-model="updateDto.email" />
        <v-text-field
            :rules="requiredFieldRules"
            variant="outlined"
            placeholder="Phone number"
            v-model="updateDto.phoneNumber" />
        <v-text-field
            :rules="requiredFieldRules"
            type="date"
            variant="outlined"
            label="Birthdate"
            v-model="updateDto.birthdate" />
        <CountrySelect 
            class="profile-country"
            :current-country="updateDto.country"
            @country-selected="countrySelected" />
        <v-text-field
            :rules="requiredFieldRules"   
            variant="outlined"
            placeholder="Province"
            v-model="updateDto.province" />
        <v-text-field
            :rules="requiredFieldRules"
            variant="outlined"
            placeholder="City"
            v-model="updateDto.city" />
        <v-text-field
            :rules="requiredFieldRules"
            variant="outlined"
            placeholder="Zip Code"
            v-model="updateDto.zipCode" />
        <v-btn 
            class="profile-save-button" 
            @click="saveClicked" 
            flat>
            <i class="material-symbols-outlined">
                save
            </i>Save
        </v-btn>
    </v-form>
</template>

<script setup lang="ts">
import CountrySelect from "../components/CountrySelect.vue";
import { ref, onMounted } from "vue";
import { IUpdateUserDto } from "../shared/interfaces";
import { useUserStore } from "../store/user";
import { requiredFieldRules } from "../shared/rules";
import { useDrawerStore } from "../store/drawer";
import { fixDateFormat } from "../shared/utils";
import { AUTHORIZATION_TOKEN, URL_USER_UPDATE } from "../shared/constants";
import { useToast } from "vue-toastification";

const toast = useToast();
const userStore = useUserStore();
const drawerStore = useDrawerStore();

const updateDto = ref<IUpdateUserDto>({
    id: userStore.user?.id ?? -1,
    firstName:  userStore.user?.firstName ?? "",
    lastName: userStore.user?.lastName ?? "",
    email: userStore.user?.email ?? "",
    phoneNumber: userStore.user?.phoneNumber ?? "",
    birthdate: fixDateFormat(userStore.user?.birthdate ?? "0000-00-00"),
    country: userStore.user?.country ?? "México",
    province: userStore.user?.province ?? "",
    city: userStore.user?.city ?? "",
    zipCode: userStore.user?.zipCode ?? ""
});

onMounted(() => {
    userStore.loadFromLocalStorage();
});

const fetchUpdate = async () => {
    await fetch(URL_USER_UPDATE, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": AUTHORIZATION_TOKEN
        },
        body: JSON.stringify(updateDto.value)
    }).then(response => {
        if (!response.ok) {
            return response.text().then(errorText => {
                throw new Error(errorText);
            });
        }
        return response.json();
    }).then(data => {
        userStore.setState(true, data);
        toast.info("Profile edited successfully!");
    }).catch(error => {
        toast.error(error.message.substring(18, error.message.indexOf("!") + 1));
    });
}

const countrySelected = (country: string) => {
    updateDto.value.country = country;
}

const saveClicked = async () => {
    await fetchUpdate();
}
</script>

<style scoped>
.profile-form-left-30vw {
    margin-left: 10px;
    margin-right: 10px;    
    margin-bottom: 10px;
    width: 500px;
    position: relative;
    left: 30vw;
}

.profile-form-left-21vw {
    margin-left: 10px;
    margin-right: 10px;
    margin-bottom: 10px;
    width: 500px;
    position: relative;
    left: 21vw;
}

.profile-title {
    text-align: center;
    margin-bottom: 10px;
}

.profile-country {
    margin-bottom: 20px;
}

.profile-save-button {
    position: relative;
    left: 12rem;
}
</style>
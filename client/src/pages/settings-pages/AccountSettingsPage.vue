<script setup lang="ts">
import { ref } from "vue";
import LoginForm from "src/components/account/LoginForm.vue";
import RegisterForm from "src/components/account/RegisterForm.vue";
import ServerEditForm from "src/components/account/ServerEditForm.vue";
import Factory from "src/services/service-factory";
import { useAppStore } from "src/stores/app.store";
import { LogbookLocalService } from "src/services/local/logbook.local.service";


const store = useAppStore();
const showLoginDialog = ref(false);
const showRegisterDialog = ref(false);
const showServerEditDialog = ref(false);

const onLogoutClick = () => {
  Factory.getAuthLocalStorageService().clearLocalAuthData();
  LogbookLocalService.clearLocalLogbooksData();
};
</script>

<template>
  <q-page>
    <q-card class="q-pa-lg center q-ma-auto" flat style="max-width: 800px">
      <q-card-actions align="center" vertical>
        <div class="q-mt-xl q-mb-none">
          <q-icon color="grey" name="mdi-account-box-outline" size="150px" />
        </div>
        <h5 class="q-mt-xs">{{ store.username ?? " - - offline - - " }}</h5>
      </q-card-actions>
      <q-card-actions align="center" class="q-mb-lg q-gutter-md" style="">
        <q-btn
          color="primary"
          icon="login"
          label="login"
          @click="() => (showLoginDialog = true)"
          :disable="!store.serverAddress"
        />
        <q-btn
          color="primary"
          icon="mdi-account-plus-outline"
          label="register"
          @click="() => (showRegisterDialog = true)"
          :disable="!store.serverAddress"
        />
        <q-btn
          color="primary"
          icon="mdi-logout"
          label="logout"
          @click="onLogoutClick"
          :disable="!store.username"
        />
      </q-card-actions>

      <div class="row no-wrap items-center q-mt-xl q-pa-sm q-pl-lg">
        <span class="text-weight-bold q-mx-md">Server address:</span>
        <span class="text-subtitle:">{{
          store.serverAddress ?? "undefined"
        }}</span>
        <q-space />
        <q-btn
          color="primary"
          icon="mdi-pencil-outline"
          label="edit"
          @click="() => {showServerEditDialog = true}"
        />
      </div>
    </q-card>
  </q-page>
  <q-dialog v-model="showLoginDialog">
    <login-form />
  </q-dialog>
  <q-dialog v-model="showRegisterDialog">
    <register-form />
  </q-dialog>
  <q-dialog v-model="showServerEditDialog">
   <server-edit-form/>
  </q-dialog>
</template>

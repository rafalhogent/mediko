<template>
  <q-card style="width: 100%; max-width: 500px">
    <q-form @submit="onSubmitClick">
      <q-card-section class="q-mb-none">
        <div class="text-h6">
          <q-icon name="mdi-server" /> Edit server address
        </div>
      </q-card-section>
      <q-card-section class="q-gutter-md">
        <q-input autofocus v-model="model.address" label="Server address" />
      </q-card-section>
      <q-card-actions class="q-my-md" align="center">
        <q-btn icon="close" color="secondary" label="Cancel" v-close-popup />
        <q-btn
          icon="save"
          color="primary"
          label="Save"
          v-close-popup
          type="submit"
        />
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script setup lang="ts">
import Factory from "src/services/service-factory";
import { useAppStore } from "src/stores/app.store";
import { ref, Ref } from "vue";
const store = useAppStore();

const model: Ref<{ address: string }> = ref({
  address: store.serverAddress ?? "",
});

const onSubmitClick = async () => {
  Factory.getAuthService().setBackendUrl(model.value.address);
};
</script>

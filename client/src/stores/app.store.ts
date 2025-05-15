import { defineStore } from "pinia";
import { QTabProps, useQuasar } from "quasar";
import { Ref, ref } from "vue";

export const useAppStore = defineStore("appStore", () => {
  const $q = useQuasar();
  const toolbarTabs: Ref<QTabProps[]> = ref([]);
  const selectedTab = ref("");

  return {
    toolbarTabs,
    selectedTab,
  };
});

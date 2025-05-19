import { defineStore } from "pinia";
import { QBreadcrumbsElProps, QTabProps, useQuasar } from "quasar";
import { Ref, ref } from "vue";

export const useAppStore = defineStore("appStore", () => {
  const $q = useQuasar();
  const toolbarTabs: Ref<QTabProps[]> = ref([]);
  const selectedTab = ref("");

  //#region settings

  const settingsCrumb: QBreadcrumbsElProps = {
    label: "Settings",
    icon: "mdi-folder-wrench-outline",
    to: "/settings/main",
    onClick: (e: Event) => {
      resetSettingsPage();
    },
  };
  const logbooksCrumb: QBreadcrumbsElProps = {
    label: "Logbooks",
    icon: "mdi-book-open-outline",
    to: "/settings/logbooks",
    activeClass: "",
    onClick: (e: Event) => {
      settingsCrumbs.value = [settingsCrumb, logbooksCrumb];
    },
  };

  const settingsCrumbs: Ref<QBreadcrumbsElProps[]> = ref([settingsCrumb]);

  const resetSettingsPage = () => {
    settingsCrumbs.value = [settingsCrumb];
  };
  //#endregion

  return {
    toolbarTabs,
    selectedTab,
    resetSettingsPage,
    settingsCrumb,
    settingsCrumbs,
    logbooksCrumb,
  };
});

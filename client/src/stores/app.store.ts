import { defineStore } from "pinia";
import {
  Notify,
  QBreadcrumbsElProps,
  QNotifyCreateOptions,
  QTabProps,
  useQuasar,
} from "quasar";
import { Ref, ref } from "vue";

export const useAppStore = defineStore("appStore", () => {
  const $q = useQuasar();
  const toolbarTabs: Ref<QTabProps[]> = ref([]);
  const selectedTab = ref("");
  const username: Ref<string | undefined> = ref();
  const serverAddress: Ref<string | undefined> = ref();

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
  const accountCrumb: QBreadcrumbsElProps = {
    label: 'Account & Server',
    icon: 'mdi-cloud-outline',
    to: '/settings/account',
    onClick: (e: Event) => {
      settingsCrumbs.value = [settingsCrumb, accountCrumb];
    },
  };

  const settingsCrumbs: Ref<QBreadcrumbsElProps[]> = ref([settingsCrumb]);

  const resetSettingsPage = () => {
    settingsCrumbs.value = [settingsCrumb];
  };
  //#endregion

  //#region ui & notif handlers
  const handleSuccess = (message: string, caption?: string | undefined) => {
    const opts: QNotifyCreateOptions = {
      message: message,
      type: "positive",
      actions: [
        {
          icon: "close",
          color: "white",
          round: true,
        },
      ],
    };
    if (caption) opts.caption = caption;
    Notify.create(opts);
  };

  const handleError = (message: string, caption?: string) => {
    const opts: QNotifyCreateOptions = {
      message: message,
      type: "negative",
      actions: [
        {
          icon: "close",
          color: "white",
          round: true,
        },
      ],
    };
    if (caption) opts.caption = caption;
    Notify.create(opts);
  };
  //#endregion

  return {
    toolbarTabs,
    selectedTab,
    resetSettingsPage,
    settingsCrumb,
    settingsCrumbs,
    logbooksCrumb,
    handleError,
    handleSuccess,
    serverAddress,
    username,
    accountCrumb,
  };
});

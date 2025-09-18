import { defineStore } from "pinia";
import {
  Notify,
  QBreadcrumbsElProps,
  QNotifyCreateOptions,
  QNotifyUpdateOptions,
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

  const inSync = ref(false);
  const syncNotif: Ref<((props?: QNotifyUpdateOptions) => void) | undefined> =
    ref();

  const syncNotifyProps: QNotifyCreateOptions = {
    group: false,
    timeout: 0,
    spinner: true,
    color: "teal-8",
    message: "Synchronizing...",
  };
  const startSyncNotif = (options?: QNotifyUpdateOptions) => {
    syncNotif.value = $q.notify(options ?? syncNotifyProps);
  };
  const updateSyncNotif = (options?: QNotifyUpdateOptions) => {
    if (syncNotif.value) syncNotif.value(options);
  };
  const stopSyncNotif = () => {
    if (syncNotif.value)
      syncNotif.value({
        icon: "done",
        spinner: false,
        message: "Synchronization done!",
        timeout: 2000,
      });
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
    startSyncNotif,
    updateSyncNotif,
    stopSyncNotif,
    inSync,
  };
});

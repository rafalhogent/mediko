<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="mdi-heart-pulse"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
        <q-space />

        <q-tabs
          v-model="appStore.selectedTab"
          shrink
          stretch
          inline-label
          :dense="$q.screen.lt.sm"
          :outside-arrows="!$q.screen.lt.sm"
          class="bg-primary text-white shadow-2"
        >
          <q-tab
            v-for="t in appStore.toolbarTabs"
            :name="t.name"
            :icon="t.icon"
            :label="t.label"
          />
        </q-tabs>

        <q-toolbar-title
          v-if="!appStore.toolbarTabs?.length"
          class="text-center"
        >
          Mediko
        </q-toolbar-title>
        <q-space />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-btn
        style="position: fixed; right: -5px; z-index: 100"
        flat
        dense
        icon="mdi-chevron-double-left"
        @click="toggleLeftDrawer"
      />

      <q-scroll-area
        class="fit"
        :content-style="{ display: 'flex', flexDirection: 'column' }"
      >
        <div class="row" style="min-height: 100%; flex-grow: 1">
          <div class="flex column justify-between">
            <div class="top-links q-py-md">
              <EssentialLink
                v-for="link in linksList"
                :key="link.title"
                v-bind="link"
                :title="link.title"
              />
            </div>
            <div class="bottom-links q-py-lg">
              <EssentialLink
                icon="mdi-account-circle"
                :key="'Account'"
                :title="appStore.username?.toUpperCase() ?? 'Account'"
                :route="'/settings/account'"
                :caption="
                  appStore.username
                    ? 'ONLINE'
                    : 'OFFLINE'
                "
              />
            </div>
          </div>
        </div>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import EssentialLink, {
  type EssentialLinkProps,
} from "components/EssentialLink.vue";
import { useAppStore } from "src/stores/app.store";
import { LogbookLocalService } from "src/services/local/logbook.local.service";
import Factory from "src/services/service-factory";

const linksList: EssentialLinkProps[] = [
  {
    title: "Logbooks",
    caption: "Body parameters",
    icon: "scale",
    route: "/logbook",
  },
  {
    title: "Github",
    caption: "github.com/rafalhogent/medikohogent",
    icon: "code",
    link: "https://github.com/rafalhogent/medikohogent",
  },
  {
    title: "Settings",
    caption: "Application aettings",
    icon: "mdi-folder-wrench-outline",
    route: "/settings/main",
  },
];

const leftDrawerOpen = ref(false);
const appStore = useAppStore();
function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

onMounted(() => {
  LogbookLocalService.ensureDefaultLogbooks();
  Factory.getAuthService().loadAuthDataFromStorage();
  const srv = Factory.getAuthService().ensureBackendUrlLoaded();
});
</script>

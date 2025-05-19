import type { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      { path: "/logbook", component: () => import("pages/LogbookPage.vue") },
      {
        path: "settings",
        component: () => import("pages/SettingsPage.vue"),
        children: [
          {
            path: "main",
            component: () =>
              import("pages/settings-pages/MainSettingsPage.vue"),
          },
          {
            path: "logbooks",
            component: () =>
              import("pages/settings-pages/LogbooksSettingsPage.vue"),
          },
        ],
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;

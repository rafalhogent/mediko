<script setup lang="ts">
import { QTableProps } from "quasar";
import { Log, Logbook } from "src/models/logbook/logbook";
import { LogbookLocalService } from "src/services/local/logbook.local.service";
import { computed, onMounted, onUnmounted, Ref, ref } from "vue";
import { DateTime } from "luxon";
import { useAppStore } from "src/stores/app.store";
import _ from "lodash";

//#region refs, computed
const logbooks: Ref<Logbook[]> = ref([]);
const currentLogbook = computed(() => {
  const myLogbook = logbooks.value.find(
    (lb) => lb.id.toString() == appStore.selectedTab
  );
  return myLogbook;
});
const myLogs = computed(() => {
  const myLogsObs = currentLogbook.value?.logs;
  const sortedlogs = _.orderBy(myLogsObs, (x) => x.moment, "desc");
  return sortedlogs;
});

const appStore = useAppStore();

const showDialog: Ref<boolean> = ref(false);
const currentLog: Ref<Log | undefined> = ref(undefined);

const columns = computed(() => {
  const lgb = currentLogbook.value;
  const cols: QTableProps["columns"] = [
    {
      name: "moment",
      label: "moment",
      field: (item: Log) =>
        item.moment
          ? DateTime.fromJSDate(item.moment).toFormat("yyyy-LL-dd HH:mm")
          : " ? ",
      align: "center",
      style: "width: 95px; min-width: 85px; padding: 10px 0px",
    },
    {
      name: "comment",
      label: "comment",
      field: "comment",
      align: "left",
      style: "",
    },
  ];

  if (lgb) {
    for (let i = 1; i <= 4; i++) {
      const fname: string = `field${i}`;
      const vname: string = `value${i}`;
      const uname: string = `unit${i}`;

      const field = lgb[fname as keyof Logbook] as string;
      const unit = lgb[uname as keyof Logbook] as string;
      if (field) {
        cols.splice(cols.length - 1, 0, {
          name: field,

          headerStyle: "white-space:pre-wrap; ",
          label: `${field}${unit ? `\n( ${unit} )` : ""}`,
          field: (l: Log) => {
            const vl = l[vname as keyof Log];
            return vl ? `${vl}` : "";
          },
          style: `width: 100px`,
        });
      }
    }
  }
  return cols;
});

//#endregion

//#region hooks, handlers
onMounted(() => {
  logbooks.value = LogbookLocalService.getLocalLogbooks();
  const tabs = logbooks.value
    .filter((lb) => lb.isChoosen)
    .map((lb) => ({
      name: lb.id,
      icon: lb.icon,
      label: lb.name,
    }));

  tabs.sort((a: any, b: any) => {
    return -1 * a?.label.localeCompare(b?.label);
  });

  appStore.toolbarTabs = tabs;
  if (logbooks.value.length && !appStore.selectedTab) {
    appStore.selectedTab = appStore.toolbarTabs[0]?.name?.toString() ?? "";
  }
});

onUnmounted(() => {
  appStore.toolbarTabs = [];
});
//#endregion
</script>

<template>
  <q-page class="">
    <div class="">
      <q-table
        v-if="!!currentLogbook"
        style="height: 100%"
        :grid="false && $q.screen.lt.sm"
        :dense="$q.screen.lt.md"
        wrapCells
        separator="horizontal"
        bordered
        :title="currentLogbook?.name ?? '?'"
        :rows="myLogs ?? []"
        :columns="columns"
        row-key="index"
        virtual-scroll
        :rows-per-page-options="[0]"
      >
        <template v-slot:top>
          <h6 class="q-my-md text-uppercase">
            {{ currentLogbook?.name ? currentLogbook.name : "?" }}
          </h6>
          <q-space />
        </template>
      </q-table>
    </div>
  </q-page>
</template>

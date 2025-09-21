import { AxiosInstance } from 'axios';
import { LogbookLocalService } from '../local/logbook.local.service';
import { useAppStore } from 'src/stores/app.store';
import { delay } from 'src/utils/app-utils';

const store = useAppStore();

export class SyncService {
  private readonly axiosClient: AxiosInstance;

  constructor(axiosClient: AxiosInstance) {
    this.axiosClient = axiosClient;
  }

  async syncLogbooks() {
    try {
      const lbs = LogbookLocalService.getAllLogbooksData();
      const resp = await this.axiosClient.patch('logbook', {
        logbooks: lbs,
        lastSyncMoment: undefined,
      });
      LogbookLocalService.saveLogbooksData(resp.data);
    } catch (error: any) {
      store.handleError("Sync failed", error?.message);
    }
  }

  onSyncLogbooks() {
    if (store.username) {
      store.inSync = true;
      this.syncLogbooks().then(async () => {
        await delay(1500);
        store.inSync = false;
      });
    }
  }

  async syncAllData() {
    store.startSyncNotif();
    store.inSync = true;
    Promise.all([await this.syncLogbooks()]).then(async () => {
      await delay(1000);
      store.stopSyncNotif();
      store.inSync = false;
    });
  }
}

import { TrackedEntity } from "../common/tracked-entity";

export class Log extends TrackedEntity {
    constructor() {
      super();
    }
    moment: Date | null = new Date();
    value1?: number | undefined;
    value2?: number | undefined;
    value3?: number | undefined;
    value4?: number | undefined;
    comment?: string | undefined;
  
    update(newLog: Log): void {
      this.moment = newLog.moment;
      this.value1 = newLog.value1;
      this.value2 = newLog.value2;
      this.value3 = newLog.value3;
      this.value4 = newLog.value4;
      this.comment = newLog.comment;
      this.updatedAt = new Date();
    }
  
    makeDeleted(): void {
      this.moment = null;
      delete this.value1;
      delete this.value2;
      delete this.value3;
      delete this.value4;
      delete this.comment;
      delete this.createdAt;
      delete this.updatedAt;
      this.isDeleted = true;
      this.deletedAt = new Date();
    }
  }
  
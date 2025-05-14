import { TrackedEntity } from "../common/tracked-entity";

export class Logbook extends TrackedEntity {
  constructor() {
    super();
  }
  name?: string | undefined;
  field1?: string | undefined;
  unit1?: string | undefined;
  precision1?: number | undefined = undefined;
  field2?: string | undefined;
  unit2?: string | undefined;
  precision2?: number | undefined = undefined;
  field3?: string | undefined;
  unit3?: string | undefined;
  precision3?: number | undefined = undefined;
  field4?: string | undefined;
  unit4?: string | undefined;
  precision4?: number | undefined = undefined;
  icon?: string | undefined;
  isChoosen: boolean = true;
  logs: Log[] = [];
}

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

  makeDeleted() {
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

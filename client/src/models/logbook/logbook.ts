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
}

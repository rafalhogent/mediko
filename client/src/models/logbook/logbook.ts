import { TrackedEntity } from "../common/tracked-entity";
import { Log } from "./log";

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

  update = (updatedLogbook: Logbook) => {
    this.name = updatedLogbook.name;
    this.field1 = updatedLogbook.field1;
    this.field2 = updatedLogbook.field2;
    this.field3 = updatedLogbook.field3;
    this.field4 = updatedLogbook.field4;
    this.unit1 = updatedLogbook.unit1;
    this.unit2 = updatedLogbook.unit2;
    this.unit3 = updatedLogbook.unit3;
    this.unit4 = updatedLogbook.unit4;
    this.precision1 = updatedLogbook.precision1;
    this.precision2 = updatedLogbook.precision2;
    this.precision3 = updatedLogbook.precision3;
    this.precision4 = updatedLogbook.precision4;
    this.updatedAt = new Date();
  };

  makeDeleted = () => {
    delete this.name;
    delete this.icon;
    delete this.field1;
    delete this.field2;
    delete this.field3;
    delete this.field4;
    delete this.unit1;
    delete this.unit2;
    delete this.unit3;
    delete this.unit4;
    delete this.precision1;
    delete this.precision2;
    delete this.precision3;
    delete this.precision4;
    delete this.updatedAt;
    delete this.createdAt;
    this.isChoosen = false;
    this.logs = [];
    this.deletedAt = new Date();
    this.isDeleted = true;
  };
}

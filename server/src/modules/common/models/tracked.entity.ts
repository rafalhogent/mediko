import { Type } from 'class-transformer';
import { Column, PrimaryColumn } from 'typeorm';

export class TrackedEntity {
  @PrimaryColumn({ length: 36 })
  id: string;

  @Type(() => Date)
  @Column({ nullable: true, type: 'datetime' })
  createdAt?: Date | null = new Date();

  @Type(() => Date)
  @Column({ nullable: true, type: 'datetime' })
  updatedAt?: Date | null = new Date();

  @Type(() => Date)
  @Column({ nullable: true, type: 'datetime' })
  deletedAt?: Date | null = null;

  @Column({ default: false })
  isDeleted?: boolean = false;
}

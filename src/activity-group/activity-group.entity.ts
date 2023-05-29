import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({name: 'activities'})
export class ActivityGroup {
  @PrimaryGeneratedColumn()
  activity_id: number;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  title: string;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)"})
  public created_at: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => null, onUpdate: "CURRENT_TIMESTAMP(6)", nullable: true })
  public updated_at: Date | null;

  @CreateDateColumn({ type: "timestamp", default: () => null, nullable: true})
  public deleted_at: Date | null;
}
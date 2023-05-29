import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({name: 'todos'})
export class ToDo {
  @PrimaryGeneratedColumn()
  todo_id: number;

  @Column({ nullable: false })
  activity_group_id: number;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  is_active: number;

  @Column({ nullable: true })
  priority: string;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)"})
  public created_at: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => null, onUpdate: "CURRENT_TIMESTAMP(6)", nullable: true })
  public updated_at: Date | null;

  @CreateDateColumn({ type: "timestamp", default: () => null, nullable: true})
  public deleted_at: Date | null;
}
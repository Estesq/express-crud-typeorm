import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("post")
export class PostEntity {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column({ nullable: false })
  title: string;

  @Column()
  content: string;

  @CreateDateColumn({ name: "created_at", type: "timestamp", nullable: false })
  created_at: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp", nullable: true })
  updated_at: Date;
}

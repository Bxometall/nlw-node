import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from 'uuid'
import { User } from "./User";

@Entity('connections')
class Connection {

  @PrimaryColumn()
  id: string

  @Column({ name: 'admin_id' })
  adminId: string

  @Column({ name: 'socket_id' })
  socketId: string
  
  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User

  @Column({ name: 'user_id' })
  userId: string // only here to the exercise, on object oriented programming we use the Object like above
  
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  constructor() {
    if(!this.id) {
      this.id = uuid();
    }
  }
}

export { Connection }